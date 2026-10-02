'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Plus, Eye, Pencil, Trash2, Send, EyeOff, FileText, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { BLOG_CATEGORIES } from '@/lib/validation/blog';

interface Row {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featuredImage: string | null;
  viewCount: number;
  publishedAt: string | null;
  updatedAt: string;
}

const STATUS_STYLES: Record<Row['status'], string> = {
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  DRAFT: 'bg-amber-50 text-amber-700 border-amber-200',
  ARCHIVED: 'bg-slate-100 text-slate-600 border-slate-200',
};

function fmt(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

type PendingAction =
  | { type: 'delete'; row: Row }
  | { type: 'publish'; row: Row }
  | { type: 'unpublish'; row: Row }
  | null;

export default function BlogAdminList() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState<PendingAction>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ search, status, category, page: String(page) });
      const res = await fetch(`/api/admin/blogs?${qs.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRows(data.items);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } else {
        toast(data.message ?? 'Failed to load blogs.', 'error');
      }
    } catch {
      toast('Failed to load blogs.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, status, category, page, toast]);

  // Debounce search; reload on filters/page.
  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const runAction = async () => {
    if (!pending) return;
    setBusy(true);
    const { type, row } = pending;
    try {
      let res: Response;
      if (type === 'delete') {
        res = await fetch(`/api/admin/blogs/${row.id}`, { method: 'DELETE' });
      } else {
        res = await fetch(`/api/admin/blogs/${row.id}/${type}`, { method: 'PATCH' });
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast(
          type === 'delete' ? 'Blog deleted.' : type === 'publish' ? 'Blog published.' : 'Blog unpublished.',
          'success',
        );
        setPending(null);
        await load();
      } else {
        toast(data.message ?? 'Action failed.', 'error');
      }
    } catch {
      toast('Action failed.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-extrabold text-brand-primary">Blog Management</h1>
          <p className="mt-1 font-inter text-sm text-slate-500">{total} article{total !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            placeholder="Search by title, slug, author…" aria-label="Search blogs"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 font-inter text-sm outline-none focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15" />
        </div>
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }} aria-label="Filter by status"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-inter text-sm outline-none focus:border-brand-secondary">
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }} aria-label="Filter by category"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-inter text-sm outline-none focus:border-brand-secondary">
          <option value="All">All categories</option>
          {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-inter text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-16 text-center font-inter text-sm text-slate-400">Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FileText className="h-8 w-8" />
                    <p className="font-inter text-sm">No blogs found.</p>
                  </div>
                </td></tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="relative h-10 w-16 overflow-hidden rounded-md bg-slate-100">
                        {row.featuredImage ? (
                          <Image src={row.featuredImage} alt="" fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300"><FileText className="h-4 w-4" /></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-inter text-sm font-semibold text-slate-800 line-clamp-1">{row.title}</p>
                      <p className="font-inter text-xs text-slate-400">/{row.slug}</p>
                    </td>
                    <td className="px-4 py-3 font-inter text-sm text-slate-600">{row.category}</td>
                    <td className="px-4 py-3 font-inter text-sm text-slate-600">{row.authorName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 font-inter text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-inter text-sm text-slate-500">{fmt(row.publishedAt)}</td>
                    <td className="px-4 py-3 font-inter text-sm text-slate-500">{row.viewCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {row.status === 'PUBLISHED' && (
                          <a href={`/blogs/${row.slug}`} target="_blank" rel="noreferrer" title="View live"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-brand-secondary"><Eye className="h-4 w-4" /></a>
                        )}
                        <Link href={`/admin/blogs/${row.id}/preview`} title="Preview"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-brand-secondary"><FileText className="h-4 w-4" /></Link>
                        <Link href={`/admin/blogs/${row.id}`} title="Edit"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-brand-secondary"><Pencil className="h-4 w-4" /></Link>
                        {row.status === 'PUBLISHED' ? (
                          <button title="Unpublish" onClick={() => setPending({ type: 'unpublish', row })}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-amber-50 hover:text-amber-600"><EyeOff className="h-4 w-4" /></button>
                        ) : (
                          <button title="Publish" onClick={() => setPending({ type: 'publish', row })}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"><Send className="h-4 w-4" /></button>
                        )}
                        <button title="Delete" onClick={() => setPending({ type: 'delete', row })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <p className="font-inter text-sm text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-inter text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-inter text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation dialogs */}
      <ConfirmDialog
        open={pending?.type === 'delete'}
        title="Delete blog?"
        message={`"${pending?.row.title ?? ''}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        busy={busy}
        onConfirm={runAction}
        onCancel={() => setPending(null)}
      />
      <ConfirmDialog
        open={pending?.type === 'publish'}
        title="Publish blog?"
        message={`"${pending?.row.title ?? ''}" will become visible on the public website.`}
        confirmLabel="Publish"
        busy={busy}
        onConfirm={runAction}
        onCancel={() => setPending(null)}
      />
      <ConfirmDialog
        open={pending?.type === 'unpublish'}
        title="Unpublish blog?"
        message={`"${pending?.row.title ?? ''}" will be moved to Draft and hidden from the public website.`}
        confirmLabel="Unpublish"
        busy={busy}
        onConfirm={runAction}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
