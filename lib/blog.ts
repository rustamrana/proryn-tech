import { prisma } from "@/lib/prisma";
import type { BlogStatus } from "@prisma/client";

/**
 * Server-only blog data-access layer.
 *
 * Public helpers here only ever return PUBLISHED posts. Draft/archived rows are
 * never exposed to the public website. BigInt ids are serialized to strings so
 * results can safely cross the server→client boundary and be JSON-encoded.
 */

export interface PublicBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  authorName: string;
  readingTime: number;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

type BlogRow = {
  id: bigint;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  authorName: string;
  readingTime: number;
  tags: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  status?: BlogStatus;
};

function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Map a Prisma row to a serializable public shape. */
export function toPublicBlog(row: BlogRow): PublicBlog {
  return {
    id: row.id.toString(),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featuredImage,
    category: row.category,
    authorName: row.authorName,
    readingTime: row.readingTime,
    tags: parseTags(row.tags),
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    seoKeywords: row.seoKeywords,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** All published posts, newest first. Optionally filtered by category. */
export async function getPublishedBlogs(category?: string): Promise<PublicBlog[]> {
  const rows = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      ...(category && category !== "All" ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map(toPublicBlog);
}

/** The latest N published posts (for the homepage knowledge base). */
export async function getLatestPublishedBlogs(limit = 3): Promise<PublicBlog[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return rows.map(toPublicBlog);
}

/** A single published post by slug, or null if not found / not published. */
export async function getPublishedBlogBySlug(
  slug: string,
): Promise<PublicBlog | null> {
  const row = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  return row ? toPublicBlog(row) : null;
}

/** Up to `limit` other published posts in the same category (fallback: any). */
export async function getRelatedBlogs(
  slug: string,
  category: string,
  limit = 3,
): Promise<PublicBlog[]> {
  const sameCategory = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", category, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  if (sameCategory.length >= limit) {
    return sameCategory.map(toPublicBlog);
  }

  // Top up with other recent posts if the category is sparse.
  const extra = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: slug },
      id: { notIn: sameCategory.map((p) => p.id) },
    },
    orderBy: { publishedAt: "desc" },
    take: limit - sameCategory.length,
  });

  return [...sameCategory, ...extra].map(toPublicBlog);
}

/** Distinct categories that have at least one published post. */
export async function getPublishedCategories(): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}

/** Slugs of all published posts (for sitemap). */
export async function getPublishedBlogSlugs(): Promise<
  { slug: string; updatedAt: Date; publishedAt: Date | null }[]
> {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
  });
}
