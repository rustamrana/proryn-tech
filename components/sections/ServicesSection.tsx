'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import ServiceCard from '@/components/common/ServiceCard';
import { services } from '@/lib/data/services';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function ServicesSection() {
  return (
    <section className="bg-brand-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          badge="Our Services"
          heading="Technology Services That Drive Business Growth"
          subheading="We help startups, SMEs, enterprises, and government organizations transform ideas into scalable digital solutions. From software development to AI automation and dedicated engineering teams, PRORYN TECH delivers end-to-end technology services."
          align="center"
        />

        {/* Services grid — 1-col mobile, 2-col tablet, 3-col desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                href={`/services#${service.id}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Services CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
