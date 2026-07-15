'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number; // ms, default 1500
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1500,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref, { once: true });

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (isIntersecting) {
      animate(motionValue, value, {
        duration: duration / 1000,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isIntersecting, value, duration, motionValue]);

  return (
    <div ref={ref} className={cn('flex flex-col items-center text-center', className)}>
      <div className="font-poppins text-4xl font-bold text-brand-primary sm:text-5xl">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-2 font-inter text-sm font-medium text-slate-600 sm:text-base">{label}</p>
    </div>
  );
}
