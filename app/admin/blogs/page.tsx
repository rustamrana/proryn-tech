import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/admin';
import { getAdminStats } from '@/lib/blog-admin';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogAdminList from '@/components/admin/BlogAdminList';
import { FileText, CheckCircle2, FileEdit } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
  const session = await getAdminSession();
  if (!session || session.role !== 'ADMIN') redirect('/admin/login');

  const stats = await getAdminStats();

  const cards = [
    { label: 'Total', value: stats.total, icon: FileText, color: 'bg-brand-secondary' },
    { label: 'Published', value: stats.published, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'Drafts', value: stats.drafts, icon: FileEdit, color: 'bg-amber-500' },
  ];

  return (
    <>
      <AdminHeader name={session.name} />

      {/* Dashboard stat cards */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-poppins text-2xl font-bold text-brand-primary">{value}</p>
                  <p className="font-inter text-sm text-slate-500">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BlogAdminList />
    </>
  );
}
