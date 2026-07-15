'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Bell, ArrowRight, Check } from 'lucide-react';
import { products } from '@/lib/data/products';
import PageHero from '@/components/common/PageHero';

const businessOS = products.find((p) => p.id === 'proryn-businessos')!;
const comingSoon = products.filter((p) => p.comingSoon);

const MODULE_DESCRIPTIONS: Record<string, string> = {
  CRM: 'Manage leads, contacts, deals, and customer communications from a unified interface with AI-powered lead scoring.',
  Sales: 'Track your complete sales pipeline, quotations, orders, and revenue forecasting with real-time dashboards.',
  Inventory: 'Multi-warehouse inventory management with barcode scanning, automatic replenishment, and stock alerts.',
  HRMS: 'Complete HR lifecycle management — recruitment, onboarding, attendance, payroll, and performance reviews.',
  Projects: 'Plan, execute, and track projects with Gantt charts, resource allocation, milestones, and burndown reports.',
  Helpdesk: 'Multi-channel customer support with ticket management, SLA tracking, and AI-powered response suggestions.',
  'Document Management': 'Centralized document repository with version control, approval workflows, and role-based access.',
  'Workflow Automation': 'Visual workflow builder to automate approvals, notifications, and cross-module business processes.',
  Analytics: 'Real-time business intelligence dashboards with custom KPIs, drill-down reports, and export capabilities.',
  'AI Assistant': 'Natural language interface to query your business data, generate reports, and trigger workflows conversationally.',
};

const moduleColors = [
  'bg-blue-50 border-blue-200 text-blue-700',
  'bg-cyan-50 border-cyan-200 text-cyan-700',
  'bg-indigo-50 border-indigo-200 text-indigo-700',
  'bg-sky-50 border-sky-200 text-sky-700',
  'bg-violet-50 border-violet-200 text-violet-700',
  'bg-teal-50 border-teal-200 text-teal-700',
  'bg-purple-50 border-purple-200 text-purple-700',
  'bg-emerald-50 border-emerald-200 text-emerald-700',
  'bg-rose-50 border-rose-200 text-rose-700',
  'bg-amber-50 border-amber-200 text-amber-700',
];

export default function ProductsPage() {
  const [activeModule, setActiveModule] = useState(businessOS.modules?.[0] ?? '');

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Our Products"
        heading="Products Built for the "
        headingHighlight="Future of Business"
        subheading="Innovative SaaS platforms that simplify operations, automate workflows, and accelerate business growth. Built for enterprises that want to move faster."
        stats={[
          { value: '1', label: 'Flagship Platform' },
          { value: '6', label: 'Products in Pipeline' },
          { value: '10+', label: 'BusinessOS Modules' },
        ]}
      />

      {/* BusinessOS feature */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Gradient border card */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-secondary to-brand-accent p-[2px]">
            <div className="rounded-[14px] bg-white p-8 lg:p-12">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Left */}
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1.5">
                    <Sparkles className="h-4 w-4 text-brand-secondary" />
                    <span className="font-inter text-xs font-semibold uppercase tracking-wider text-brand-secondary">Flagship Product</span>
                  </div>
                  <h2 className="font-poppins text-4xl font-bold text-brand-primary">{businessOS.name}</h2>
                  <p className="mt-2 font-inter text-lg italic text-brand-secondary">{businessOS.tagline}</p>
                  <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">{businessOS.description}</p>

                  <ul className="mt-6 space-y-2">
                    {['Single unified platform for all business functions', 'AI-powered insights and automation built in', 'Scales from 10 to 10,000 users', 'Cloud-native, secure, always-on'].map((feat) => (
                      <li key={feat} className="flex items-center gap-2 font-inter text-sm text-slate-700">
                        <Check className="h-4 w-4 shrink-0 text-brand-secondary" />{feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/contact?subject=Request+Demo+BusinessOS"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white hover:bg-blue-700">
                      Request Demo <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-brand-secondary hover:bg-brand-secondary/5">
                      Learn More
                    </Link>
                  </div>
                </div>

                {/* Right: interactive module tabs */}
                <div>
                  <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-wider text-slate-400">10 Built-in Modules</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {businessOS.modules?.map((mod, i) => (
                      <button key={mod} onClick={() => setActiveModule(mod)}
                        className={`rounded-full border px-3 py-1.5 font-inter text-xs font-medium transition-all ${activeModule === mod ? moduleColors[i % moduleColors.length] + ' shadow-sm' : 'border-brand-border bg-white text-slate-600 hover:bg-brand-background'}`}>
                        {mod}
                      </button>
                    ))}
                  </div>
                  {/* Module detail card */}
                  <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
                    <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-wider text-brand-accent">{activeModule}</p>
                    <p className="font-inter text-sm leading-relaxed text-slate-600">
                      {MODULE_DESCRIPTIONS[activeModule] ?? 'Powerful module built into PRORYN BusinessOS.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-brand-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-poppins text-3xl font-bold text-brand-primary">More Products Coming Soon</h2>
            <p className="mt-3 font-inter text-base text-slate-600">Standalone SaaS products built on the same enterprise foundation as BusinessOS.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((product) => (
              <div key={product.id} className="relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 font-inter text-xs font-semibold text-amber-700">Coming Soon</span>
                <h3 className="font-poppins text-lg font-semibold text-brand-primary pr-24">{product.name}</h3>
                <p className="mt-1 font-inter text-sm italic text-brand-secondary">{product.tagline}</p>
                <p className="mt-3 font-inter text-sm leading-relaxed text-slate-600">{product.description}</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-secondary px-4 py-2 font-inter text-sm font-medium text-brand-secondary hover:bg-brand-secondary/5">
                  <Bell className="h-3.5 w-3.5" /> Notify Me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
