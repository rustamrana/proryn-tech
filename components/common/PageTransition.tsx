'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Thin top progress bar that appears during route transitions.
 * Does NOT block page content — just a slim indicator at the top.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const prevPath = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start bar
    setActive(true);
    setWidth(0);

    // Animate to 90% quickly
    const t1 = setTimeout(() => setWidth(90), 50);
    // Complete and hide after 500ms total
    const t2 = setTimeout(() => {
      setWidth(100);
      const t3 = setTimeout(() => {
        setActive(false);
        setWidth(0);
      }, 200);
      timerRef.current = t3;
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="progress-bar"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 z-[300] h-[3px] rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent"
          style={{
            width: `${width}%`,
            transition: width === 0 ? 'none' : `width ${width === 100 ? 0.15 : 0.3}s ease-out`,
          }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
