'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
  headingClassName?: string;
}

export default function SectionHeader({
  badge,
  heading,
  subheading,
  align = 'center',
  className,
  headingClassName,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-12',
        isCenter ? 'text-center' : 'text-left',
        className,
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 text-sm font-medium text-brand-accent">
          {badge}
        </span>
      )}

      <h2
        className={cn(
          'font-poppins text-3xl font-bold text-brand-primary sm:text-4xl lg:text-5xl',
          headingClassName,
        )}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={cn(
            'mt-4 font-inter text-base text-slate-600 sm:text-lg',
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          )}
        >
          {subheading}
        </p>
      )}
    </motion.div>
  );
}
