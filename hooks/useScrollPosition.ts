'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current vertical scroll position (scrollY) throttled via
 * requestAnimationFrame so the Navbar re-renders at most once per frame
 * instead of on every scroll event.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const handleScroll = (): void => {
      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = null;
      });
    };

    // Capture immediately on mount
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
