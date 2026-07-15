'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { NavItem } from '@/types';

// ─── Animation variants ───────────────────────────────────────────────────────

const menuVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const menuTransition = { duration: 0.2 };

// ─── Props ────────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  /** Whether the menu is currently visible */
  isOpen: boolean;
  /** The nav item that triggered the megamenu */
  item: NavItem;
  /** Callback when the mouse leaves the entire megamenu panel */
  onMouseLeave: () => void;
  /** Called when a child link is clicked (e.g. to close the menu) */
  onLinkClick?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MegaMenu({
  isOpen,
  item,
  onMouseLeave,
  onLinkClick,
}: MegaMenuProps) {
  if (!item.children?.length) return null;

  // Choose 2-col for ≤6 children, 3-col for more
  const gridCols =
    item.children.length > 6
      ? 'grid-cols-2 sm:grid-cols-3'
      : 'grid-cols-2';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="region"
          aria-label={`${item.label} sub-menu`}
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={menuTransition}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-xl border border-brand-border bg-white shadow-card-hover"
          style={{ minWidth: '480px', maxWidth: '640px' }}
        >
          {/* Arrow pointer */}
          <div
            aria-hidden="true"
            className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-brand-border bg-white"
          />

          <div className="relative z-10 p-6">
            {/* Section heading */}
            <p className="mb-4 font-poppins text-xs font-semibold uppercase tracking-widest text-slate-400">
              {item.label}
            </p>

            {/* Links grid */}
            <ul className={`grid gap-1 ${gridCols}`}>
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onLinkClick}
                    className="block rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-brand-secondary/5 hover:text-brand-secondary"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer CTA link */}
            <div className="mt-4 border-t border-brand-border pt-4">
              <Link
                href={item.href}
                onClick={onLinkClick}
                className="font-inter text-sm font-semibold text-brand-secondary hover:text-blue-700 transition-colors duration-150"
              >
                View all {item.label} →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
