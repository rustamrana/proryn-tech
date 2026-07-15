import type { Metadata } from 'next';
import { techStack } from '@/lib/data/tech-stack';
import FinalCTA from '@/components/sections/FinalCTA';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  description:
    'PRORYN TECH builds enterprise solutions with Java, Spring Boot, React, Angular, Flutter, Node.js, PostgreSQL, Docker, Kubernetes, AWS, Azure, and more.',
  alternates: { canonical: 'https://proryntech.com/technologies' },
};

const CATEGORY_ORDER = ['Backend', 'Frontend', 'Mobile', 'Databases', 'Infrastructure', 'Cloud'] as const;
type Category = (typeof CATEGORY_ORDER)[number];

const grouped = CATEGORY_ORDER.reduce<Record<Category, typeof techStack>>((acc, cat) => {
  acc[cat] = techStack.filter((t) => t.category === cat);
  return acc;
}, {} as Record<Category, typeof techStack>);

const CATEGORY_DESC: Record<Category, string> = {
  Backend: 'Robust server-side technologies for enterprise-grade APIs, microservices, and business logic.',
  Frontend: 'Modern component-driven frameworks for high-performance, accessible web interfaces.',
  Mobile: 'Cross-platform mobile development delivering native-quality apps for Android and iOS.',
  Databases: 'Relational and in-memory data stores chosen for reliability, performance, and scale.',
  Infrastructure: 'Containerization, orchestration, and CI/CD automation for consistent, repeatable deployments.',
  Cloud: 'Enterprise cloud platforms with global reach, managed services, and compliance certifications.',
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        badge="Our Tech Stack"
        heading="Technologies Powering "
        headingHighlight="Enterprise Innovation"
        subheading="We select battle-tested, enterprise-grade technologies for every project — from modern frontend frameworks and cloud platforms to AI tools and DevOps automation."
        stats={[
          { value: '32+', label: 'Technologies' },
          { value: '6', label: 'Tech Categories' },
          { value: '100%', label: 'Production-Ready' },
        ]}
      />

      {/* Tech categories */}
      <section className="bg-brand-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {CATEGORY_ORDER.map((category) => {
            const items = grouped[category];
            if (!items.length) return null;
            return (
              <div key={category}>
                <div className="mb-8">
                  <h2 className="font-poppins text-2xl font-bold text-brand-primary">{category}</h2>
                  <p className="mt-1 font-inter text-base text-slate-600">{CATEGORY_DESC[category]}</p>
                  <div className="mt-3 h-0.5 bg-brand-border" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((tech) => (
                    <div key={tech.id} className="rounded-2xl border border-brand-border bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/10">
                        <span className="font-poppins text-sm font-bold text-brand-secondary">
                          {tech.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-poppins text-base font-semibold text-brand-primary">{tech.name}</h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-slate-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why our stack */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">Why We Choose These Technologies</h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">
            Our technology choices are guided by three principles: enterprise maturity (proven at scale in production environments), ecosystem richness (strong community, tooling, and long-term support), and business alignment (the right tool for the problem, not the trendiest tool available).
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">
            Every technology in our stack has been validated through real-world delivery for enterprise clients. We do not experiment with our clients&apos; production systems. We evaluate, test, and adopt new technologies in internal projects before recommending them for client engagements.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
