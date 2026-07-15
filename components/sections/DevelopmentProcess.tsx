'use client';

import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Palette,
  Building2,
  Code2,
  TestTube2,
  Rocket,
  HeadphonesIcon,
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

// ─── Process step data ────────────────────────────────────────────────────────

interface ProcessStep {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: Search,
    title: 'Discovery',
    description:
      'We learn your business goals, challenges, and vision through in-depth stakeholder interviews and research.',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Requirement Analysis',
    description:
      'Functional and non-functional requirements are documented, prioritized, and baselined for development.',
  },
  {
    step: 3,
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Wireframes and high-fidelity prototypes are crafted to deliver intuitive, accessible user experiences.',
  },
  {
    step: 4,
    icon: Building2,
    title: 'Architecture',
    description:
      'Scalable, secure system architecture is designed with the right technology stack for long-term growth.',
  },
  {
    step: 5,
    icon: Code2,
    title: 'Development',
    description:
      'Agile sprints bring features to life with clean, maintainable code and continuous integration pipelines.',
  },
  {
    step: 6,
    icon: TestTube2,
    title: 'Testing',
    description:
      'Comprehensive QA — functional, performance, and security testing — ensures a defect-free product.',
  },
  {
    step: 7,
    icon: Rocket,
    title: 'Deployment',
    description:
      'Zero-downtime releases to production with automated CI/CD, monitoring, and rollback strategies.',
  },
  {
    step: 8,
    icon: HeadphonesIcon,
    title: 'Support',
    description:
      'Ongoing maintenance, performance optimization, and dedicated support keep your product evolving.',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DevelopmentProcess() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Process"
          heading="How We Deliver Your Project"
          subheading="A structured, transparent 8-step process that takes your idea from discovery to a live product — and beyond."
          align="center"
        />

        {/* ── Desktop: horizontal timeline ──────────────────────────────────── */}
        <div className="hidden lg:block">
          {/* Two rows of 4 steps each */}
          {[0, 4].map((rowStart) => (
            <div key={rowStart} className="relative mb-16 last:mb-0">
              {/* Connecting line */}
              <div
                className="absolute top-10 left-[calc(12.5%_+_20px)] right-[calc(12.5%_+_20px)] h-0.5 bg-brand-border"
                aria-hidden="true"
              />

              <div className="grid grid-cols-4 gap-6">
                {processSteps.slice(rowStart, rowStart + 4).map((item, colIndex) => {
                  const globalIndex = rowStart + colIndex;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.step}
                      custom={globalIndex}
                      variants={stepVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      className="flex flex-col items-center text-center"
                    >
                      {/* Numbered circle with icon */}
                      <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-brand-secondary bg-white shadow-card">
                        <Icon
                          className="h-7 w-7 text-brand-secondary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {/* Step number badge */}
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-secondary font-poppins text-xs font-bold text-white">
                          {item.step}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 font-poppins text-base font-semibold text-brand-primary">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: vertical timeline ──────────────────────────────────────── */}
        <div className="relative lg:hidden">
          {/* Vertical connecting line */}
          <div
            className="absolute left-9 top-0 bottom-0 w-0.5 bg-brand-border"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {processSteps.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.li
                  key={item.step}
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative flex items-start gap-5"
                >
                  {/* Circle with icon */}
                  <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-full border-2 border-brand-secondary bg-white shadow-card">
                    <Icon
                      className="h-6 w-6 text-brand-secondary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-secondary font-poppins text-xs font-bold text-white">
                      {item.step}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-3">
                    <h3 className="font-poppins text-base font-semibold text-brand-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-inter text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
