import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, Globe, Smartphone, Brain, Workflow, Cloud, Users, Headphones, Lightbulb,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import { services } from '@/lib/data/services';
import FinalCTA from '@/components/sections/FinalCTA';
import PageHero from '@/components/common/PageHero';
import ServicesVideoHero from '@/components/sections/ServicesVideoHero';

export const metadata: Metadata = {
  description:
    'Enterprise software development, AI solutions, mobile apps, cloud & DevOps, resource augmentation, and technology consulting services from PRORYN TECH.',
  alternates: { canonical: 'https://proryntech.com/services' },
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Globe, Smartphone, Brain, Workflow, Cloud, Users,
  HeadphonesIcon: Headphones, Lightbulb,
};

const CATEGORY_PILLS = services.map((s) => ({ label: s.title, href: `#${s.id}` }));

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        badge="What We Do"
        heading="Technology Services That "
        headingHighlight="Drive Business Growth"
        subheading="End-to-end technology services for startups, SMEs, enterprises, and government organizations — from custom software development to AI automation and dedicated engineering teams."
        stats={[
          { value: '9', label: 'Services Offered' },
          { value: '100+', label: 'Projects Delivered' },
          { value: '10+', label: 'Industries Served' },
        ]}
      >
        {/* Quick-jump pills */}
        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {CATEGORY_PILLS.map((pill) => (
            <a key={pill.href} href={pill.href}
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-inter text-xs font-medium text-white/65 backdrop-blur-sm transition-colors hover:border-brand-accent/60 hover:text-white">
              {pill.label}
            </a>
          ))}
        </div>
      </PageHero>

      {/* ── Video Background Demo Section ── */}
      <ServicesVideoHero />

      {/* ── Service Detail Sections ── */}
      <div className="bg-white">
        {services.map((service, index) => {
          const Icon = ICON_MAP[service.icon] ?? Building2;
          const isEven = index % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-20 lg:py-24 ${isEven ? 'bg-white' : 'bg-brand-background'}`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                  {/* Text side */}
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-secondary/10">
                      <Icon className="h-7 w-7 text-brand-secondary" />
                    </div>
                    <span className="mb-2 inline-block font-inter text-sm font-semibold uppercase tracking-widest text-brand-accent">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-1 font-poppins text-3xl font-bold text-brand-primary lg:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 font-inter text-lg leading-relaxed text-slate-600">
                      {service.longDescription ?? service.description}
                    </p>

                    {/* Feature list */}
                    <ul className="mt-6 grid grid-cols-2 gap-2">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-secondary" />
                          <span className="font-inter text-sm text-slate-700">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Visual side — illustrated card */}
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-card">
                      <div className="flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5">
                        <div className="text-center">
                          <Icon className="mx-auto h-16 w-16 text-brand-secondary/30" />
                          <p className="mt-3 font-poppins text-sm font-semibold text-slate-400">
                            {service.title}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.features.map((feat) => (
                          <span key={feat} className="rounded-full bg-slate-100 px-3 py-1 font-inter text-xs font-medium text-slate-700">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <FinalCTA />
    </>
  );
}
