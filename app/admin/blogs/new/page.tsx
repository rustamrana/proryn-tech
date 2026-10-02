import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/admin';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  const session = await getAdminSession();
  if (!session || session.role !== 'ADMIN') redirect('/admin/login');

  return (
    <>
      <AdminHeader name={session.name} />
      {/* Prefill the author with the signed-in admin's name. */}
      <BlogForm
        initial={{
          title: '', slug: '', category: 'Artificial Intelligence', excerpt: '', content: '',
          featuredImage: '', authorName: session.name, readingTime: 5, tags: '',
          seoTitle: '', seoDescription: '', seoKeywords: '', status: 'DRAFT',
        }}
      />
    </>
  );
}
