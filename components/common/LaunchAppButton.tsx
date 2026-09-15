'use client';

import { ExternalLink, Clock } from 'lucide-react';
import type { Application } from '@/types';
import { getLaunchUrl } from '@/lib/launch';
import { getStatusMeta } from '@/lib/application-ui';
import { cn } from '@/lib/utils';

interface LaunchAppButtonProps {
  app: Application;
  className?: string;
}

/**
 * Renders the Launch App CTA for an application.
 *
 * Resolves the BusinessOS launch target from configuration at render time.
 * When no valid target exists (unavailable app, or missing configuration in
 * production) it renders a clear status instead of a broken link.
 */
export default function LaunchAppButton({ app, className }: LaunchAppButtonProps) {
  const launchUrl = getLaunchUrl(app);
  const status = getStatusMeta(app.status);

  if (!launchUrl) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          'inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-inter text-sm font-semibold text-slate-400',
          className,
        )}
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        {status.label}
      </span>
    );
  }

  return (
    <a
      href={launchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 transition-colors hover:bg-blue-700',
        className,
      )}
    >
      Launch App
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
