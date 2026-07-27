import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Factory, Heart, GraduationCap, Landmark, HardHat,
  ShoppingBag, DollarSign, Hotel, Home, Truck, ArrowRight,
} from 'lucide-react';
import { industries } from '@/lib/data/industries';
import FinalCTA from '@/components/sections/FinalCTA';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  description:
    'PRORYN TECH delivers tailored enterprise software solutions for manufacturing, healthcare, education, government, retail, finance, logistics, and more.',
  alternates: { canonical: 'https://proryntech.com/industries' },
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory, Heart, GraduationCap, Landmark, HardHat,
  ShoppingBag, DollarSign, Hotel, Home, Truck,
};

const INDUSTRY_DETAILS: Record<string, { challenges: string[]; solutions: string[] }> = {
  manufacturing: {
    challenges: ['Manual inventory tracking', 'Disconnected production data', 'Supply chain visibility'],
    solutions: ['Custom ERP with real-time WIP tracking', 'Automated procurement workflows', 'IoT-integrated production monitoring'],
  },
  healthcare: {
    challenges: ['Paper-based patient records', 'Appointment scheduling inefficiency', 'Regulatory compliance'],
    solutions: ['HIPAA-compliant digital health platforms', 'Online appointment booking systems', 'Clinical workflow automation'],
  },
  education: {
    challenges: ['Fragmented learning tools', 'Manual student tracking', 'Remote learning gaps'],
    solutions: ['Learning Management Systems (LMS)', 'Student information portals', 'AI-powered personalized learning'],
  },
  government: {
    challenges: ['Manual paperwork processes', 'Citizen service delays', 'Data silos across departments'],
    solutions: ['e-Governance platforms', 'Citizen service portals', 'Inter-departmental data integration'],
  },
  construction: {
    challenges: ['Project cost overruns', 'Multi-site coordination', 'Manual procurement tracking'],
    solutions: ['Project management platforms', 'Procurement automation', 'Site inspection mobile apps'],
  },
  retail: {
    challenges: ['Disconnected POS systems', 'Inventory stockouts', 'No real-time analytics'],
    solutions: ['Unified retail management platforms', 'AI-powered demand forecasting', 'Real-time sales dashboards'],
  },
  finance: {
    challenges: ['Manual loan processing', 'Compliance reporting burdens', 'Fragmented portfolio data'],
    solutions: ['Loan origination systems', 'Automated compliance reporting', 'Unified financial dashboards'],
  },
  hospitality: {
    challenges: ['Manual reservations', 'Guest experience gaps', 'Revenue management complexity'],
    solutions: ['Property management systems', 'Guest experience platforms', 'Yield management tools'],
  },
  'real-estate': {
    challenges: ['Manual lead tracking', 'Project visibility gaps', 'Agent productivity'],
    solutions: ['CRM and lead management platforms', 'Project progress portals', 'Broker management systems'],
  },
  logistics: {
    challenges: ['No fleet visibility', 'Manual dispatch processes', 'Shipment tracking gaps'],
    solutions: ['Fleet management systems', 'Automated dispatch platforms', 'Real-time shipment tracking'],
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Industries We Serve"
        heading="Domain Expertise Across "
        headingHighlight="10 Industries"
        subheading="From factory floors to hospital wards — PRORYN TECH understands your industry's unique challenges and builds technology that solves them."
        stats={[
          { value: '10', label: 'Industries Covered' },
          { value: '100+', label: 'Projects Delivered' },
          { value: '9+', label: 'Years Experience' },
        ]}
      >
        {/* Industry quick-nav */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {industries.map((ind) => {
            const Icon = ICON_MAP[ind.icon] ?? Factory;
            return (
              <a key={ind.id} href={`#${ind.id}`}
                className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center transition-colors hover:bg-white/10">
                <Icon className="h-4 w-4 text-brand-accent" />
                <span className="font-inter text-[10px] text-white/60 leading-tight">{ind.name.split(' ')[0]}</span>
              </a>
            );
          })}
        </div>
      </PageHero>

      {/* Industry detail sections */}
      {industries.map((industry, index) => {
        const Icon = ICON_MAP[industry.icon] ?? Factory;
        const detail = INDUSTRY_DETAILS[industry.id];
        const isEven = index % 2 === 0;
        return (
          <section key={industry.id} id={industry.id}
            className={`py-20 ${isEven ? 'bg-white' : 'bg-brand-background'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 items-start gap-12 lg:grid-cols-2`}>
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10">
                    <Icon className="h-7 w-7 text-brand-accent" />
                  </div>
                  <h2 className="font-poppins text-3xl font-bold text-brand-primary">{industry.name}</h2>
                  <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">{industry.description}</p>

                  <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white hover:bg-blue-700">
                    Discuss Your Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {detail && (
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                        <h3 className="mb-3 font-poppins text-sm font-semibold uppercase tracking-wider text-slate-400">Key Challenges</h3>
                        <ul className="space-y-2">
                          {detail.challenges.map((c) => (
                            <li key={c} className="flex items-start gap-2 font-inter text-sm text-slate-600">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                        <h3 className="mb-3 font-poppins text-sm font-semibold uppercase tracking-wider text-slate-400">Our Solutions</h3>
                        <ul className="space-y-2">
                          {detail.solutions.map((s) => (
                            <li key={s} className="flex items-start gap-2 font-inter text-sm text-slate-600">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA />
    </>
  );
}
