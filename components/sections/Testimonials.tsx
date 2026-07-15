'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/common/SectionHeader';
import TestimonialCard from '@/components/common/TestimonialCard';
import { testimonials } from '@/lib/data/testimonials';

export default function Testimonials() {
  return (
    <section className="bg-blue-50/30 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Client Testimonials"
          heading="Trusted by Organizations Across Industries"
          subheading="Don't take our word for it — here's what our clients say about working with PRORYN TECH to build technology that drives real business outcomes."
          align="center"
        />

        {/* Desktop: 3-col grid | Mobile: horizontal swipeable carousel */}
        <div
          className="
            flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0
          "
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[80vw] flex-shrink-0 snap-start sm:w-[70vw] lg:w-auto lg:flex-shrink"
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                rating={testimonial.rating}
                quote={testimonial.quote}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
