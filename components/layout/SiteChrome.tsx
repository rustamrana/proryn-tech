'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';
import ChatbotLoader from '@/components/chatbot/ChatbotLoader';
import ScrollToTop from '@/components/common/ScrollToTop';

/**
 * Renders the public marketing chrome (navbar, page transition, chatbot,
 * back-to-top) on all routes EXCEPT the admin area, which has its own
 * standalone shell. The Footer is handled separately in the root layout
 * because it is a server component.
 */
export function SiteChromeTop() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <>
      <Navbar />
      <PageTransition />
    </>
  );
}

export function SiteChromeBottom() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <>
      <Footer />
      <ChatbotLoader />
      <ScrollToTop />
    </>
  );
}
