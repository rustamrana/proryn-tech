import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  contactSubmissionSchema,
  emptyToNull,
  MESSAGE_MAX_LENGTH,
} from "@/lib/validation/contact";
import { rateLimit } from "@/lib/rate-limit";

// Always run on the Node.js runtime (Prisma requires it) and never cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reject obviously oversized payloads before parsing/validation.
// Generous ceiling above the message limit to allow all other fields.
const MAX_BODY_BYTES = MESSAGE_MAX_LENGTH + 4_000;

// Rate limit: max 5 submissions per minute per client IP.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

/** User-facing responses — intentionally generic, no internal details. */
const RESPONSES = {
  success: {
    success: true as const,
    message: "Your message has been submitted successfully.",
  },
  validation: {
    success: false as const,
    message: "Please provide all required information.",
  },
  tooLarge: {
    success: false as const,
    message: "Your message is too large. Please shorten it and try again.",
  },
  rateLimited: {
    success: false as const,
    message: "Too many requests. Please wait a moment and try again.",
  },
  serverError: {
    success: false as const,
    message: "Unable to submit your message. Please try again later.",
  },
} as const;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip = getClientIp(request);
  const limit = rateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(RESPONSES.rateLimited, {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
    });
  }

  // ── Payload size guard ─────────────────────────────────────────────────────
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(RESPONSES.tooLarge, { status: 413 });
  }

  // ── Parse JSON ──────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(RESPONSES.validation, { status: 400 });
  }

  // Secondary guard: reject if the raw string body is implausibly large.
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string" &&
    (body as { message: string }).message.length > MESSAGE_MAX_LENGTH
  ) {
    return NextResponse.json(RESPONSES.tooLarge, { status: 413 });
  }

  // ── Validate (authoritative, server-side) ───────────────────────────────────
  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(RESPONSES.validation, { status: 400 });
  }

  const data = parsed.data;

  // ── Persist ──────────────────────────────────────────────────────────────────
  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        mobile: emptyToNull(data.mobile),
        company: emptyToNull(data.company),
        subject: emptyToNull(data.subject),
        message: data.message,
        // status defaults to NEW; createdAt/updatedAt handled by Prisma.
      },
    });

    return NextResponse.json(RESPONSES.success, { status: 201 });
  } catch (error) {
    // Log server-side diagnostics without leaking credentials or PII.
    /* eslint-disable no-console */
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`[contact] Prisma error ${error.code} while saving submission.`);
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error("[contact] Database connection/initialization failed.");
    } else {
      console.error("[contact] Unexpected error while saving submission.");
    }
    /* eslint-enable no-console */
    // Never expose internal/database error details to the browser.
    return NextResponse.json(RESPONSES.serverError, { status: 500 });
  }
}

/** Only POST is supported. */
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
