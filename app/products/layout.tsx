import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Explore PRORYN BusinessOS and our suite of SaaS products — AI-powered platforms for CRM, HRMS, document management, payroll, and project management.',
  alternates: { canonical: 'https://proryntech.com/products' },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
