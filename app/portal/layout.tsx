'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { clearSession, getSession } from '@/lib/auth/demo-auth';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/portal/login';

  const handleLogout = () => {
    clearSession();
    router.push('/portal/login');
  };

  // Only show full header (with logout) on authenticated pages
  const session = typeof window !== 'undefined' ? getSession() : null;

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Portal Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Portal Label */}
          <Link href="/portal/dashboard" className="flex items-center gap-3">
            <span className="flex items-center">
              <span className="font-poppins text-xl font-black text-brand-primary tracking-tight">
                PRORYN
              </span>
              <span className="font-poppins text-xl font-black text-brand-secondary tracking-tight">
                &nbsp;TECH
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/10 px-3 py-1 font-inter text-xs font-semibold text-brand-secondary">
              <LayoutDashboard className="h-3 w-3" />
              Client Portal
            </span>
          </Link>

          {/* Right side: user info + logout */}
          {!isLoginPage && session && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="font-inter text-sm font-semibold text-slate-700">{session.name}</p>
                <p className="font-inter text-xs text-slate-400">{session.company}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                <span className="font-poppins text-sm font-bold text-brand-secondary">
                  {session.name.charAt(0)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
