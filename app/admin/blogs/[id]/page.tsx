import { redirect, notFound } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/admin';
import { getAdminBlogById } from '@/lib/blog-admin';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== 'ADMIN') redirect('/admin/login');

  const { id } = await params;
  const blog = await getAdminBlogById(id);
  if (!blog) notFound();

  return (
    <>
      <AdminHeader name={session.name} />
      <BlogForm
        initial={{
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          excerpt: blog.excerpt,
          content: blog.content,
          featuredImage: blog.featuredImage ?? '',
          authorName: blog.authorName,
          readingTime: blog.readingTime,
          tags: blog.tags ?? '',
          seoTitle: blog.seoTitle ?? '',
          seoDescription: blog.seoDescription ?? '',
          seoKeywords: blog.seoKeywords ?? '',
          status: blog.status,
        }}
      />
    </>
  );
}
