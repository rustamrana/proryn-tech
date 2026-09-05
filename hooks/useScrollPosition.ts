'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current vertical scroll position (scrollY) throttled via
 * requestAnimationFrame so the Navbar re-renders at most once per frame
 * instead of on every scroll event.
 *
 * Initializes with the actual scrollY on the client to avoid a white-logo
 * flash on pages that load already scrolled (e.g. hash links, back navigation).
 */
export function useScrollPosition(): number {
  // Initialize directly from window.scrollY on the client so the navbar
  // renders with the correct scrolled/not-scrolled state immediately —
  // no flash, no layout shift, no wrong logo on first paint.
  const [scrollY, setScrollY] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.scrollY;
    return 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const handleScroll = (): void => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = null;
      });
    };

    // Re-sync on mount in case the lazy initializer ran during SSR (returns 0)
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
