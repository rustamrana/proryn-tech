import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Join PRORYN TECH — explore open engineering, design, and sales positions. Build enterprise software that makes a real difference.',
  alternates: { canonical: 'https://proryntech.com/careers' },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
