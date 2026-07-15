import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustIndicators from '@/components/sections/TrustIndicators';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import DevelopmentProcess from '@/components/sections/DevelopmentProcess';
import TechStackSection from '@/components/sections/TechStackSection';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import BlogSection from '@/components/sections/BlogSection';
import FaqSection from '@/components/sections/FaqSection';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'PRORYN TECH — Enterprise Software Development',
  description:
    'PRORYN TECH — Engineering Intelligent Software for Modern Businesses. Enterprise software development, AI solutions, cloud technologies, and business automation for startups, SMEs, enterprises, and governments worldwide.',
  alternates: {
    canonical: 'https://proryntech.com',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full viewport dark section */}
      <HeroSection />

      {/* 2. Trust Indicators — animated counters */}
      <TrustIndicators />

      {/* 3. About — company overview split layout */}
      <AboutSection />

      {/* 4. Services — 9 service cards */}
      <ServicesSection />

      {/* 5. Products — BusinessOS featured + coming-soon grid */}
      <ProductsSection />

      {/* 6. Industries — 10 industry cards */}
      <IndustriesSection />

      {/* 7. Why Choose Us — dark bg differentiator cards */}
      <WhyChooseUs />

      {/* 8. Development Process — 8-step timeline */}
      <DevelopmentProcess />

      {/* 9. Tech Stack — 16 technologies grouped by category */}
      <TechStackSection />

      {/* 10. Case Studies — 3 detailed results cards */}
      <CaseStudies />

      {/* 11. Testimonials — 5 client quotes */}
      <Testimonials />

      {/* 12. Blog — 3 featured articles */}
      <BlogSection />

      {/* 13. FAQ — 9 accordion items */}
      <FaqSection />

      {/* 14. Final CTA — gradient conversion section */}
      <FinalCTA />
    </>
  );
}
