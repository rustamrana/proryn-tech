'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

// ─── Three service verticals based on the infographic images ─────────────────

const VERTICALS = [
  {
    id: 'software-studio',
    image: '/images/service-software-studio.png',
    badge: 'Product & Engineering',
    title: 'Software Studio',
    subtitle: 'We design, build, and deliver intelligent software solutions that drive business growth, automation, and innovation.',
    accentColor: '#1D4ED8',
    bgFrom: '#1e3a8a',
    bgTo: '#1D4ED8',
    services: [
      { num: '1', name: 'Custom Software', desc: 'Tailored enterprise software solutions built to match your unique business requirements.' },
      { num: '2', name: 'Web Applications', desc: 'Scalable, secure, and high-performance web applications for modern businesses.' },
      { num: '3', name: 'Mobile Applications', desc: 'Native and cross-platform mobile apps for iOS and Android to engage your customers.' },
      { num: '4', name: 'AI Solutions', desc: 'AI-powered applications, machine learning models, and intelligent automation solutions.' },
      { num: '5', name: 'API Development', desc: 'Robust RESTful APIs and integrations to connect your systems and services seamlessly.' },
      { num: '6', name: 'Legacy Modernization', desc: 'Modernize legacy systems to improve performance, security, and scalability.' },
      { num: '7', name: 'QA & Testing', desc: 'Comprehensive testing services to ensure quality, security, and reliability.' },
      { num: '8', name: 'DevOps & Cloud', desc: 'DevOps automation, CI/CD pipelines, cloud migration, and infrastructure automation.' },
      { num: '9', name: 'SaaS Product R&D', desc: 'End-to-end SaaS product development from idea to market with continuous innovation.' },
      { num: '10', name: 'AMC & Support', desc: 'Application maintenance, enhancements, and 24/7 technical support.' },
    ],
    href: '/services#enterprise-software-development',
  },
  {
    id: 'talent-services',
    image: '/images/service-talent-services.png',
    badge: 'Recruitment & Staffing',
    title: 'Talent Services',
    subtitle: 'We provide skilled talent and flexible staffing solutions to help you build the right team, faster.',
    accentColor: '#EA580C',
    bgFrom: '#92400e',
    bgTo: '#EA580C',
    services: [
      { num: '1', name: 'Permanent Hiring', desc: 'End-to-end permanent recruitment solutions for technical, professional, and non-technical roles across all levels.' },
      { num: '2', name: 'Contract Staffing', desc: 'Flexible contract staffing solutions to meet your short-term and long-term business needs with speed and efficiency.' },
      { num: '3', name: 'Dedicated Developers', desc: 'Hire dedicated developers or teams on flexible engagement models to accelerate your product development.' },
      { num: '4', name: 'Payroll Management', desc: 'Compliant payroll processing, tax management, and statutory compliance to ensure accuracy and peace of mind.' },
      { num: '5', name: 'Client Deployment', desc: 'Seamless resource deployment and transition management at your location to ensure business continuity.' },
      { num: '6', name: 'Resource Augmentation', desc: 'Skilled resources to extend your team\'s capabilities and accelerate project delivery without long-term commitments.' },
      { num: '7', name: 'Campus Hiring', desc: 'Campus recruitment solutions to attract, train, and onboard bright young talent for your organization\'s future.' },
      { num: '8', name: 'Technical Screening', desc: 'In-depth technical assessment and screening to ensure you hire the right talent with the right skills.' },
      { num: '9', name: 'Training & Upskilling', desc: 'Corporate training and upskilling programs to enhance employee skills, productivity, and career growth.' },
    ],
    href: '/services#resource-augmentation',
  },
  {
    id: 'consulting-services',
    image: '/images/service-consulting.png',
    badge: 'Advisory & Digital Consulting',
    title: 'Consulting Services',
    subtitle: 'We help businesses transform, optimize, and scale with expert advisory, architecture, and consulting services.',
    accentColor: '#7C3AED',
    bgFrom: '#4C1D95',
    bgTo: '#7C3AED',
    services: [
      { num: '1', name: 'Digital Transformation', desc: 'End-to-end digital transformation strategy and execution to accelerate business growth, improve efficiency, and enhance customer experience.' },
      { num: '2', name: 'Enterprise Architecture', desc: 'Designing scalable, secure, and future-ready enterprise architectures that align business goals with technology for sustainable growth.' },
      { num: '3', name: 'Technology Consulting', desc: 'Expert guidance on technology selection, strategy, adoption, and implementation roadmap tailored to your business needs.' },
      { num: '4', name: 'Cloud Consulting', desc: 'Cloud strategy, migration, optimization, and management across AWS, Azure, and Google Cloud to improve agility and reduce costs.' },
      { num: '5', name: 'Security Assessment', desc: 'Identify vulnerabilities, assess risks, and implement robust security measures to protect your applications, data, and infrastructure.' },
      { num: '6', name: 'Performance Audit', desc: 'Analyze, measure, and optimize application and infrastructure performance to ensure reliability, scalability, and cost efficiency.' },
      { num: '7', name: 'Database Consulting', desc: 'Database design, performance tuning, migration, and administration support for relational and NoSQL databases.' },
      { num: '8', name: 'Government IT Advisory', desc: 'IT advisory, policy alignment, and compliance support for government projects and public sector digital initiatives.' },
      { num: '9', name: 'Process Improvement', desc: 'Streamline business processes, eliminate bottlenecks, and implement best practices to enhance efficiency and productivity.' },
      { num: '10', name: 'CTO-as-a-Service', desc: 'On-demand CTO support for technology leadership, strategic planning, innovation, and digital transformation initiatives.' },
    ],
    href: '/services#technology-consulting',
  },
];

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

        {/* Three verticals */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:mt-16">
          {VERTICALS.map((vertical, i) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={vertical.image}
                  alt={`${vertical.title} — PRORYN TECH`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-5">

                {/* Badge + Title */}
                <div>
                  <span
                    className="inline-block rounded-full px-3 py-1 font-inter text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ background: `${vertical.accentColor}18`, color: vertical.accentColor }}
                  >
                    {vertical.badge}
                  </span>
                  <h3 className="font-poppins text-xl font-extrabold text-brand-primary">{vertical.title}</h3>
                  <p className="mt-1.5 font-inter text-sm leading-relaxed text-slate-500">{vertical.subtitle}</p>
                </div>

                {/* Services list */}
                <div className="flex-1">
                  <p
                    className="mb-3 font-inter text-xs font-bold uppercase tracking-widest"
                    style={{ color: vertical.accentColor }}
                  >
                    Our Services
                  </p>
                  <ul className="space-y-2.5">
                    {vertical.services.map((svc) => (
                      <li key={svc.num} className="flex gap-3 items-start">
                        <span
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-inter text-[10px] font-bold text-white"
                          style={{ background: vertical.accentColor }}
                        >
                          {svc.num}
                        </span>
                        <div>
                          <span className="font-inter text-sm font-semibold text-brand-primary">{svc.name}</span>
                          <p className="font-inter text-xs text-slate-500 leading-relaxed mt-0.5">{svc.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={vertical.href}
                  className="mt-auto inline-flex items-center gap-2 rounded-xl px-5 py-3 font-inter text-sm font-semibold text-white transition-all hover:opacity-90 hover:gap-3"
                  style={{ background: `linear-gradient(135deg, ${vertical.bgFrom}, ${vertical.bgTo})` }}
                >
                  Explore {vertical.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
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
