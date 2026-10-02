import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/blogs?category=...
 * Public endpoint — returns PUBLISHED posts only, newest first.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const blogs = await getPublishedBlogs(category);
    return NextResponse.json({ success: true, blogs });
  } catch {
    // Never leak internal/DB errors.
    // eslint-disable-next-line no-console
    console.error("[api/blogs] Failed to list published blogs.");
    return NextResponse.json(
      { success: false, message: "Unable to load articles." },
      { status: 500 },
    );
  }
}
