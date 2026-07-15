'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe2 } from 'lucide-react';
import DashboardMockup from '@/components/common/DashboardMockup';

function fadeUp(delay: number) {
  return {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
    },
  };
}

const TRUST_PILLS = [
  { icon: Shield, text: 'Enterprise Security' },
  { icon: Zap, text: 'AI-Powered' },
  { icon: Globe2, text: 'Global Delivery' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A1628]" aria-label="Hero">
      {/* Multi-layer background gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(37,99,235,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 85% 90%, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Top glow blob */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-secondary/15 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-[80px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow badge */}
            <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="font-inter text-xs font-medium text-white/70 tracking-wide">
                  Trusted by 100+ Enterprise Clients Worldwide
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="mt-6 font-poppins font-extrabold leading-[1.08] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="visible"
            >
              Engineering{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                  Intelligent Software
                </span>
              </span>
              <br />
              for Modern Businesses.
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="mt-6 max-w-lg font-inter text-base leading-relaxed text-white/60 sm:text-lg"
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
            >
              PRORYN TECH helps startups, SMEs, enterprises, and government organizations build{' '}
              <span className="text-white/90">secure, scalable, and intelligent</span> digital solutions
              — from Enterprise Software and AI Automation to Cloud, Resource Augmentation,
              and our flagship platform <span className="text-brand-accent font-medium">PRORYN BusinessOS</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
              variants={fadeUp(0.3)}
              initial="hidden"
              animate="visible"
            >
              <Link href="/contact"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-brand-secondary px-8 py-3.5 font-inter text-base font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-200 hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                Book Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/products"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-inter text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10">
                Explore PRORYN BusinessOS
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="visible"
            >
              {TRUST_PILLS.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 font-inter text-xs text-white/50 border border-white/10">
                  <Icon className="h-3 w-3 text-brand-accent" aria-hidden="true" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Dashboard ── */}
          <motion.div
            className="flex w-full justify-center px-4 lg:px-0"
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            <div className="w-full max-w-[560px]">
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade-to-background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-background to-transparent" aria-hidden="true" />
    </section>
  );
}
