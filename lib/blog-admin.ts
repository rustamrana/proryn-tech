import { prisma } from "@/lib/prisma";
import type { BlogStatus, Prisma } from "@prisma/client";

/**
 * Server-only admin blog data-access. Unlike lib/blog.ts (public, published
 * only), these helpers can see every status and are used exclusively by
 * authorized /api/admin routes.
 */

export interface AdminBlogListItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string;
  status: BlogStatus;
  featuredImage: string | null;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBlogDetail extends AdminBlogListItem {
  excerpt: string;
  content: string;
  tags: string | null;
  readingTime: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
}

const PAGE_SIZE = 10;

interface ListParams {
  search?: string;
  category?: string;
  status?: BlogStatus | "ALL";
  page?: number;
}

export async function listAdminBlogs(params: ListParams): Promise<{
  items: AdminBlogListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const page = Math.max(1, params.page ?? 1);
  const where: Prisma.BlogPostWhereInput = {};

  if (params.status && params.status !== "ALL") {
    where.status = params.status;
  }
  if (params.category && params.category !== "All") {
    where.category = params.category;
  }
  if (params.search && params.search.trim()) {
    const q = params.search.trim();
    where.OR = [{ title: { contains: q } }, { slug: { contains: q } }, { authorName: { contains: q } }];
  }

  const [rows, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    items: rows.map((r) => ({
      id: r.id.toString(),
      title: r.title,
      slug: r.slug,
      category: r.category,
      authorName: r.authorName,
      status: r.status,
      featuredImage: r.featuredImage,
      viewCount: r.viewCount,
      publishedAt: r.publishedAt?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getAdminBlogById(id: string): Promise<AdminBlogDetail | null> {
  let bigId: bigint;
  try {
    bigId = BigInt(id);
  } catch {
    return null;
  }
  const r = await prisma.blogPost.findUnique({ where: { id: bigId } });
  if (!r) return null;
  return {
    id: r.id.toString(),
    title: r.title,
    slug: r.slug,
    category: r.category,
    authorName: r.authorName,
    status: r.status,
    featuredImage: r.featuredImage,
    viewCount: r.viewCount,
    excerpt: r.excerpt,
    content: r.content,
    tags: r.tags,
    readingTime: r.readingTime,
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
    seoKeywords: r.seoKeywords,
    publishedAt: r.publishedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function getAdminStats(): Promise<{ total: number; published: number; drafts: number }> {
  const [total, published, drafts] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
  ]);
  return { total, published, drafts };
}

/** Whether a slug is already used by a different post. */
export async function slugExists(slug: string, exceptId?: string): Promise<boolean> {
  const row = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (!row) return false;
  if (exceptId && row.id.toString() === exceptId) return false;
  return true;
}
