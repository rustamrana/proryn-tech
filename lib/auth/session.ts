import { SignJWT, jwtVerify } from "jose";

/**
 * Admin session handling via a signed JWT stored in an HTTP-only cookie.
 *
 * SERVER-ONLY. The signing secret (ADMIN_SESSION_SECRET) is never exposed to
 * the browser. jose is used (not jsonwebtoken) because it runs in the Edge
 * runtime, so the same verification works inside Next.js middleware.
 */

export const ADMIN_COOKIE = "proryn_admin_session";
const ISSUER = "proryn-web-portal";
const AUDIENCE = "proryn-admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export interface AdminSession {
  sub: string; // admin user id (as string)
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
}

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set or too short (min 16 chars).",
    );
  }
  return new TextEncoder().encode(secret);
}

/** Create a signed session token for an authenticated admin. */
export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ email: session.email, name: session.name, role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

/** Verify a session token; returns the session or null if invalid/expired. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const role = payload.role === "EDITOR" ? "EDITOR" : "ADMIN";
    return {
      sub: String(payload.sub ?? ""),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role,
    };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
