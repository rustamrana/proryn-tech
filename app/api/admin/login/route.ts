import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_COOKIE,
  createSessionToken,
  SESSION_COOKIE_MAX_AGE,
} from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** POST /api/admin/login { email, password } → sets session cookie. */
export async function POST(request: Request) {
  // Throttle brute-force: 10 attempts / minute / IP.
  const limit = rateLimit(`admin-login:${getClientIp(request)}`, 10, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown })?.email === "string"
    ? (body as { email: string }).email.trim().toLowerCase()
    : "";
  const password = typeof (body as { password?: unknown })?.password === "string"
    ? (body as { password: string }).password
    : "";

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.adminUser.findUnique({ where: { email } });

    // Always run a hash comparison to reduce user-enumeration timing signals.
    const hash = user?.passwordHash ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva";
    const ok = await bcrypt.compare(password, hash);

    if (!user || !user.isActive || !ok) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createSessionToken({
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const res = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });

    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_COOKIE_MAX_AGE,
    });

    return res;
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/login] Login failed due to a server error.");
    return NextResponse.json(
      { success: false, message: "Unable to sign in. Please try again later." },
      { status: 500 },
    );
  }
}
