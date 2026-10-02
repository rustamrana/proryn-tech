import { NextResponse } from "next/server";
import { getPublishedBlogBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/blogs/[slug]
 * Public endpoint — returns a single PUBLISHED post, or 404.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const blog = await getPublishedBlogBySlug(slug);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Article not found." },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, blog });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/blogs/[slug]] Failed to load published blog.");
    return NextResponse.json(
      { success: false, message: "Unable to load the article." },
      { status: 500 },
    );
  }
}
