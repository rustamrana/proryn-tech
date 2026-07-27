'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
  Eye,
  Repeat2,
  HeartHandshake,
  BrainCircuit,
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

// ─── Differentiator data ──────────────────────────────────────────────────────

interface Differentiator {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Building2,
    title: 'Enterprise Architecture',
    description:
      'We design systems built to enterprise-grade standards — modular, resilient, and ready for the demands of large-scale organizations.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description:
      'Our solutions grow alongside your business, from early-stage MVP to high-traffic production environments without expensive rewrites.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Applications',
    description:
      'Security is baked in from day one. We follow industry best practices — OWASP, data encryption, and role-based access controls — on every project.',
  },
  {
    icon: Users,
    title: 'Experienced Engineers',
    description:
      'Our team brings deep expertise across full-stack, cloud, AI, and DevOps domains, with real-world experience on mission-critical systems.',
  },
  {
    icon: Eye,
    title: 'Transparent Development',
    description:
      'You have full visibility into progress, decisions, and timelines. We communicate openly and keep you in the loop at every stage.',
  },
  {
    icon: Repeat2,
    title: 'Agile Methodology',
    description:
      'We work in short, iterative cycles that keep delivery predictable, allow for rapid feedback, and adapt to changing requirements.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Support',
    description:
      'Our commitment extends beyond launch. We offer maintenance, performance monitoring, and ongoing enhancement to protect your investment.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-first Innovation',
    description:
      'We embed intelligent capabilities — from LLMs to predictive analytics — into real business workflows, not just as demos but as production systems.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section
      className="bg-brand-primary py-20 lg:py-28"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — white text variant */}
        <SectionHeader
          badge="Why PRORYN TECH"
          heading="Why Choose Us"
          subheading="Eight reasons organizations trust PRORYN TECH to deliver technology that makes a measurable difference."
          align="center"
          className="[&_span]:bg-brand-accent/20 [&_span]:text-brand-accent"
          headingClassName="text-white"
        />

        {/* 4-col desktop / 2-col mobile grid */}
        <div
          className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4"
          role="list"
        >
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                role="listitem"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-brand-accent/30 hover:bg-white/10"
              >
                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-brand-accent" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="mb-2 font-poppins text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
