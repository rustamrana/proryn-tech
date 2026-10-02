import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Edge middleware that protects the admin area.
 *
 * - /admin/*       → page routes. Unauthenticated users are redirected to the
 *                    login page; non-admins get redirected too. The login page
 *                    itself is always allowed.
 * - /api/admin/*   → API routes. Unauthenticated → 401, non-admin → 403.
 *
 * This is defense-in-depth; every /api/admin handler ALSO calls requireAdmin()
 * so authorization never relies on middleware alone.
 */

const LOGIN_PATH = "/admin/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = await verifySessionToken(token);
  const isAdmin = session?.role === "ADMIN";

  // ── API routes under /api/admin ───────────────────────────────────────────
  if (pathname.startsWith("/api/admin")) {
    // The login/logout endpoints must stay open.
    if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
      return NextResponse.next();
    }
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbidden." },
        { status: 403 },
      );
    }
    return NextResponse.next();
  }

  // ── Page routes under /admin ────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (pathname === LOGIN_PATH) {
      // Already signed in → send to dashboard.
      if (isAdmin) {
        return NextResponse.redirect(new URL("/admin/blogs", request.url));
      }
      return NextResponse.next();
    }
    if (!isAdmin) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
