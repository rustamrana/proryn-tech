/**
 * PRORYN TECH Logo Components
 *
 * Text-only branding. No images, no icons, no SVG.
 * Just the company name + tagline with proper typography.
 */

interface LogoWithTextProps {
  scrolled: boolean;
}

export function LogoWithText({ scrolled }: LogoWithTextProps) {
  const prorynColor = scrolled ? '#0F172A' : '#FFFFFF';

  return (
    <span
      className="flex flex-col justify-center items-start shrink-0 whitespace-nowrap"
      style={{ maxWidth: '280px' }}
    >
      {/* Company name */}
      <span className="flex items-baseline gap-0">
        <span
          className="font-inter leading-none"
          style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: prorynColor, letterSpacing: '-0.03em' }}
        >
          PRORYN
        </span>
        <span
          className="font-inter leading-none"
          style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#2563EB', letterSpacing: '-0.03em' }}
        >
          &nbsp;TECH
        </span>
      </span>
      {/* Tagline — hidden on mobile */}
      <span
        className="hidden sm:block"
        style={{ fontFamily: 'var(--font-inter), sans-serif', fontStyle: 'normal', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', marginTop: '6px', color: '#94A3B8' }}
      >
        Engineering Intelligent Solutions
      </span>
    </span>
  );
}

// Keep ProrynIcon exported to avoid import errors elsewhere
export function ProrynIcon({ className = 'h-9 w-7' }: { className?: string; color?: string }) {
  return <span className={className} aria-hidden="true" />;
}
