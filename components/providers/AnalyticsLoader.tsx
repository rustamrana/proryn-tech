'use client';

import AnalyticsProvider from './AnalyticsProvider';

export default function AnalyticsLoader({ children }: { children: React.ReactNode }) {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
}
