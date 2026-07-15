'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2, Globe, Smartphone, Brain, Workflow, Cloud,
  Users, Headphones, Lightbulb, Code2, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Globe, Smartphone, Brain, Workflow, Cloud,
  Users, Headphones, HeadphonesIcon: Headphones, Lightbulb, Code2,
};

// Unique accent colors per service for visual differentiation
const CARD_ACCENTS: Record<string, { iconBg: string; iconColor: string; hoverBg: string }> = {
  Building2:      { iconBg: 'bg-blue-50',   iconColor: 'text-blue-600',   hoverBg: 'bg-blue-600' },
  Globe:          { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', hoverBg: 'bg-indigo-600' },
  Smartphone:     { iconBg: 'bg-violet-50', iconColor: 'text-violet-600', hoverBg: 'bg-violet-600' },
  Brain:          { iconBg: 'bg-cyan-50',   iconColor: 'text-cyan-600',   hoverBg: 'bg-cyan-600' },
  Workflow:       { iconBg: 'bg-amber-50',  iconColor: 'text-amber-600',  hoverBg: 'bg-amber-600' },
  Cloud:          { iconBg: 'bg-sky-50',    iconColor: 'text-sky-600',    hoverBg: 'bg-sky-600' },
  Users:          { iconBg: 'bg-teal-50',   iconColor: 'text-teal-600',   hoverBg: 'bg-teal-600' },
  Headphones:     { iconBg: 'bg-rose-50',   iconColor: 'text-rose-600',   hoverBg: 'bg-rose-600' },
  HeadphonesIcon: { iconBg: 'bg-rose-50',   iconColor: 'text-rose-600',   hoverBg: 'bg-rose-600' },
  Lightbulb:      { iconBg: 'bg-orange-50', iconColor: 'text-orange-600', hoverBg: 'bg-orange-600' },
};

const DEFAULT_ACCENT = { iconBg: 'bg-blue-50', iconColor: 'text-blue-600', hoverBg: 'bg-blue-600' };

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
  className?: string;
}

export default function ServiceCard({ icon, title, description, features, href, className }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = ICON_MAP[icon] ?? Code2;
  const accent = CARD_ACCENTS[icon] ?? DEFAULT_ACCENT;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -6 : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'group relative flex flex-col rounded-2xl border border-brand-border bg-white p-7',
        'transition-shadow duration-300',
        hovered ? 'shadow-card-hover' : 'shadow-card',
        className,
      )}
    >
      {/* Top accent line on hover */}
      <div className={cn('absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300',
        hovered ? `${accent.hoverBg} opacity-100` : 'opacity-0')} aria-hidden="true" />

      {/* Icon */}
      <div className={cn('mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300',
        hovered ? `${accent.hoverBg} shadow-lg` : accent.iconBg)}>
        <IconComponent className={cn('h-6 w-6 transition-colors duration-300', hovered ? 'text-white' : accent.iconColor)} />
      </div>

      {/* Title */}
      <h3 className="mb-2.5 font-poppins text-[17px] font-semibold leading-snug text-brand-primary">{title}</h3>

      {/* Description */}
      <p className="mb-5 font-inter text-sm leading-relaxed text-slate-500">{description}</p>

      {/* Feature chips */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {features.map((feat) => (
          <span key={feat} className={cn('rounded-full px-2.5 py-1 font-inter text-[11px] font-medium transition-colors duration-300',
            hovered ? `${accent.iconBg} ${accent.iconColor}` : 'bg-slate-100 text-slate-600')}>
            {feat}
          </span>
        ))}
      </div>

      {/* Link */}
      {href && (
        <div className="mt-auto pt-2 border-t border-brand-border">
          <Link href={href}
            className={cn('inline-flex items-center gap-1.5 font-inter text-sm font-semibold transition-colors duration-200',
              accent.iconColor, 'hover:gap-2.5')}>
            Explore Service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
