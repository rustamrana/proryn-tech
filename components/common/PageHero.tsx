'use client';

import { motion } from 'framer-motion';

interface StatPill {
  value: string;
  label: string;
}

interface PageHeroProps {
  badge: string;
  heading: string;
  headingHighlight?: string;
  subheading: string;
  stats?: StatPill[];
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  heading,
  headingHighlight,
  subheading,
  stats,
  children,
}: PageHeroProps) {
  const parts = headingHighlight ? heading.split(headingHighlight) : [heading];

  return (
    <section className="relative overflow-hidden bg-[#0A1628] pt-28 pb-16">
      {/* Multi-layer radial gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 15% -5%, rgba(37,99,235,0.22) 0%, transparent 55%),
                       radial-gradient(ellipse 55% 50% at 85% 100%, rgba(6,182,212,0.10) 0%, transparent 60%)`,
        }} />

      {/* Subtle grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-40 -top-10 h-[420px] w-[420px] rounded-full bg-brand-secondary/12 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-brand-accent/08 blur-[80px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 items-center gap-10`}>

          {/* ── Text column ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-inter text-sm text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                {badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-poppins font-extrabold leading-[1.08] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
              {parts[0]}
              {headingHighlight && (
                <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                  {headingHighlight}
                </span>
              )}
              {parts[1]}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mx-auto mt-5 max-w-2xl font-inter text-base leading-relaxed text-white/55 sm:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
              {subheading}
            </motion.p>

            {/* Stats row */}
            {stats && stats.length > 0 && (
              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}>
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center lg:text-left">
                    <p className="font-poppins text-2xl font-extrabold text-white">{value}</p>
                    <p className="font-inter text-xs text-white/45">{label}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Custom slot (tabs, pills, etc.) */}
            {children && (
              <motion.div className="mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}>
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F8FAFC] to-transparent" aria-hidden="true" />
    </section>
  );
}
