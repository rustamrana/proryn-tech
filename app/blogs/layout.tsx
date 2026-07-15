import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Expert insights on enterprise software, AI, cloud, business automation, and digital transformation from the PRORYN TECH engineering team.',
  alternates: { canonical: 'https://proryntech.com/blogs' },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
