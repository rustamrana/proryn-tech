'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/lib/constants';
import MegaMenu from './MegaMenu';
import { LogoWithText } from '@/components/common/Logo';
import type { NavItem } from '@/types';

// ─── All top-level routes to prefetch on mount ────────────────────────────────
const ALL_ROUTES = [
  '/', '/services', '/products', '/industries', '/technologies',
  '/about', '/careers', '/blogs', '/contact',
];

// ─── Animation variants ───────────────────────────────────────────────────────
const mobileMenuVariants = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};
// Snappy 150ms open — feels instant
const mobileMenuTransition = { duration: 0.15, ease: 'easeOut' as const };

// ─── Desktop nav item ─────────────────────────────────────────────────────────
interface DesktopNavItemProps {
  item: NavItem;
  isActive: boolean;
  isScrolled: boolean;
}

function DesktopNavItem({ item, isActive, isScrolled }: DesktopNavItemProps) {
  const hasMegaMenu = Boolean(item.children?.length);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 100);
  }, []);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const linkColor = isActive
    ? 'text-brand-secondary'
    : isScrolled
      ? 'text-slate-700 hover:text-brand-secondary'
      : 'text-white/90 hover:text-white';

  return (
    <li
      className="relative"
      onMouseEnter={hasMegaMenu ? openMenu : undefined}
      onMouseLeave={hasMegaMenu ? scheduleClose : undefined}
    >
      <Link
        href={item.href}
        prefetch={true}
        aria-current={isActive ? 'page' : undefined}
        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 font-inter text-sm font-medium transition-colors duration-150 ${linkColor}`}
      >
        {item.label}
        {hasMegaMenu && (
          <ChevronDown aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`} />
        )}
      </Link>

      {hasMegaMenu && (
        <MegaMenu isOpen={menuOpen} item={item} onMouseLeave={scheduleClose} onLinkClick={() => setMenuOpen(false)} />
      )}
    </li>
  );
}

// ─── Mobile nav item ─────────────────────────────────────────────────────────
interface MobileNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
}

function MobileNavItem({ item, isActive, onClose }: MobileNavItemProps) {
  const hasChildren = Boolean(item.children?.length);
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      {hasChildren ? (
        <>
          <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}
            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 font-inter text-base font-medium transition-colors duration-100 ${
              isActive ? 'text-brand-secondary' : 'text-slate-800 hover:text-brand-secondary'
            }`}>
            {item.label}
            <ChevronDown aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden pl-4">
                {item.children!.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} prefetch={true} onClick={onClose}
                      className="block rounded-lg px-4 py-2.5 font-inter text-sm text-slate-600 transition-colors duration-100 hover:text-brand-secondary">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link href={item.href} prefetch={true} onClick={onClose}
          aria-current={isActive ? 'page' : undefined}
          className={`block rounded-lg px-4 py-3 font-inter text-base font-medium transition-colors duration-100 ${
            isActive ? 'text-brand-secondary' : 'text-slate-800 hover:text-brand-secondary'
          }`}>
          {item.label}
        </Link>
      )}
    </li>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isScrolled = scrollY >= 10;

  // ── Prefetch ALL routes immediately on mount so navigation is instant ────
  useEffect(() => {
    ALL_ROUTES.forEach((route) => router.prefetch(route));
  }, [router]);

  // ── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // ── Escape key ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navbarBg = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border'
    : 'bg-transparent';

  return (
    <>
      {/* Skip to main */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-secondary focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>

      {/* Navbar */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarBg}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" prefetch={true} aria-label="PRORYN TECH – homepage"
            className="transition-opacity hover:opacity-90">
            <LogoWithText scrolled={isScrolled} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <DesktopNavItem key={item.href} item={item}
                  isActive={pathname === item.href} isScrolled={isScrolled} />
              ))}
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/products" prefetch={true}
              className={`rounded-lg border px-4 py-2 font-inter text-sm font-medium transition-colors duration-150 ${
                isScrolled
                  ? 'border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white'
                  : 'border-white/70 text-white hover:border-white hover:bg-white/10'
              }`}>
              Explore Products
            </Link>
            <Link href="/contact" prefetch={true}
              className="rounded-lg bg-brand-secondary px-4 py-2 font-inter text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">
              Book Free Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <button type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-100 lg:hidden ${
              isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}>
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.15 }}>
              {mobileOpen
                ? <X className="h-6 w-6" aria-hidden="true" />
                : <Menu className="h-6 w-6" aria-hidden="true" />
              }
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={mobileMenuTransition}
            className="fixed inset-x-0 top-16 z-50 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto bg-white lg:hidden">

            <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((item) => (
                  <MobileNavItem key={item.href} item={item}
                    isActive={pathname === item.href} onClose={closeMobile} />
                ))}
              </ul>
            </nav>

            <div className="border-t border-brand-border px-4 py-5 space-y-2.5">
              <Link href="/products" prefetch={true} onClick={closeMobile}
                className="block w-full rounded-xl border-2 border-brand-secondary px-4 py-3 text-center font-inter text-sm font-semibold text-brand-secondary transition-colors duration-150 hover:bg-brand-secondary hover:text-white">
                Explore Products
              </Link>
              <Link href="/contact" prefetch={true} onClick={closeMobile}
                className="block w-full rounded-xl bg-brand-secondary px-4 py-3 text-center font-inter text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 transition-colors duration-150 hover:bg-blue-700">
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
