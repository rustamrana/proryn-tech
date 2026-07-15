'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * When `true` (default), the hook stops observing after the element first
   * enters the viewport — `isIntersecting` stays `true` permanently.
   * Set to `false` to keep tracking every intersection change.
   */
  once?: boolean;
}

/**
 * Observes whether the element referenced by `ref` is intersecting the
 * viewport (or a specified root). Guards against SSR environments where
 * `IntersectionObserver` is not available.
 *
 * @param ref     - A React ref pointing to the element to observe.
 * @param options - Optional `IntersectionObserverInit` options plus `once`.
 * @returns `{ isIntersecting: boolean }`
 */
export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {},
): { isIntersecting: boolean } {
  const { once = true, root, rootMargin, threshold } = options;

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  // Keep a stable reference to the observer so we can disconnect on cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once, root, rootMargin, JSON.stringify(threshold)]);

  return { isIntersecting };
}
