'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/common/SectionHeader';
import CaseStudyCard from '@/components/common/CaseStudyCard';
import { caseStudies } from '@/lib/data/case-studies';

export default function CaseStudies() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Case Studies"
          heading="Real Results for Real Businesses"
          subheading="See how PRORYN TECH has helped organisations across industries streamline operations, reduce costs, and scale with confidence."
          align="center"
        />

        {/* Case studies grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseStudyCard
                industry={study.industry}
                title={study.title}
                challenge={study.challenge}
                solution={study.solution}
                technologies={study.technologies}
                outcomes={study.outcomes}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
