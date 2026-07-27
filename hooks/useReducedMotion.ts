'use client';

import { useEffect, useState } from 'react';

/**
 * Detects whether the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 *
 * Returns `true` when reduced motion is preferred — animations should
 * be disabled or minimized. Listens for runtime changes (e.g. user
 * toggles the OS accessibility setting while the page is open).
 *
 * Safe for SSR: defaults to `false` on the server and hydrates on mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes (user toggles OS setting)
    const handleChange = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
