import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PATCH /api/admin/blogs/[id]/publish → status=PUBLISHED, published_at=now. */
export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  let bigId: bigint;
  try {
    bigId = BigInt(id);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid id." }, { status: 400 });
  }

  const post = await prisma.blogPost.findUnique({ where: { id: bigId } });
  if (!post) return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });

  // Guard: do not publish incomplete posts.
  if (!post.featuredImage) {
    return NextResponse.json(
      { success: false, message: "A featured image URL is required before publishing." },
      { status: 400 },
    );
  }

  try {
    await prisma.blogPost.update({
      where: { id: bigId },
      data: { status: "PUBLISHED", publishedAt: post.publishedAt ?? new Date() },
    });
    return NextResponse.json({ success: true });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/blogs/[id]/publish] failed.");
    return NextResponse.json({ success: false, message: "Unable to publish." }, { status: 500 });
  }
}
