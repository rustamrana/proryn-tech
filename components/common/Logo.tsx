/**
 * PRORYN TECH Logo Components
 *
 * LogoWithText — text-only wordmark with accent dot (used in Navbar)
 *
 * To add the real logo image later:
 *   1. Place your logo file at /public/logo.png or /public/logo.svg
 *   2. Replace the text mark below with:
 *      <Image src="/logo.png" alt="PRORYN TECH" width={120} height={36} priority />
 */

interface LogoWithTextProps {
  scrolled: boolean;
}

export function LogoWithText({ scrolled }: LogoWithTextProps) {
  const prorynColor = scrolled ? '#0F172A' : '#FFFFFF';

  return (
    <span className="flex items-center">
      <span
        className="font-poppins font-black leading-none tracking-tight"
        style={{ fontSize: '1.35rem', color: prorynColor, letterSpacing: '-0.01em' }}
      >
        PRORYN
      </span>
      <span
        className="font-poppins font-black leading-none tracking-tight"
        style={{ fontSize: '1.35rem', color: '#2563EB', letterSpacing: '-0.01em' }}
      >
        &nbsp;TECH
      </span>
    </span>
  );
}

// Keep ProrynIcon exported as null-render to avoid import errors in loading/transition files
export function ProrynIcon({ className = 'h-9 w-7', color = '#06B6D4' }: { className?: string; color?: string }) {
  // Plain circle placeholder — replace with real logo image when available
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-brand-accent/20 ${className}`}
      aria-hidden="true"
    >
      <span
        className="font-poppins font-extrabold text-brand-accent"
        style={{ fontSize: '0.75rem', color }}
      >
        P
      </span>
    </span>
  );
}
