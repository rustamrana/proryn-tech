'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/**
 * Floating "Back to Top" button.
 * Appears after scrolling down 400px.
 * Positioned bottom-left to not conflict with PRORYN AI (bottom-right).
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="
            fixed z-40
            bottom-6 left-6
            w-11 h-11 rounded-full
            bg-brand-primary/90 backdrop-blur-sm
            text-white
            flex items-center justify-center
            shadow-lg shadow-brand-primary/20
            hover:bg-brand-primary hover:scale-110
            active:scale-95
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
          "
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
