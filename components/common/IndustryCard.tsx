'use client';

import { useState } from 'react';
import {
  Building2,
  Factory,
  Heart,
  GraduationCap,
  Landmark,
  HardHat,
  ShoppingBag,
  DollarSign,
  Hotel,
  Home,
  Truck,
  Globe,
  Brain,
  Cloud,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Factory,
  Heart,
  GraduationCap,
  Landmark,
  HardHat,
  ShoppingBag,
  DollarSign,
  Hotel,
  Home,
  Truck,
  Globe,
  Brain,
  Cloud,
  Users,
};

interface IndustryCardProps {
  icon: string;
  name: string;
  description: string;
  className?: string;
}

export default function IndustryCard({ icon, name, description, className }: IndustryCardProps) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = ICON_MAP[icon] ?? Building2;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex flex-col rounded-xl border bg-white p-6 transition-all duration-200',
        hovered ? 'border-brand-secondary shadow-card-hover' : 'border-brand-border shadow-card',
        className,
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200',
          hovered ? 'bg-brand-secondary/10' : 'bg-brand-accent/10',
        )}
      >
        <IconComponent className="h-6 w-6 text-brand-accent" />
      </div>

      {/* Name */}
      <h3 className="mb-2 font-poppins text-lg font-semibold text-brand-primary">{name}</h3>

      {/* Description */}
      <p className="font-inter text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
