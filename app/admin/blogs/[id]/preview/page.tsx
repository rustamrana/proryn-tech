import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, Tag, Eye } from 'lucide-react';
import { getAdminSession } from '@/lib/auth/admin';
import { getAdminBlogById } from '@/lib/blog-admin';

export const dynamic = 'force-dynamic';

function fmt(iso: string | null) {
  if (!iso) return 'Not published';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Admin-only preview. Renders the article with the same look as the public
 * detail page, but works for any status (DRAFT/PUBLISHED/ARCHIVED) and is only
 * reachable by an authenticated ADMIN. It does NOT make the post public.
 */
export default async function BlogPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== 'ADMIN') redirect('/admin/login');

  const { id } = await params;
  const post = await getAdminBlogById(id);
  if (!post) notFound();

  const tags = (post.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Preview banner */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-amber-500 px-4 py-2 text-amber-950">
        <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold">
          <Eye className="h-4 w-4" /> Preview — status: {post.status} (not public unless PUBLISHED)
        </span>
        <Link href={`/admin/blogs/${post.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-950/10 px-3 py-1 font-inter text-sm font-semibold hover:bg-amber-950/20">
          <ArrowLeft className="h-4 w-4" /> Back to editor
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-brand-primary pt-16 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="mb-4 inline-block rounded-full bg-brand-accent/20 px-3 py-1 font-inter text-sm font-medium text-brand-accent">
            {post.category}
          </span>
          <h1 className="font-poppins text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-4 font-inter text-lg leading-relaxed text-white/70">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 font-inter text-sm text-white/60">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.authorName}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{fmt(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          </div>
        </div>
      </section>

      {post.featuredImage && (
        <div className="bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="relative -mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-brand-border shadow-card">
              <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div
            className="prose-blog font-inter text-base leading-relaxed text-slate-700 [&_h1]:font-poppins [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:font-poppins [&_h2]:text-xl [&_h2]:font-bold [&_h3]:font-poppins [&_h3]:text-lg [&_h3]:font-semibold [&_a]:text-brand-secondary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand-secondary [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-brand-border [&_td]:p-2 [&_th]:border [&_th]:border-brand-border [&_th]:bg-slate-50 [&_th]:p-2 [&_img]:rounded-xl [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-slate-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-brand-border pt-6">
              <Tag className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-brand-border bg-brand-background px-3 py-1 font-inter text-xs font-medium text-slate-600">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
