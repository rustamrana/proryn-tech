'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ScrollAnimation =
  | 'fade-up'
  | 'fade-in'
  | 'slide-left'
  | 'slide-right';

export interface ScrollAnimatorProps {
  children: React.ReactNode;
  /** Animation style applied when the element enters the viewport */
  animation?: ScrollAnimation;
  /** Delay in ms between staggered child animations (default: 100) */
  staggerDelay?: number;
  /** IntersectionObserver threshold — fraction of element visible to trigger (default: 0.1) */
  threshold?: number;
  /** Enable parallax vertical translation on scroll */
  parallax?: boolean;
  /** Parallax multiplier — higher = more movement (default: 0.3) */
  parallaxSpeed?: number;
  /** Additional class names for the wrapper */
  className?: string;
}

// ─── Animation Variant Definitions ───────────────────────────────────────────

const ANIMATION_VARIANTS: Record<ScrollAnimation, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ScrollAnimator wraps children with scroll-triggered entrance animations
 * and optional parallax effects.
 *
 * When `prefers-reduced-motion` is active, content renders statically
 * without any animation or parallax — meeting WCAG accessibility guidelines.
 *
 * @example
 * ```tsx
 * <ScrollAnimator animation="fade-up" staggerDelay={120}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </ScrollAnimator>
 * ```
 */
export default function ScrollAnimator({
  children,
  animation = 'fade-up',
  staggerDelay = 100,
  threshold = 0.1,
  parallax = false,
  parallaxSpeed = 0.3,
  className,
}: ScrollAnimatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Trigger animation once when element comes into view
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to a vertical translation (parallax effect)
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeed * 100, -parallaxSpeed * 100]
  );

  // ─── Reduced Motion: Render statically ─────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // ─── Container Variants (for staggering children) ──────────────────────────
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay / 1000, // Convert ms to seconds
      },
    },
  };

  const childVariants = ANIMATION_VARIANTS[animation];

  // ─── Parallax Wrapper ──────────────────────────────────────────────────────
  if (parallax) {
    return (
      <motion.div
        ref={ref}
        style={{ y: parallaxY }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={className}
      >
        {wrapChildrenWithVariants(children, childVariants)}
      </motion.div>
    );
  }

  // ─── Standard (no parallax) ────────────────────────────────────────────────
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {wrapChildrenWithVariants(children, childVariants)}
    </motion.div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Wraps each direct child element in a `motion.div` with the given variants
 * so that staggerChildren on the container actually staggers each item.
 *
 * If there's only a single child (or children aren't iterable), the whole
 * block is wrapped as one animated unit.
 */
function wrapChildrenWithVariants(
  children: React.ReactNode,
  variants: Variants
): React.ReactNode {
  // If children is a single element or non-array, wrap the whole thing
  if (!Array.isArray(children)) {
    return <motion.div variants={variants}>{children}</motion.div>;
  }

  // Wrap each array child individually for stagger effect
  return children.map((child, index) => (
    <motion.div key={index} variants={variants}>
      {child}
    </motion.div>
  ));
}
