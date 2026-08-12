/**
 * PRORYN TECH Logo Components
 *
 * Text-only branding for the header. No icon/image.
 */

interface LogoWithTextProps {
  scrolled: boolean;
}

export function LogoWithText({ scrolled }: LogoWithTextProps) {
  const prorynColor = scrolled ? '#0F172A' : '#FFFFFF';

  return (
    <span className="flex flex-col justify-center items-start shrink-0 whitespace-nowrap" style={{ maxWidth: '280px' }}>
      {/* Company name */}
      <span className="flex items-baseline gap-0">
        <span
          className="font-inter leading-none"
          style={{ fontWeight: 800, fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', color: prorynColor, letterSpacing: '-0.03em' }}
        >
          PRORYN
        </span>
        <span
          className="font-inter leading-none"
          style={{ fontWeight: 800, fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', color: '#2563EB', letterSpacing: '-0.03em' }}
        >
          &nbsp;TECH
        </span>
      </span>
      {/* Tagline — hidden on mobile */}
      <span
        className="hidden md:block"
        style={{ fontFamily: 'var(--font-inter), sans-serif', fontStyle: 'normal', fontSize: '10px', fontWeight: 500, letterSpacing: '0.20em', marginTop: '4px', color: '#94A3B8', textTransform: 'uppercase' }}
      >
        Engineering Intelligent Solutions
      </span>
    </span>
  );
}

// Keep export to avoid import errors
export function ProrynIcon({ className = 'h-9 w-9' }: { className?: string; color?: string }) {
  return <span className={className} aria-hidden="true" />;
}
