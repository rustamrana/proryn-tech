import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { getPublishedBlogs } from '@/lib/blog';
import BlogsExplorer from '@/components/sections/BlogsExplorer';

// Always reflect the current database state.
export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      {/* ── Premium hero ── */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-28 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 15% -5%, rgba(37,99,235,0.22) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 85% 100%, rgba(6,182,212,0.12) 0%, transparent 55%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-inter text-sm text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li className="text-white/80" aria-current="page">Blogs &amp; Insights</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-inter text-sm text-white/70">
              <BookOpen className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              Insights &amp; Articles
            </span>
            <h1 className="font-poppins text-4xl font-extrabold text-white sm:text-5xl">
              Blogs &amp;{' '}
              <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="mt-5 max-w-2xl font-inter text-lg text-white/60">
              Insights on enterprise technology, AI, digital transformation, software
              engineering, cloud, cybersecurity and modern business technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── DB-driven, filterable article grid ── */}
      <BlogsExplorer posts={posts} />
    </>
  );
}
