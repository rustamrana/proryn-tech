'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  modules?: string[];
  comingSoon?: boolean;
  featured?: boolean;
  className?: string;
}

export default function ProductCard({
  name,
  tagline,
  description,
  modules,
  comingSoon = false,
  featured = false,
  className,
}: ProductCardProps) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(
          'relative overflow-hidden rounded-2xl p-px',
          'bg-gradient-to-br from-brand-secondary to-brand-accent',
          className,
        )}
      >
        <div className="relative rounded-2xl bg-white p-8">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-brand-secondary" />
            <span className="font-inter text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              Flagship Product
            </span>
          </div>

          {/* Name & tagline */}
          <h3 className="mb-2 font-poppins text-2xl font-bold text-brand-primary sm:text-3xl">
            {name}
          </h3>
          <p className="mb-4 font-inter text-base italic text-brand-secondary">{tagline}</p>

          {/* Description */}
          <p className="mb-6 font-inter text-sm leading-relaxed text-slate-600">{description}</p>

          {/* Modules */}
          {modules && modules.length > 0 && (
            <div className="mb-6">
              <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-wider text-slate-500">
                Included Modules
              </p>
              <div className="flex flex-wrap gap-2">
                {modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3 py-1 font-inter text-xs font-medium text-brand-secondary"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center rounded-xl bg-brand-secondary px-6 py-2.5 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Learn More
            </Link>
            <Link
              href="/contact?subject=Request+Demo+BusinessOS"
              className="inline-flex items-center rounded-xl border border-brand-secondary px-6 py-2.5 font-inter text-sm font-semibold text-brand-secondary transition-colors duration-200 hover:bg-brand-secondary/5"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 shadow-card',
        className,
      )}
    >
      {/* Coming Soon badge */}
      {comingSoon && (
        <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 font-inter text-xs font-semibold text-amber-700">
          Coming Soon
        </span>
      )}

      {/* Name */}
      <h3 className="mb-1 font-poppins text-lg font-semibold text-brand-primary">{name}</h3>

      {/* Tagline */}
      <p className="mb-3 font-inter text-sm italic text-brand-secondary">{tagline}</p>

      {/* Description */}
      <p className="mb-5 font-inter text-sm leading-relaxed text-slate-600">{description}</p>

      {/* Notify me */}
      {comingSoon && (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-brand-secondary px-4 py-2 font-inter text-sm font-medium text-brand-secondary transition-colors duration-200 hover:bg-brand-secondary/5"
        >
          <Bell className="h-4 w-4" />
          Notify Me
        </button>
      )}
    </motion.div>
  );
}
