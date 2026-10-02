import { NextResponse } from "next/server";
import type { BlogStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";
import { listAdminBlogs, slugExists } from "@/lib/blog-admin";
import { blogInputSchema, validateForPublish } from "@/lib/validation/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/blogs — list with search/filter/pagination. */
export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const result = await listAdminBlogs({
      search: searchParams.get("search") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      status: (searchParams.get("status") as BlogStatus | "ALL") ?? "ALL",
      page: Number(searchParams.get("page") ?? "1"),
    });
    return NextResponse.json({ success: true, ...result });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/blogs] list failed.");
    return NextResponse.json({ success: false, message: "Unable to load blogs." }, { status: 500 });
  }
}

/** POST /api/admin/blogs — create a new post. */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

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

  // Enforce publish-time rules.
  if (data.status === "PUBLISHED") {
    const err = validateForPublish(data);
    if (err) return NextResponse.json({ success: false, message: err }, { status: 400 });
  }

  if (await slugExists(data.slug)) {
    return NextResponse.json(
      { success: false, message: "That slug is already in use. Choose a unique slug." },
      { status: 409 },
    );
  }

  try {
    const created = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage || null,
        authorName: data.authorName,
        authorId: BigInt(auth.sub),
        readingTime: data.readingTime,
        tags: data.tags || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        status: data.status,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
    return NextResponse.json({ success: true, id: created.id.toString() }, { status: 201 });
  } catch {
    // eslint-disable-next-line no-console
    console.error("[api/admin/blogs] create failed.");
    return NextResponse.json({ success: false, message: "Unable to create the post." }, { status: 500 });
  }
}
