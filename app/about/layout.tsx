import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Meet Preeti Singh, Founder & CTO of PRORYN TECH — 9+ years in enterprise software, government digital transformation, AI, and cloud technologies.',
  alternates: { canonical: 'https://proryntech.com/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
