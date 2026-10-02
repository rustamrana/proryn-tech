'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, FileText } from 'lucide-react';

export default function AdminHeader({ name }: { name: string }) {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/blogs" className="flex items-center gap-2">
            <span className="font-poppins text-lg font-black tracking-tight text-brand-primary">PRORYN</span>
            <span className="font-poppins text-lg font-black tracking-tight text-brand-secondary">TECH</span>
            <span className="ml-1 hidden items-center gap-1.5 rounded-full bg-brand-secondary/10 px-3 py-1 font-inter text-xs font-semibold text-brand-secondary sm:inline-flex">
              <LayoutDashboard className="h-3 w-3" /> Admin
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/admin/blogs" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-secondary">
              <FileText className="h-4 w-4" /> Blogs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-inter text-sm text-slate-500 sm:inline">{name}</span>
          <button onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4" /><span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
