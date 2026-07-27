'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCog,
  BarChart3,
} from 'lucide-react';
import DemoHotspot from './DemoHotspot';
import type { DemoStepData } from './demo-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCog,
  BarChart3,
};

interface DemoStepProps {
  step: DemoStepData;
  direction: number; // 1 = forward, -1 = backward
}

export default function DemoStep({ step, direction }: DemoStepProps) {
  const Icon = iconMap[step.icon] ?? LayoutDashboard;

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: direction * 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -60 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left: Text content */}
        <div className="order-2 lg:order-1">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="font-poppins text-2xl font-bold text-brand-primary sm:text-3xl"
          >
            {step.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-3 font-inter text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {step.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-5"
          >
            <p className="font-inter text-xs font-medium uppercase tracking-wider text-slate-400">
              Click the pulsing dots to explore features
            </p>
          </motion.div>
        </div>

        {/* Right: Visual card with hotspots */}
        <div className="order-1 lg:order-2">
          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${step.gradient} p-1 shadow-2xl`}
          >
            {/* Inner card */}
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-900/30 backdrop-blur-sm">
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Central icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-0 flex flex-col items-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md sm:h-24 sm:w-24">
                  <Icon className="h-10 w-10 text-white sm:h-12 sm:w-12" />
                </div>
                <p className="mt-3 font-inter text-sm font-medium text-white/80">
                  {step.title}
                </p>
              </motion.div>

              {/* Decorative floating elements */}
              <div className="absolute left-6 top-6 h-8 w-16 rounded-md bg-white/10 backdrop-blur-sm" />
              <div className="absolute bottom-8 right-6 h-6 w-24 rounded-md bg-white/10 backdrop-blur-sm" />
              <div className="absolute right-10 top-10 h-12 w-12 rounded-lg bg-white/5 ring-1 ring-white/10" />
              <div className="absolute bottom-12 left-10 h-10 w-20 rounded-lg bg-white/5 ring-1 ring-white/10" />

              {/* Hotspots */}
              {step.hotspots.map((hotspot) => (
                <DemoHotspot key={hotspot.id} hotspot={hotspot} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
