import type { Metadata } from 'next';
import { ToastProvider } from '@/components/admin/Toast';

export const metadata: Metadata = {
  title: 'Admin — PRORYN TECH',
  robots: { index: false, follow: false },
};

/**
 * Admin area shell. Authorization is enforced by middleware.ts (redirects
 * unauthenticated/non-admin users to /admin/login) and re-checked in every
 * /api/admin route via requireAdmin(). This layout only provides the toast
 * context and a neutral background.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 font-inter">{children}</div>
    </ToastProvider>
  );
}
