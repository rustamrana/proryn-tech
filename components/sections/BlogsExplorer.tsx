'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Calendar, BookOpen } from 'lucide-react';
import type { PublicBlog } from '@/lib/blog';
import { cn } from '@/lib/utils';

// Canonical public categories (per spec). "All" plus the standard set.
const CATEGORY_FILTERS = [
  'All',
  'Artificial Intelligence',
  'Software Engineering',
  'Cloud & DevOps',
  'Digital Transformation',
  'Enterprise Technology',
  'Cybersecurity',
  'Business Technology',
];

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ArticleCard({ post }: { post: PublicBlog }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      {/* Featured image or gradient fallback */}
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
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

        <p className="mb-4 line-clamp-2 font-inter text-sm leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-xs text-slate-500">
          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.authorName}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime} min read</span>
        </div>

        <div className="mt-4 border-t border-brand-border pt-4">
          <Link href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1 font-inter text-sm font-medium text-brand-secondary transition-all duration-200 hover:gap-2">
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogsExplorer({ posts }: { posts: PublicBlog[] }) {
  const [active, setActive] = useState('All');

  // Only show category chips that actually have posts (plus All).
  const availableFilters = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return CATEGORY_FILTERS.filter((c) => c === 'All' || present.has(c));
  }, [posts]);

  const filtered = useMemo(
    () => (active === 'All' ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  return (
    <section className="bg-brand-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter articles by category"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {availableFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                'rounded-full border px-4 py-2 font-inter text-sm font-medium transition-colors',
                active === cat
                  ? 'border-brand-secondary bg-brand-secondary text-white shadow-sm'
                  : 'border-brand-border bg-white text-slate-600 hover:border-brand-secondary/40 hover:text-brand-secondary',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section label */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-brand-primary">
              {active === 'All' ? 'All Articles' : active}
            </h2>
            <p className="mt-0.5 font-inter text-sm text-slate-500" aria-live="polite">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          {active !== 'All' && (
            <button
              type="button"
              onClick={() => setActive('All')}
              className="font-inter text-sm font-medium text-brand-secondary hover:underline"
            >
              Clear filter ×
            </button>
          )}
        </div>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <ArticleCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-white px-6 py-16 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <BookOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="font-poppins text-lg font-semibold text-brand-primary">
              No articles here yet
            </h3>
            <p className="mt-2 max-w-md font-inter text-sm text-slate-500">
              {active === 'All'
                ? 'New insights are on the way. Check back soon.'
                : `No articles in "${active}" yet. Try another category.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
