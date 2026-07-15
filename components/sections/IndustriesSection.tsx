'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/common/SectionHeader';
import IndustryCard from '@/components/common/IndustryCard';
import { industries } from '@/lib/data/industries';

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
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function IndustriesSection() {
  return (
    <section className="bg-brand-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          badge="Industries We Serve"
          heading="Delivering Digital Excellence Across Industries"
          subheading="From manufacturing floors to hospital wards, from retail stores to government offices — PRORYN TECH delivers tailored technology solutions that understand your industry's unique challenges."
          align="center"
        />

        {/* Industries grid: 2-col mobile, 3-col tablet, 5-col desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {industries.map((industry) => (
            <motion.div key={industry.id} variants={cardVariants}>
              <IndustryCard
                icon={industry.icon}
                name={industry.name}
                description={industry.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
