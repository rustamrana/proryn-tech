'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardGlowProps {
  children: React.ReactNode;
  className?: string;
  /** Glow color — defaults to brand-accent with low opacity */
  glowColor?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * CardGlow renders a radial gradient overlay that follows the cursor position,
 * creating a subtle glow/highlight effect on interactive cards.
 *
 * GPU-accelerated via CSS `background` property (no layout thrash).
 * Disabled when `prefers-reduced-motion` is active.
 *
 * @example
 * ```tsx
 * <CardGlow className="rounded-xl border p-6">
 *   <h3>Service Title</h3>
 *   <p>Description...</p>
 * </CardGlow>
 * ```
 */
export default function CardGlow({
  children,
  className,
  glowColor = 'rgba(6, 182, 212, 0.15)',
}: CardGlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // ─── Reduced Motion: Render without glow effect ──────────────────────────
  if (prefersReducedMotion) {
    return <div className={cn('relative overflow-hidden', className)}>{children}</div>;
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setGlowPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 150px at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
