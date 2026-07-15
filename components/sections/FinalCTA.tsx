'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          'linear-gradient(135deg, #0F172A 0%, #1e3a6e 50%, #2563EB 100%)',
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* Decorative background circles */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 font-inter text-sm text-white/80">
            Let&apos;s Build Something Great Together
          </span>

          {/* Heading */}
          <h2
            id="final-cta-heading"
            className="font-poppins text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ready to Build Your Next
            <br className="hidden sm:block" />
            Digital Product?
          </h2>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/70">
            Partner with PRORYN TECH to transform your ideas into secure,
            scalable and intelligent software solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-white px-8 py-3 font-inter text-base font-semibold text-brand-primary shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact?subject=expert"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/30 px-8 py-3 font-inter text-base font-medium text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to Our Experts
            </Link>
          </div>

          {/* Trust micro-copy */}
          <p className="mt-8 font-inter text-sm text-white/40">
            No commitment required · Free initial consultation · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
