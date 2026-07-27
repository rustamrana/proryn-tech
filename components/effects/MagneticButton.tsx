'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Attraction radius in px (default: 20) */
  radius?: number;
  /** Movement multiplier (default: 0.3) */
  strength?: number;
}

// ─── Spring Config ───────────────────────────────────────────────────────────

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * MagneticButton applies a subtle magnetic attraction effect that shifts the
 * element toward the cursor when hovering within the configured radius.
 *
 * Resets position on mouse leave with spring easing.
 * Disabled when `prefers-reduced-motion` is active.
 *
 * @example
 * ```tsx
 * <MagneticButton radius={20} strength={0.3}>
 *   <button className="btn-primary">Get Started</button>
 * </MagneticButton>
 * ```
 */
export default function MagneticButton({
  children,
  radius = 20,
  strength = 0.3,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for smooth x/y translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-animated values for smooth transitions
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  // ─── Reduced Motion: Render statically ───────────────────────────────────
  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from cursor to element center
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Only apply magnetic effect within the radius
    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    // Reset to origin with spring easing
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
