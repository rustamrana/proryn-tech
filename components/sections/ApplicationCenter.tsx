'use client';

import { useMemo, useState } from 'react';
import { Search, X, SearchX } from 'lucide-react';
import type { Application, BusinessArea } from '@/types';
import { filterApplications } from '@/lib/application-search';
import { cn } from '@/lib/utils';
import ApplicationCard from '@/components/common/ApplicationCard';

interface ApplicationCenterProps {
  applications: Application[];
  businessAreas: BusinessArea[];
}

export default function ApplicationCenter({
  applications,
  businessAreas,
}: ApplicationCenterProps) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<BusinessArea | null>(null);

  const results = useMemo(
    () => filterApplications(applications, query, area),
    [applications, query, area],
  );

  const hasActiveFilters = query.trim() !== '' || area !== null;

  const clearAll = () => {
    setQuery('');
    setArea(null);
  };

  return (
    <section className="bg-brand-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <label htmlFor="app-search" className="sr-only">
            Search applications
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="app-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search applications…"
              autoComplete="off"
              className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-12 pr-11 font-inter text-base text-slate-800 placeholder-slate-400 shadow-card outline-none transition-all hover:border-slate-300 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Business area filters */}
        <div className="mt-8">
          <p
            id="area-filter-label"
            className="mb-3 text-center font-inter text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Business Areas
          </p>
          <div
            role="group"
            aria-labelledby="area-filter-label"
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setArea(null)}
              aria-pressed={area === null}
              className={cn(
                'rounded-full border px-4 py-2 font-inter text-sm font-medium transition-all',
                area === null
                  ? 'border-brand-secondary bg-brand-secondary text-white shadow-sm'
                  : 'border-brand-border bg-white text-slate-600 hover:border-brand-secondary/40 hover:text-brand-secondary',
              )}
            >
              All
            </button>
            {businessAreas.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setArea((prev) => (prev === a ? null : a))}
                aria-pressed={area === a}
                className={cn(
                  'rounded-full border px-4 py-2 font-inter text-sm font-medium transition-all',
                  area === a
                    ? 'border-brand-secondary bg-brand-secondary text-white shadow-sm'
                    : 'border-brand-border bg-white text-slate-600 hover:border-brand-secondary/40 hover:text-brand-secondary',
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <h2 className="font-poppins text-xl font-bold text-brand-primary sm:text-2xl">
            Applications
          </h2>
          <p
            className="font-inter text-sm text-slate-500"
            aria-live="polite"
            role="status"
          >
            {results.length} {results.length === 1 ? 'application' : 'applications'}
          </p>
        </div>

        {/* Results grid / empty state */}
        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-white px-6 py-16 text-center">
            <span
              aria-hidden="true"
              className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400"
            >
              <SearchX className="h-7 w-7" />
            </span>
            <h3 className="font-poppins text-lg font-semibold text-brand-primary">
              No applications found
            </h3>
            <p className="mt-2 max-w-md font-inter text-sm text-slate-500">
              {query
                ? `We couldn't find any applications matching "${query.trim()}".`
                : 'No applications match the selected filters.'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
