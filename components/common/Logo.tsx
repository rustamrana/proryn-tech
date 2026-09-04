/**
 * PRORYN TECH Logo Components
 *
 * Shows white_logo.png on transparent navbar (not scrolled)
 * Shows logo_r.png on white navbar (scrolled)
 */

import Image from 'next/image';

interface LogoWithTextProps {
  scrolled: boolean;
}

export function LogoWithText({ scrolled }: LogoWithTextProps) {
  return (
    <span className="inline-flex items-center shrink-0" style={{ height: '44px' }}>
      <Image
        src={scrolled ? '/images/logo_r.png' : '/images/white_logo.png'}
        alt="PRORYN TECH"
        width={160}
        height={44}
        priority
        className="w-auto object-contain"
        style={{ height: '44px', maxHeight: '44px', display: 'block' }}
      />
    </span>
  );
}

// Keep export to avoid import errors
export function ProrynIcon({ className = 'h-9 w-9' }: { className?: string; color?: string }) {
  return <span className={className} aria-hidden="true" />;
}
