'use client';

import { motion } from 'framer-motion';

import SectionHeader from '@/components/common/SectionHeader';
import FAQAccordion from '@/components/common/FAQAccordion';
import { faqs } from '@/lib/data/faqs';

export default function FaqSection() {
  return (
    <section className="bg-brand-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          heading="Frequently Asked Questions"
          subheading="Everything you need to know about working with PRORYN TECH — from our development process to pricing and support."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-3xl rounded-2xl border border-brand-border shadow-card overflow-hidden"
        >
          <FAQAccordion items={faqs} />
        </motion.div>
      </div>
    </section>
  );
}
