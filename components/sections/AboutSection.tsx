'use client';

import Link from 'next/link';
import { Award, CheckCircle2, Users, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/common/SectionHeader';

// ─── Stat data ────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const stats: StatItem[] = [
  { value: '10+', label: 'Years of Excellence', icon: Award },
  { value: '100+', label: 'Projects Delivered', icon: CheckCircle2 },
  { value: '50+', label: 'Happy Clients', icon: Users },
  { value: '16+', label: 'Technologies Mastered', icon: Code2 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/*
         * Split layout: 60% text left, 40% visual right.
         * On desktop we use a custom grid with explicit column fractions.
         * On mobile the columns stack (single column).
         */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[3fr_2fr]">

          {/* ── Left: Text content (60%) ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Reusable SectionHeader — left-aligned */}
            <SectionHeader
              badge="About PRORYN TECH"
              heading="Building Technology That Powers Business Growth"
              align="left"
              className="mb-6"
            />

            {/* Body paragraphs */}
            <div className="space-y-4 font-inter text-base leading-relaxed text-slate-600">
              {/* Paragraph 1 — company focus */}
              <p>
                PRORYN TECH is an enterprise technology company focused on
                helping organizations accelerate digital transformation through
                innovative software solutions. Since our founding, we have
                delivered mission-critical systems for startups, SMEs,
                enterprises, and government bodies across India and globally.
              </p>

              {/* Paragraph 2 — specializations */}
              <p>
                We specialize in enterprise software development, AI-powered
                business solutions, cloud technologies, business process
                automation, IT consulting, and resource augmentation. Our team
                of experienced engineers and architects brings deep domain
                expertise to every engagement.
              </p>

              {/* Paragraph 3 — mission */}
              <p>
                Our mission is to build secure, scalable, and intelligent
                software that helps businesses improve efficiency, reduce
                operational costs, and achieve sustainable growth. We measure
                our success by the outcomes our clients achieve.
              </p>
            </div>

            {/* CTA link */}
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 font-inter font-medium text-brand-secondary hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
            >
              Learn More About Us
              <span aria-hidden="true"> →</span>
            </Link>
          </motion.div>

          {/* ── Right: Stats panel (40%) ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-card">
              {/* 2×2 mini-stat grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex flex-col gap-2">
                      <Icon
                        className="h-6 w-6 text-brand-accent"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <p className="font-poppins text-3xl font-bold text-brand-primary">
                        {stat.value}
                      </p>
                      <p className="font-inter text-sm text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mission statement callout */}
              <div className="mt-8 border-l-4 border-brand-secondary pl-4">
                <p className="font-inter text-sm italic text-slate-600">
                  We don&apos;t just write code — we engineer solutions that
                  drive measurable business outcomes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
