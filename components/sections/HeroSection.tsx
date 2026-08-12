'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DashboardMockup from '@/components/common/DashboardMockup';

// Load ParticleCanvas only on client
const ParticleCanvas = dynamic(
  () => import('@/components/effects/ParticleCanvas'),
  { ssr: false }
);

function fadeUp(delay: number) {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
    },
  };
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#071426]" aria-label="Hero">
      {/* 3D Particle Background — medium cyan dots */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <ParticleCanvas
          colorPrimary="#2563EB"
          colorSecondary="#06B6D4"
          interactive
          className="h-full w-full"
        />
      </div>

      {/* Background radial glow — subtle */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 25% 0%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />

      {/* Grid pattern — very subtle */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* ── Left: Content ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow */}
            <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-inter text-[11px] font-medium uppercase tracking-[0.15em] text-white/60">
                  Enterprise Software • AI • Digital Transformation
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="mt-8 max-w-[620px] font-inter text-white"
              style={{ fontSize: 'clamp(3.25rem, 5vw, 4.75rem)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.04em' }}
              variants={fadeUp(0.08)}
              initial="hidden"
              animate="visible"
            >
              Engineering{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Intelligent Software
              </span>
              <br />
              for Modern Businesses.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-7 max-w-[570px] font-inter text-white/55"
              style={{ fontSize: '17px', lineHeight: 1.65 }}
              variants={fadeUp(0.16)}
              initial="hidden"
              animate="visible"
            >
              PRORYN TECH builds secure, scalable, and AI-powered software solutions
              that help businesses transform, automate, and grow.
            </motion.p>

            <motion.p
              className="mt-3 max-w-[570px] font-inter text-white/40"
              style={{ fontSize: '15px', lineHeight: 1.6 }}
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
            >
              From enterprise platforms and AI automation to cloud-native systems
              and PRORYN BusinessOS.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
              variants={fadeUp(0.28)}
              initial="hidden"
              animate="visible"
            >
              <Link href="/contact"
                className="group inline-flex h-[54px] items-center gap-2 rounded-[11px] bg-[#2563EB] px-7 font-inter text-[15px] font-semibold text-white shadow-[0_4px_24px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)]">
                Book Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/products"
                className="inline-flex h-[54px] items-center gap-2 rounded-[11px] border border-white/20 px-7 font-inter text-[15px] font-medium text-white/90 transition-all duration-200 hover:border-white/35 hover:bg-white/[0.04]">
                Explore PRORYN BusinessOS
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Dashboard ── */}
          <motion.div
            className="flex w-full justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="w-full max-w-[560px]">
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-background to-transparent" aria-hidden="true" />
    </section>
  );
}
