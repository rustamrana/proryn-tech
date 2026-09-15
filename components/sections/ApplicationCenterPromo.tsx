'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { applications } from '@/lib/data/applications';
import { getApplicationIcon } from '@/lib/application-ui';

/** Homepage entry point that invites visitors into the Application Center. */
export default function ApplicationCenterPromo() {
  const preview = applications.filter((a) => a.isAvailable).slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-brand-border bg-brand-background">
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-12">
            {/* Left: copy + CTA */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1.5">
                <LayoutGrid className="h-4 w-4 text-brand-secondary" aria-hidden="true" />
                <span className="font-inter text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                  Application Center
                </span>
              </div>
              <h2 className="font-poppins text-3xl font-bold text-brand-primary">
                Explore PRORYN Applications
              </h2>
              <p className="mt-3 font-inter text-base leading-relaxed text-slate-600">
                Every business function in one place. Browse the applications that power
                PRORYN BusinessOS — search by capability or business area, view details,
                and launch the tools your team needs.
              </p>
              <Link
                href="/applications"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Explore Applications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Right: app preview tiles */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {preview.map((app, i) => {
                const Icon = getApplicationIcon(app.icon);
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/applications/${app.slug}`}
                      className="flex h-full flex-col items-start gap-2 rounded-xl border border-brand-border bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-poppins text-sm font-semibold text-brand-primary">
                        {app.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
