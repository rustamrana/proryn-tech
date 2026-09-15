'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Application } from '@/types';
import { cn } from '@/lib/utils';
import { getApplicationIcon, getStatusMeta } from '@/lib/application-ui';
import { getLaunchUrl } from '@/lib/launch';

interface ApplicationCardProps {
  app: Application;
  className?: string;
}

export default function ApplicationCard({ app, className }: ApplicationCardProps) {
  const Icon = getApplicationIcon(app.icon);
  const status = getStatusMeta(app.status);
  const launchUrl = getLaunchUrl(app);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-card p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover',
        className,
      )}
    >
      {/* Header: icon + status */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary"
        >
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={cn(
            'rounded-full px-3 py-1 font-inter text-xs font-semibold',
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Name + business area */}
      <h3 className="font-poppins text-lg font-semibold text-brand-primary">
        {app.name}
      </h3>
      <p className="mt-1 font-inter text-xs font-medium uppercase tracking-wider text-brand-accent">
        {app.businessArea}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-slate-600">
        {app.shortDescription}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/applications/${app.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-brand-secondary px-4 py-2 font-inter text-sm font-semibold text-brand-secondary transition-colors duration-150 hover:bg-brand-secondary/5"
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>

        {launchUrl ? (
          <a
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-secondary px-4 py-2 font-inter text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700"
          >
            Launch App
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 font-inter text-sm font-semibold text-slate-400"
            aria-disabled="true"
          >
            {getStatusMeta(app.status).label}
          </span>
        )}
      </div>
    </motion.article>
  );
}
