import { z } from "zod";
import { isValidSlug } from "@/lib/slug";

/**
 * Server-side validation for admin blog create/update.
 * Authoritative — the browser is never trusted.
 */

export const BLOG_CATEGORIES = [
  "Artificial Intelligence",
  "Software Engineering",
  "Cloud & DevOps",
  "Digital Transformation",
  "Enterprise Technology",
  "Cybersecurity",
  "Business Technology",
] as const;

export const blogInputSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters.").max(255),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .max(255)
    .refine(isValidSlug, "Slug must be URL-safe (lowercase letters, numbers, hyphens)."),
  category: z.string().trim().min(1, "Category is required.").max(100),
  excerpt: z.string().trim().min(1, "Excerpt is required.").max(1000),
  content: z.string().trim().min(1, "Content is required."),
  featuredImage: z
    .string()
    .trim()
    .url("Featured image must be a valid URL.")
    .max(500)
    .optional()
    .or(z.literal("")),
  authorName: z.string().trim().min(1, "Author is required.").max(150),
  readingTime: z.coerce.number().int().min(1).max(120).default(5),
  tags: z.string().trim().max(500).optional().or(z.literal("")),
  seoTitle: z.string().trim().max(255).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(500).optional().or(z.literal("")),
  seoKeywords: z.string().trim().max(500).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type BlogInput = z.infer<typeof blogInputSchema>;

/**
 * Extra rules that only apply when publishing.
 * Featured image is required to publish (recommended-before-publish policy).
 */
export function validateForPublish(input: BlogInput): string | null {
  if (!input.featuredImage) {
    return "A featured image URL is required before publishing.";
  }
  if (input.excerpt.trim().length < 20) {
    return "Excerpt should be at least 20 characters before publishing.";
  }
  return null;
}
