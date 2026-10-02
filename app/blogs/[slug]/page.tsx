import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, ChevronRight, Tag } from 'lucide-react';
import { getPublishedBlogBySlug, getRelatedBlogs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://proryntech.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  const title = post.seoTitle || `${post.title} | PRORYN TECH`;
  const description = post.seoDescription || post.excerpt.slice(0, 160);
  const url = `${SITE_URL}/blogs/${post.slug}`;
  const images = post.featuredImage ? [{ url: post.featuredImage }] : undefined;

  return {
    title,
    description,
    keywords: post.seoKeywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogs(post.slug, post.category, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    author: { '@type': 'Person', name: post.authorName },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    ...(post.featuredImage ? { image: post.featuredImage } : {}),
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'PRORYN TECH' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-brand-primary pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-inter text-sm text-white/50">
              <li><Link href="/" className="hover:text-white/80">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link href="/blogs" className="hover:text-white/80">Blogs &amp; Insights</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li className="line-clamp-1 text-white/80" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <Link href="/blogs" className="mb-6 inline-flex items-center gap-2 font-inter text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blogs
          </Link>

          <span className="mb-4 inline-block rounded-full bg-brand-accent/20 px-3 py-1 font-inter text-sm font-medium text-brand-accent">
            {post.category}
          </span>
          <h1 className="font-poppins text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-4 font-inter text-lg leading-relaxed text-white/70">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-inter text-sm text-white/60">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.authorName}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          </div>
        </div>
      </section>

      {/* ── Featured image ── */}
      {post.featuredImage && (
        <div className="bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="relative -mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-brand-border shadow-card">
              <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
            </div>
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Content may be HTML (from the admin rich-text editor) or plain
              text (legacy seed). Render HTML; plain text seeds are wrapped in
              paragraphs by the seed, and double-newline text still displays. */}
          {/<[a-z][\s\S]*>/i.test(post.content) ? (
            <div
              className="font-inter text-base leading-relaxed text-slate-700 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:font-poppins [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-brand-primary [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-poppins [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-primary [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-poppins [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand-primary [&_p]:mb-6 [&_a]:text-brand-secondary [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-secondary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-brand-border [&_td]:p-2 [&_th]:border [&_th]:border-brand-border [&_th]:bg-slate-50 [&_th]:p-2 [&_img]:my-6 [&_img]:rounded-xl [&_hr]:my-8 [&_hr]:border-brand-border [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-slate-100"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div>
              {post.content.split('\n\n').map((para, i) => (
                <p key={i} className="mb-6 font-inter text-base leading-relaxed text-slate-700">{para}</p>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-brand-border pt-6">
              <Tag className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-brand-border bg-brand-background px-3 py-1 font-inter text-xs font-medium text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author bio */}
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-background p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-secondary font-poppins text-xl font-bold text-white">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-poppins text-base font-semibold text-brand-primary">{post.authorName}</p>
              <p className="font-inter text-sm text-slate-500">PRORYN TECH</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related insights ── */}
      {related.length > 0 && (
        <section className="bg-brand-background py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-8 font-poppins text-2xl font-bold text-brand-primary">Related Insights</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blogs/${r.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    {r.featuredImage ? (
                      <Image src={r.featuredImage} alt={r.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 inline-block self-start rounded-full bg-brand-accent/10 px-2.5 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-brand-accent">
                      {r.category}
                    </span>
                    <h3 className="font-poppins text-base font-semibold leading-snug text-brand-primary">{r.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1 font-inter text-sm font-medium text-brand-secondary">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blogs" className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white hover:bg-blue-700">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
