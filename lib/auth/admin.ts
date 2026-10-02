import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken, type AdminSession } from "@/lib/auth/session";

/**
 * Server-side admin authorization helpers.
 *
 * Used by API route handlers and server components. The browser is never
 * trusted — authorization is derived from the signed HTTP-only cookie.
 */

/** Read and verify the current admin session from the request cookies. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * Guard for API routes. Returns the session when authorized, or a ready-to-
 * return NextResponse (401 unauthenticated / 403 non-admin) when not.
 *
 * Usage:
 *   const auth = await requireAdmin();
 *   if (auth instanceof NextResponse) return auth;
 *   // auth is AdminSession here
 */
export async function requireAdmin(): Promise<AdminSession | NextResponse> {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Authentication required." },
      { status: 401 },
    );
  }

  if (session.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, message: "You do not have permission to perform this action." },
      { status: 403 },
    );
  }

  return session;
}
