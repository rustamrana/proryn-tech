'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  PartyPopper,
  ArrowRight,
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCog,
  BarChart3,
} from 'lucide-react';
import type { DemoStepData } from './demo-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCog,
  BarChart3,
};

interface DemoCompletionProps {
  steps: DemoStepData[];
  onRestart: () => void;
}

export default function DemoCompletion({
  steps,
  onRestart,
}: DemoCompletionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* Confetti icon */}
      <motion.div
        initial={{ rotate: -10, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent shadow-lg"
      >
        <PartyPopper className="h-10 w-10 text-white" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-poppins text-3xl font-bold text-brand-primary"
      >
        Demo Complete!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-3 max-w-md font-inter text-base text-slate-600"
      >
        You&apos;ve explored the core modules of PRORYN BusinessOS. Ready to see
        how it transforms your operations?
      </motion.p>

      {/* Features explored summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {steps.map((step) => {
          const Icon = iconMap[step.icon] ?? LayoutDashboard;
          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-brand-border bg-white p-3 shadow-sm"
            >
              <Icon className="h-5 w-5 text-brand-secondary" />
              <span className="font-inter text-xs font-medium text-slate-700">
                {step.title}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 transition-all hover:bg-blue-700 hover:shadow-xl"
        >
          Book a Live Consultation <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-brand-secondary transition-all hover:bg-brand-secondary/5"
        >
          View All Products
        </Link>
      </motion.div>

      {/* Restart */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onRestart}
        className="mt-6 font-inter text-sm text-slate-500 underline-offset-2 hover:text-brand-secondary hover:underline"
      >
        Restart Demo
      </motion.button>
    </motion.div>
  );
}
