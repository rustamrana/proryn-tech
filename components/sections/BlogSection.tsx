import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User, Calendar, BookOpen } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { getLatestPublishedBlogs, type PublicBlog } from '@/lib/blog';

export const dynamic = 'force-dynamic';

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function HomeBlogCard({ post }: { post: PublicBlog }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
        {post.featuredImage ? (
          <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-300 hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10">
            <BookOpen className="h-10 w-10 text-brand-secondary/40" aria-hidden="true" />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-block self-start rounded-full bg-brand-accent/10 px-3 py-1 font-inter text-xs font-semibold uppercase tracking-wider text-brand-accent">
          {post.category}
        </span>
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="mb-3 font-poppins text-lg font-semibold leading-snug text-brand-primary transition-colors duration-200 hover:text-brand-secondary">
            {post.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 font-inter text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-xs text-slate-500">
          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.authorName}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime} min read</span>
        </div>
        <div className="mt-4 border-t border-brand-border pt-4">
          <Link href={`/blogs/${post.slug}`} className="inline-flex items-center gap-1 font-inter text-sm font-medium text-brand-secondary transition-all duration-200 hover:gap-2">
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function BlogSection() {
  let posts: PublicBlog[] = [];
  try {
    posts = await getLatestPublishedBlogs(3);
  } catch {
    posts = [];
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Insights & Articles"
          heading="From Our Knowledge Base"
          subheading="Stay ahead of the curve with expert insights on enterprise technology, digital transformation, AI, and software engineering best practices."
          align="center"
        />

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <HomeBlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
              >
                View All Insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          /* Professional empty state — no broken cards */
          <div className="mx-auto mt-4 flex max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-brand-background px-6 py-14 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
              <BookOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="font-poppins text-lg font-semibold text-brand-primary">Insights coming soon</h3>
            <p className="mt-2 font-inter text-sm text-slate-500">
              We&apos;re preparing expert articles on enterprise technology, AI, and digital transformation. Check back shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
