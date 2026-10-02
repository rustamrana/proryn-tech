import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminBlogById, slugExists } from "@/lib/blog-admin";
import { blogInputSchema, validateForPublish } from "@/lib/validation/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toBigInt(id: string): bigint | null {
  try {
    return BigInt(id);
  } catch {
    return null;
  }
}

/** GET /api/admin/blogs/[id] — fetch one (any status). */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const blog = await getAdminBlogById(id);
  if (!blog) {
    return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true, blog });
}

/** PUT /api/admin/blogs/[id] — update. */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const bigId = toBigInt(id);
  if (!bigId) return NextResponse.json({ success: false, message: "Invalid id." }, { status: 400 });

  const existing = await prisma.blogPost.findUnique({ where: { id: bigId } });
  if (!existing) return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = blogInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.status === "PUBLISHED") {
    const err = validateForPublish(data);
    if (err) return NextResponse.json({ success: false, message: err }, { status: 400 });
  }

  if (await slugExists(data.slug, id)) {
    return NextResponse.json(
      { success: false, message: "That slug is already in use. Choose a unique slug." },
      { status: 409 },
    );
  }

  // Preserve the original publish timestamp when it was already published.
  const publishedAt =
    data.status === "PUBLISHED"
      ? existing.publishedAt ?? new Date()
      : data.status === "DRAFT"
        ? null
        : existing.publishedAt;

  try {
    await prisma.blogPost.update({
      where: { id: bigId },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage || null,
        authorName: data.authorName,
        readingTime: data.readingTime,
        tags: data.tags || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        status: data.status,
        publishedAt,
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/blogs/[id]] update failed.");
    return NextResponse.json({ success: false, message: "Unable to update the post." }, { status: 500 });
  }
}

/** DELETE /api/admin/blogs/[id]. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const bigId = toBigInt(id);
  if (!bigId) return NextResponse.json({ success: false, message: "Invalid id." }, { status: 400 });

  try {
    await prisma.blogPost.delete({ where: { id: bigId } });
    return NextResponse.json({ success: true });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/blogs/[id]] delete failed.");
    return NextResponse.json({ success: false, message: "Unable to delete the post." }, { status: 500 });
  }
}
