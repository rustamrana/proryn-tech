'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bell, ArrowRight, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/common/SectionHeader';
import { products } from '@/lib/data/products';

const businessOS = products.find((p) => p.id === 'proryn-businessos')!;
const comingSoonProducts = products.filter((p) => p.comingSoon);

// Distinct module chip styles
const MODULE_STYLES = [
  'bg-blue-50 text-blue-700 border border-blue-200',
  'bg-cyan-50 text-cyan-700 border border-cyan-200',
  'bg-indigo-50 text-indigo-700 border border-indigo-200',
  'bg-violet-50 text-violet-700 border border-violet-200',
  'bg-teal-50 text-teal-700 border border-teal-200',
  'bg-sky-50 text-sky-700 border border-sky-200',
  'bg-purple-50 text-purple-700 border border-purple-200',
  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'bg-rose-50 text-rose-700 border border-rose-200',
  'bg-amber-50 text-amber-700 border border-amber-200',
];

const MODULE_DESC: Record<string, string> = {
  CRM: 'AI-powered lead management, pipeline tracking, and customer communication in one place.',
  Sales: 'Quotations, orders, and revenue forecasting with real-time performance dashboards.',
  Inventory: 'Multi-warehouse stock management with smart replenishment and barcode support.',
  HRMS: 'Full HR lifecycle — recruitment, attendance, payroll, and performance management.',
  Projects: 'Gantt charts, resource planning, milestones, and team collaboration tools.',
  Helpdesk: 'Multi-channel support tickets with SLA tracking and AI-assisted responses.',
  'Document Management': 'Centralized document repository with versioning and approval workflows.',
  'Workflow Automation': 'Visual drag-and-drop workflow builder for cross-module automations.',
  Analytics: 'Real-time BI dashboards with custom KPIs, drill-down, and export.',
  'AI Assistant': 'Conversational AI to query data, generate reports, and trigger actions naturally.',
};

const KEY_BENEFITS = [
  'Single platform replaces 8–12 disconnected tools',
  'AI assistant available across every module',
  'Deploys in weeks, not months',
  'Cloud-native — scales from 10 to 10,000 users',
];

export default function ProductsSection() {
  const [activeModule, setActiveModule] = useState(businessOS.modules?.[0] ?? '');

  return (
    <section className="bg-white py-20 lg:py-28" id="products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Products"
          heading="Products Built for the Future of Business"
          subheading="Innovative SaaS platforms that simplify operations, automate workflows, and accelerate business growth."
        />

        {/* ── PRORYN BusinessOS — FLAGSHIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-secondary via-brand-accent to-violet-500 p-[2px]">
            <div className="h-full w-full rounded-[22px] bg-white" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12">
            {/* Header row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent px-4 py-2">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                  <span className="font-inter text-xs font-bold uppercase tracking-wider text-white">Flagship Product</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/products"
                  className="inline-flex items-center gap-1.5 rounded-xl border-2 border-brand-secondary px-5 py-2.5 font-inter text-sm font-bold text-brand-secondary transition-colors hover:bg-brand-secondary/5">
                  Learn More
                </Link>
                <Link href="/contact?subject=demo"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/30 transition-all hover:bg-blue-700 hover:shadow-xl">
                  Request Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
              {/* Left: description + benefits */}
              <div>
                <h3 className="font-poppins text-4xl font-extrabold text-brand-primary lg:text-5xl">
                  PRORYN<br />
                  <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">BusinessOS</span>
                </h3>
                <p className="mt-1 font-inter text-base italic text-slate-500">{businessOS.tagline}</p>
                <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600">{businessOS.description}</p>

                <ul className="mt-6 space-y-2">
                  {KEY_BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10">
                        <Check className="h-3 w-3 text-brand-secondary" />
                      </span>
                      <span className="font-inter text-sm text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: interactive module tabs */}
              <div>
                <p className="mb-3 font-inter text-xs font-bold uppercase tracking-widest text-slate-400">
                  10 Integrated Modules — Click to explore
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {businessOS.modules?.map((mod, i) => (
                    <button key={mod} onClick={() => setActiveModule(mod)}
                      className={`rounded-full px-3 py-1.5 font-inter text-xs font-semibold transition-all duration-200 ${
                        activeModule === mod
                          ? `${MODULE_STYLES[i % MODULE_STYLES.length]} shadow-sm scale-105`
                          : 'border border-slate-200 bg-white text-slate-500 hover:border-brand-secondary/40 hover:text-brand-secondary'
                      }`}>
                      {mod}
                    </button>
                  ))}
                </div>

                {/* Module detail */}
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-brand-border bg-brand-background p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-brand-secondary" />
                    <p className="font-poppins text-base font-bold text-brand-primary">{activeModule}</p>
                  </div>
                  <p className="font-inter text-sm leading-relaxed text-slate-600">
                    {MODULE_DESC[activeModule] ?? 'Powerful module built into PRORYN BusinessOS.'}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Coming Soon ── */}
        <div className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-poppins text-xl font-bold text-brand-primary">More Products Coming Soon</h3>
            <span className="rounded-full bg-amber-50 px-3 py-1 font-inter text-xs font-semibold text-amber-600">
              6 Products in Pipeline
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonProducts.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200">
                {/* Coming soon badge */}
                <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-2.5 py-1 font-inter text-[11px] font-bold text-amber-700">
                  Coming Soon
                </span>
                <h4 className="font-poppins text-lg font-bold text-brand-primary pr-24">{product.name}</h4>
                <p className="mt-1 font-inter text-sm italic text-brand-secondary">{product.tagline}</p>
                <p className="mt-3 font-inter text-sm leading-relaxed text-slate-500">{product.description}</p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-brand-border px-4 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:border-brand-secondary hover:text-brand-secondary">
                  <Bell className="h-3.5 w-3.5" /> Notify Me When Live
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
