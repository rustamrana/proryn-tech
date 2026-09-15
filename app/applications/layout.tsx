import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applications',
  description:
    'Discover and launch PRORYN business applications — CRM, Sales, Inventory, HRMS, Projects, Helpdesk, Documents, Analytics and more — all powered by PRORYN BusinessOS.',
  alternates: { canonical: 'https://proryntech.com/applications' },
  openGraph: {
    title: 'PRORYN Applications — Application Center',
    description:
      'Browse, search and launch the business applications that power PRORYN BusinessOS.',
    url: 'https://proryntech.com/applications',
    type: 'website',
  },
};

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
