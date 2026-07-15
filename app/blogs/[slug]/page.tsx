import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog-posts';
import BlogCard from '@/components/common/BlogCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.title,
    description: post.excerpt.slice(0, 155),
    alternates: { canonical: `https://proryntech.com/blogs/${post.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-primary pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/blogs" className="mb-6 inline-flex items-center gap-2 font-inter text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </Link>
          <span className="mb-4 inline-block rounded-full bg-brand-accent/20 px-3 py-1 font-inter text-sm font-medium text-brand-accent">
            {post.category}
          </span>
          <h1 className="font-poppins text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-inter text-sm text-white/60">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-8 font-inter text-lg leading-relaxed text-slate-600 italic border-l-4 border-brand-secondary pl-5">
            {post.excerpt.split('.')[0]}.
          </p>
          {post.content ? (
            post.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-6 font-inter text-base leading-relaxed text-slate-700">{para}</p>
            ))
          ) : (
            <p className="font-inter text-base text-slate-600">{post.excerpt}</p>
          )}

          {/* Author bio */}
          <div className="mt-12 rounded-2xl border border-brand-border bg-brand-background p-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-secondary font-poppins text-xl font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-poppins text-base font-semibold text-brand-primary">{post.author}</p>
              <p className="font-inter text-sm text-slate-500">Technology Writer, PRORYN TECH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-brand-background py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 font-poppins text-2xl font-bold text-brand-primary">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} slug={p.slug} category={p.category} title={p.title}
                  excerpt={p.excerpt} author={p.author} date={p.date} readTime={p.readTime} />
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
