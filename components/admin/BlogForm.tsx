'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, Send, Eye, X, ImageIcon } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { BLOG_CATEGORIES } from '@/lib/validation/blog';
import { slugify } from '@/lib/slug';

export interface BlogFormValues {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorName: string;
  readingTime: number;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

const EMPTY: BlogFormValues = {
  title: '', slug: '', category: BLOG_CATEGORIES[0], excerpt: '', content: '',
  featuredImage: '', authorName: '', readingTime: 5, tags: '',
  seoTitle: '', seoDescription: '', seoKeywords: '', status: 'DRAFT',
};

function labelCls() {
  return 'font-inter text-sm font-semibold text-slate-700';
}
function inputCls(err?: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 font-inter text-sm text-slate-800 outline-none transition-all focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15 ${err ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'}`;
}

export default function BlogForm({ initial }: { initial?: BlogFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [v, setV] = useState<BlogFormValues>(initial ?? EMPTY);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }));

  const onTitle = (title: string) => {
    set('title', title);
    if (!slugEdited) set('slug', slugify(title));
  };

  const clientValidate = (publishing: boolean): boolean => {
    const e: Record<string, string> = {};
    if (v.title.trim().length < 5) e.title = 'Title must be at least 5 characters.';
    if (!v.slug.trim()) e.slug = 'Slug is required.';
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug)) e.slug = 'Slug must be URL-safe.';
    if (!v.category) e.category = 'Category is required.';
    if (!v.excerpt.trim()) e.excerpt = 'Excerpt is required.';
    if (!v.content.trim() || v.content === '<p></p>') e.content = 'Content is required.';
    if (!v.authorName.trim()) e.authorName = 'Author is required.';
    if (v.featuredImage && !/^https?:\/\/.+/.test(v.featuredImage)) e.featuredImage = 'Must be a valid URL.';
    if (publishing && !v.featuredImage) e.featuredImage = 'Featured image is required to publish.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (targetStatus: 'DRAFT' | 'PUBLISHED') => {
    const publishing = targetStatus === 'PUBLISHED';
    if (!clientValidate(publishing)) {
      toast('Please fix the highlighted fields.', 'error');
      return;
    }
    setSaving(true);
    const payload = { ...v, status: targetStatus };
    try {
      const res = await fetch(isEdit ? `/api/admin/blogs/${v.id}` : '/api/admin/blogs', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast(publishing ? 'Blog published.' : 'Draft saved.', 'success');
        router.push('/admin/blogs');
        router.refresh();
        return;
      }
      toast(data.message ?? 'Save failed.', 'error');
    } catch {
      toast('Save failed. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 font-inter text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Back to Blogs
        </Link>
        <div className="flex items-center gap-2">
          {isEdit && (
            <Link href={`/admin/blogs/${v.id}/preview`} target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 font-inter text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Eye className="h-4 w-4" /> Preview
            </Link>
          )}
          <button type="button" onClick={() => submit('DRAFT')} disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-secondary bg-white px-4 py-2 font-inter text-sm font-semibold text-brand-secondary hover:bg-brand-secondary/5 disabled:opacity-60">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button type="button" onClick={() => submit('PUBLISHED')} disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2 font-inter text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
            <Send className="h-4 w-4" /> {v.status === 'PUBLISHED' ? 'Update & Publish' : 'Publish'}
          </button>
        </div>
      </div>

      <h1 className="mb-6 font-poppins text-2xl font-extrabold text-brand-primary">
        {isEdit ? 'Edit Blog' : 'New Blog'}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className={labelCls()}>Title <span className="text-red-500">*</span></label>
            <input id="title" value={v.title} onChange={(e) => onTitle(e.target.value)} className={inputCls(!!errors.title)} placeholder="Cloud Migration Strategies for Enterprise Organizations" />
            {errors.title && <p className="font-inter text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className={labelCls()}>Slug <span className="text-red-500">*</span></label>
            <input id="slug" value={v.slug}
              onChange={(e) => { setSlugEdited(true); set('slug', e.target.value); }}
              className={inputCls(!!errors.slug)} placeholder="cloud-migration-strategies-for-enterprise-organizations" />
            {errors.slug && <p className="font-inter text-xs text-red-500">{errors.slug}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="excerpt" className={labelCls()}>Short Excerpt <span className="text-red-500">*</span></label>
            <textarea id="excerpt" rows={3} value={v.excerpt} onChange={(e) => set('excerpt', e.target.value)}
              className={inputCls(!!errors.excerpt) + ' resize-none'} placeholder="One or two sentences summarizing the article…" />
            {errors.excerpt && <p className="font-inter text-xs text-red-500">{errors.excerpt}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls()}>Content <span className="text-red-500">*</span></label>
            <RichTextEditor value={v.content} onChange={(html) => set('content', html)} />
            {errors.content && <p className="font-inter text-xs text-red-500">{errors.content}</p>}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <h2 className="mb-4 font-poppins text-sm font-bold uppercase tracking-wider text-slate-400">Publishing</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className={labelCls()}>Category <span className="text-red-500">*</span></label>
                <select id="category" value={v.category} onChange={(e) => set('category', e.target.value)} className={inputCls(!!errors.category) + ' cursor-pointer'}>
                  {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="author" className={labelCls()}>Author <span className="text-red-500">*</span></label>
                <input id="author" value={v.authorName} onChange={(e) => set('authorName', e.target.value)} className={inputCls(!!errors.authorName)} placeholder="Author name" />
                {errors.authorName && <p className="font-inter text-xs text-red-500">{errors.authorName}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="readingTime" className={labelCls()}>Reading Time (min)</label>
                <input id="readingTime" type="number" min={1} max={120} value={v.readingTime}
                  onChange={(e) => set('readingTime', Number(e.target.value))} className={inputCls()} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tags" className={labelCls()}>Tags (comma-separated)</label>
                <input id="tags" value={v.tags} onChange={(e) => set('tags', e.target.value)} className={inputCls()} placeholder="Cloud, Migration, AWS" />
              </div>
            </div>
          </div>

          {/* Featured image (URL only) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <h2 className="mb-4 font-poppins text-sm font-bold uppercase tracking-wider text-slate-400">Featured Image</h2>
            <div className="flex flex-col gap-2">
              <input value={v.featuredImage} onChange={(e) => set('featuredImage', e.target.value)}
                className={inputCls(!!errors.featuredImage)} placeholder="https://example.com/image.jpg" aria-label="Featured image URL" />
              {errors.featuredImage && <p className="font-inter text-xs text-red-500">{errors.featuredImage}</p>}
              {v.featuredImage ? (
                <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <Image src={v.featuredImage} alt="Featured preview" fill sizes="320px" className="object-cover"
                    onError={() => toast('Image URL could not be loaded.', 'error')} />
                  <button type="button" onClick={() => set('featuredImage', '')}
                    className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/60 text-white hover:bg-slate-900"
                    aria-label="Remove image"><X className="h-4 w-4" /></button>
                </div>
              ) : (
                <div className="mt-2 flex aspect-[16/9] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-300">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <p className="font-inter text-xs text-slate-400">Required before publishing. Paste a public HTTPS image URL.</p>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <h2 className="mb-4 font-poppins text-sm font-bold uppercase tracking-wider text-slate-400">SEO</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="seoTitle" className={labelCls()}>SEO Title</label>
                <input id="seoTitle" value={v.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className={inputCls()} placeholder="Defaults to the title" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="seoDescription" className={labelCls()}>SEO Description</label>
                <textarea id="seoDescription" rows={3} value={v.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} className={inputCls() + ' resize-none'} placeholder="Defaults to the excerpt" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="seoKeywords" className={labelCls()}>SEO Keywords</label>
                <input id="seoKeywords" value={v.seoKeywords} onChange={(e) => set('seoKeywords', e.target.value)} className={inputCls()} placeholder="comma, separated, keywords" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
