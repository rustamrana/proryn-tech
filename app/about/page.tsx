'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Lightbulb, ShieldCheck, Star, Users, HeartHandshake, Cpu,
  ArrowRight, Quote, Linkedin, ExternalLink,
  Code2, BrainCircuit, Cpu as CpuIcon, Building2, Layers,
  TrendingUp, Briefcase,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';

// ─── Metadata exported from layout ───────────────────────────────────────────
// (Metadata defined in app/about/layout.tsx since this is a client component)

// ─── Static Data ─────────────────────────────────────────────────────────────

const VALUES = [
  { icon: Lightbulb, title: 'Innovation', description: 'We pursue creative, forward-thinking solutions that push the boundaries of what technology can do for business.' },
  { icon: ShieldCheck, title: 'Integrity', description: 'We operate with complete transparency, honesty, and accountability in every client relationship.' },
  { icon: Star, title: 'Excellence', description: 'We hold ourselves to the highest standards in code quality, architecture, and delivery — always.' },
  { icon: Users, title: 'Collaboration', description: 'We work as genuine partners, integrating seamlessly with client teams and sharing ownership of outcomes.' },
  { icon: HeartHandshake, title: 'Customer-First', description: 'Every architectural decision is evaluated through the lens of client business value.' },
  { icon: Cpu, title: 'Security-First', description: 'Security is a foundational principle, not an afterthought — built in from line one of every project.' },
];

const MILESTONES = [
  { year: '2015', title: 'Engineering Foundation', description: 'Rustam Kumar begins his engineering career, specializing in enterprise Java, Spring Boot, and government digital transformation projects.' },
  { year: '2019', title: 'Enterprise Leadership', description: 'Leads large-scale enterprise software programs for government organizations, gaining deep expertise in architecture and cloud technologies.' },
  { year: '2022', title: 'AI & Automation Expertise', description: 'Deep dives into AI-powered automation, OCR, intelligent document processing, and conversational AI for enterprise clients.' },
  { year: '2024', title: 'PRORYN TECH Founded', description: 'PRORYN TECH is founded in Bhopal with a clear mission: build intelligent enterprise software that helps organizations innovate and grow.' },
  { year: '2025', title: 'PRORYN BusinessOS Launch', description: 'Development begins on PRORYN BusinessOS — an AI-powered Business Operating System to unify enterprise operations on a single platform.' },
];

// CEO expertise tags
const CEO_EXPERTISE_TAGS = [
  'Business Strategy', 'Leadership', 'Digital Transformation', 'Enterprise Solutions',
  'AI Innovation', 'Corporate Management', 'Product Vision', 'Business Growth',
];

// CEO achievement cards
const CEO_ACHIEVEMENTS = [
  { icon: Briefcase, value: 'Director', label: '& CEO', sub: 'Business Leadership' },
  { icon: TrendingUp, value: 'Growth', label: 'Innovation Driven', sub: 'Digital Transformation' },
  { icon: BrainCircuit, value: 'AI First', label: 'Innovation Focus', sub: 'Digital Transformation' },
  { icon: Layers, value: 'SaaS', label: 'Product Vision', sub: 'PRORYN BusinessOS' },
];

// CTO expertise tags
const CTO_EXPERTISE_TAGS = [
  'Enterprise Software', 'Java', 'Spring Boot', 'React', 'Cloud',
  'Artificial Intelligence', 'Business Automation', 'SaaS', 'Government Solutions',
];

// CTO achievement cards
const CTO_ACHIEVEMENTS = [
  { icon: Code2, value: '9+', label: 'Years Experience', sub: 'Enterprise Engineering' },
  { icon: Building2, value: 'Enterprise', label: 'Architect', sub: 'Scalable Systems' },
  { icon: BrainCircuit, value: 'Govt.', label: 'Domain Expert', sub: 'Digital Transformation' },
  { icon: Layers, value: 'AI &', label: 'Automation', sub: 'Intelligent Platforms' },
];

// ─── Team Members ─────────────────────────────────────────────────────────────
// Replace photoFile with the actual image path under /public/team/ when available.
// e.g. photoFile: '/team/arjun-sharma.jpg'
// Then swap the placeholder <div> in TeamMemberCard with:
// <Image src={member.photoFile} alt={`${member.name} — ${member.role}`} fill className="object-cover object-top" />

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  photoFile: string | null;
  accentColor: string;
  accentBg: string;
  objectPosition?: string; // optional override for photo crop position
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'pooja-singh',
    name: 'Pooja Singh',
    role: 'Lead Software Engineer',
    department: 'Engineering',
    bio: 'Full-stack engineer passionate about building scalable, high-performance applications with modern web technologies.',
    photoFile: '/images/pooja_singh.jpeg',
    accentColor: 'text-violet-600',
    accentBg: 'bg-violet-50',
  },
  {
    id: 'arjun-patel',
    name: 'Arjun Patel',
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    bio: 'Specializes in Java, Spring Boot microservices, and cloud-native architecture for high-availability enterprise systems.',
    photoFile: null,
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-50',
  },
  {
    id: 'bhupendra',
    name: 'Bhupendra',
    role: 'Frontend Engineer',
    department: 'Engineering',
    bio: 'Builds responsive, accessible, and performant user interfaces with React and modern frontend tooling.',
    photoFile: '/images/Bhupendra_UI.JPG',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    objectPosition: 'center',
  },
  {
    id: 'rahul-verma',
    name: 'Rahul Verma',
    role: 'AI Engineer',
    department: 'Engineering',
    bio: 'Builds LLM-powered workflows, OCR pipelines, and intelligent document processing systems for enterprise clients.',
    photoFile: null,
    accentColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
  },
];

// ─── Team Member Card ─────────────────────────────────────────────────────────

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover cursor-default"
    >
      {/* Photo area */}
      <div className={`relative flex h-40 w-full items-center justify-center overflow-hidden ${member.accentBg}`}>
        {member.photoFile ? (
          <Image
            src={member.photoFile}
            alt={`${member.name} — ${member.role}`}
            fill
            className="object-cover"
            style={{ objectPosition: member.objectPosition ?? 'top' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
          />
        ) : (
          /* Professional placeholder — no initials, just a tasteful silhouette */
          <>
            <svg viewBox="0 0 120 140" className="h-36 w-28 opacity-25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="60" cy="42" r="28" fill="currentColor" className={member.accentColor} />
              <path d="M4 140 Q4 88 60 88 Q116 88 116 140 Z" fill="currentColor" className={member.accentColor} />
            </svg>
            {/* Replace-photo hint */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/80 px-3 py-2 text-center backdrop-blur-sm">
              <p className="font-inter text-[11px] font-semibold text-slate-500">
                Replace: /public/team/{member.id}.jpg
              </p>
            </div>
          </>
        )}

        {/* Department badge */}
        <span className={`absolute right-3 top-3 rounded-full ${member.accentBg} px-3 py-1 font-inter text-[11px] font-bold ${member.accentColor} border border-current/20`}>
          {member.department}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-5">
        <div>
          <h4 className="font-poppins text-base font-bold text-brand-primary">{member.name}</h4>
          <p className={`font-inter text-sm font-semibold ${member.accentColor}`}>{member.role}</p>
        </div>
        <p className="font-inter text-sm leading-relaxed text-slate-500">{member.bio}</p>
      </div>
    </motion.div>
  );
}

// ─── Founder Photo Placeholder ────────────────────────────────────────────────
// Replace <img src="/founder.jpg" /> with the real photo — the frame stays the same.

function FounderPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      {/* Background accent blobs */}
      <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-brand-secondary/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden="true" />

      {/* Gradient border frame */}
      <div className="relative rounded-3xl bg-gradient-to-br from-brand-secondary via-brand-accent to-violet-500 p-[3px] shadow-[0_32px_80px_rgba(37,99,235,0.2)]">
        <div className="relative overflow-hidden rounded-[22px] bg-brand-background">
          {/* CEO Photo */}
          <Image
            src="/images/Preeti_Singh.jpg"
            alt="Preeti Singh — Director & CEO, PRORYN TECH"
            width={480}
            height={560}
            priority
            className="h-[440px] w-full object-cover object-top lg:h-[520px]"
          />
        </div>
      </div>

      {/* Floating leadership badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 top-8 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
        aria-hidden="true"
      >
        <p className="font-poppins text-xl font-extrabold text-brand-primary leading-none">CEO</p>
        <p className="font-inter text-[11px] text-slate-500">Director &amp;<br/>Chief Executive</p>
      </motion.div>

      {/* Floating company badge */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -left-4 bottom-12 flex items-center gap-2.5 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
        aria-hidden="true"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary">
          <CpuIcon className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-poppins text-[11px] font-bold text-brand-primary">PRORYN TECH</p>
          <p className="font-inter text-[10px] text-slate-400">Director &amp; CEO</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        badge="About Us"
        heading="Engineering Technology That "
        headingHighlight="Powers Business Growth"
        subheading="PRORYN TECH is an enterprise software development company helping organizations accelerate digital transformation through intelligent, scalable technology solutions."
        stats={[
          { value: '9+', label: 'Years Experience' },
          { value: '100+', label: 'Projects Delivered' },
          { value: '10+', label: 'Industries Served' },
        ]}
      />

      {/* ── Mission & Vision ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-brand-border bg-brand-background p-8">
              <span className="mb-3 inline-block font-inter text-xs font-semibold uppercase tracking-widest text-brand-accent">Our Mission</span>
              <h2 className="font-poppins text-2xl font-bold text-brand-primary">Building Software That Creates Real Business Value</h2>
              <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">
                Our mission is to build secure, scalable, and intelligent software that helps businesses improve efficiency,
                reduce operational costs, and achieve sustainable growth. We measure our success by the outcomes our clients achieve.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-brand-border bg-brand-background p-8">
              <span className="mb-3 inline-block font-inter text-xs font-semibold uppercase tracking-widest text-brand-accent">Our Vision</span>
              <h2 className="font-poppins text-2xl font-bold text-brand-primary">A World Where Every Business Runs on Intelligent Software</h2>
              <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">
                We envision a future where every organization has access to enterprise-grade, AI-powered software
                that gives them the operational intelligence and efficiency to compete and grow globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-brand-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-medium text-brand-accent">Our Values</span>
            <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">The Principles That Guide Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-2xl border border-brand-border bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/10">
                  <Icon className="h-6 w-6 text-brand-secondary" />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-brand-primary">{title}</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP SECTION ── */}
      <section id="leadership" className="bg-white py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-semibold text-brand-accent">
              Leadership
            </span>
            <h2 className="font-poppins text-4xl font-extrabold text-brand-primary sm:text-5xl">Meet Our Leadership</h2>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-relaxed text-slate-600">
              PRORYN TECH is led by a team with a shared vision — to build intelligent software products and enterprise solutions
              that help businesses accelerate digital transformation through innovation, engineering excellence,
              artificial intelligence, and scalable cloud technologies.
            </p>
          </motion.div>

          {/* Two-column layout — CEO */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">

            {/* Left 40% — CEO photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <FounderPhoto />
            </motion.div>

            {/* Right 60% — CEO Bio + content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex flex-col gap-8">

              {/* Name + role */}
              <div>
                <h3 className="font-poppins text-4xl font-extrabold text-brand-primary">Preeti Singh</h3>
                <p className="mt-1.5 font-inter text-lg font-semibold text-brand-secondary">
                  Director &amp; Chief Executive Officer (CEO)
                </p>
                <p className="mt-1 font-inter text-sm text-slate-400">PRORYN TECH · Bhopal, Madhya Pradesh, India</p>
              </div>

              {/* Leadership statement */}
              <p className="font-inter text-[15px] font-medium leading-relaxed text-slate-500 italic">
                Leading Business Strategy, Innovation, Digital Transformation, and Organizational Growth at PRORYN TECH.
              </p>

              {/* Bio paragraphs */}
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-slate-600">
                <p>
                  Preeti Singh serves as the <strong className="text-brand-primary font-semibold">Director &amp; Chief Executive Officer</strong> of PRORYN TECH.
                  She leads the company&apos;s strategic vision, business operations, innovation initiatives, and long-term growth.
                  Under her leadership, PRORYN TECH is committed to delivering enterprise software, AI-powered solutions,
                  cloud technologies, and digital transformation services that help organizations achieve operational excellence.
                </p>
                <p>
                  She is focused on building a customer-centric technology company that delivers scalable software products,
                  intelligent automation, and modern enterprise solutions for businesses worldwide.
                </p>
              </div>

              {/* Expertise tags */}
              <div>
                <p className="mb-3 font-inter text-xs font-bold uppercase tracking-widest text-slate-400">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {CEO_EXPERTISE_TAGS.map((tag) => (
                    <span key={tag}
                      className="rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3.5 py-1.5 font-inter text-sm font-medium text-brand-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievement cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CEO_ACHIEVEMENTS.map(({ icon: Icon, value, label, sub }) => (
                  <div key={label}
                    className="rounded-2xl border border-brand-border bg-brand-background p-4 text-center shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10">
                      <Icon className="h-5 w-5 text-brand-secondary" />
                    </div>
                    <p className="font-poppins text-lg font-extrabold text-brand-primary">{value}</p>
                    <p className="font-inter text-[11px] font-semibold text-slate-700">{label}</p>
                    <p className="font-inter text-[10px] text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="relative overflow-hidden rounded-2xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5 p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-secondary/15" aria-hidden="true" />
                <blockquote className="relative font-inter text-base italic leading-relaxed text-slate-700">
                  &ldquo;Our mission is to build intelligent technology that empowers businesses to innovate, automate, and grow with confidence.&rdquo;
                </blockquote>
                <p className="mt-3 font-inter text-sm font-semibold text-brand-primary">— Preeti Singh</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/preetiksingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-[#0A66C2]/20 transition-all hover:bg-[#004182] hover:shadow-xl">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
                <Link href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-secondary px-5 py-3 font-inter text-sm font-semibold text-brand-secondary transition-all hover:bg-brand-secondary hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                  View Company Profile
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY LEADERSHIP SECTION — CTO ── */}
      <section id="technology-leadership" className="bg-brand-background py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-semibold text-brand-accent">
              Technology Leadership
            </span>
            <h2 className="font-poppins text-4xl font-extrabold text-brand-primary sm:text-5xl">Technology Leadership</h2>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-relaxed text-slate-600">
              Engineering innovation through scalable architecture, modern software development, and AI-powered enterprise solutions.
            </p>
          </motion.div>

          {/* Two-column layout — CTO (photo right) */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">

            {/* Left 60% — CTO Bio + content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8">

              {/* Name + role */}
              <div>
                <h3 className="font-poppins text-4xl font-extrabold text-brand-primary">Rustam Kumar</h3>
                <p className="mt-1.5 font-inter text-lg font-semibold text-brand-secondary">
                  Founder &amp; Chief Technology Officer (CTO)
                </p>
                <p className="mt-1 font-inter text-sm text-slate-400">PRORYN TECH · Bhopal, Madhya Pradesh, India</p>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-slate-600">
                <p>
                  Rustam Kumar is the <strong className="text-brand-primary font-semibold">Founder and Chief Technology Officer</strong> of PRORYN TECH
                  with over <strong className="text-brand-primary font-semibold">9 years of experience</strong> in Enterprise Software Development,
                  Government Digital Transformation, Java, Spring Boot, Cloud Technologies, REST APIs,
                  Business Automation, and AI-powered enterprise platforms.
                </p>
                <p>
                  He leads technology strategy, software architecture, engineering excellence, and product development,
                  with a strong focus on building <strong className="text-brand-primary font-semibold">PRORYN BusinessOS</strong> and
                  scalable enterprise software solutions.
                </p>
              </div>

              {/* Expertise tags */}
              <div>
                <p className="mb-3 font-inter text-xs font-bold uppercase tracking-widest text-slate-400">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {CTO_EXPERTISE_TAGS.map((tag) => (
                    <span key={tag}
                      className="rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3.5 py-1.5 font-inter text-sm font-medium text-brand-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievement cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CTO_ACHIEVEMENTS.map(({ icon: Icon, value, label, sub }) => (
                  <div key={label}
                    className="rounded-2xl border border-brand-border bg-white p-4 text-center shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10">
                      <Icon className="h-5 w-5 text-brand-secondary" />
                    </div>
                    <p className="font-poppins text-lg font-extrabold text-brand-primary">{value}</p>
                    <p className="font-inter text-[11px] font-semibold text-slate-700">{label}</p>
                    <p className="font-inter text-[10px] text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="relative overflow-hidden rounded-2xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5 p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-secondary/15" aria-hidden="true" />
                <blockquote className="relative font-inter text-base italic leading-relaxed text-slate-700">
                  &ldquo;Technology should simplify business, not complicate it.&rdquo;
                </blockquote>
                <p className="mt-3 font-inter text-sm font-semibold text-brand-primary">— Rustam Kumar</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/rustamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-[#0A66C2]/20 transition-all hover:bg-[#004182] hover:shadow-xl">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
                <Link href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-secondary px-5 py-3 font-inter text-sm font-semibold text-brand-secondary transition-all hover:bg-brand-secondary hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                  Explore PRORYN BusinessOS
                </Link>
              </div>
            </motion.div>

            {/* Right 40% — CTO photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                {/* Background accent blobs */}
                <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-brand-secondary/10 blur-3xl" aria-hidden="true" />

                {/* Gradient border frame */}
                <div className="relative rounded-3xl bg-gradient-to-br from-brand-accent via-brand-secondary to-violet-500 p-[3px] shadow-[0_32px_80px_rgba(37,99,235,0.2)]">
                  <div className="relative overflow-hidden rounded-[22px] bg-brand-background">
                    <Image
                      src="/images/Rustam_Profile.jpg"
                      alt="Rustam Kumar — Founder & CTO, PRORYN TECH"
                      width={480}
                      height={560}
                      className="h-[440px] w-full object-cover object-top lg:h-[520px]"
                    />
                  </div>
                </div>

                {/* Floating experience badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-4 top-8 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
                  aria-hidden="true"
                >
                  <p className="font-poppins text-xl font-extrabold text-brand-primary leading-none">9+</p>
                  <p className="font-inter text-[11px] text-slate-500">Years in<br/>Enterprise Tech</p>
                </motion.div>

                {/* Floating company badge */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -left-4 bottom-12 flex items-center gap-2.5 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
                  aria-hidden="true"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary">
                    <CpuIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins text-[11px] font-bold text-brand-primary">PRORYN TECH</p>
                    <p className="font-inter text-[10px] text-slate-400">Founder &amp; CTO</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="bg-brand-background py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-semibold text-brand-accent">
              Our Team
            </span>
            <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">
              Our Engineering Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-inter text-base text-slate-600">
              A focused team of engineers, architects, and technology professionals dedicated to
              building enterprise software that makes a measurable difference.
            </p>
          </motion.div>

          {/* 6-card grid: 1 col mobile → 2 col tablet → 3 col lg → 6 col xl */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>

          {/* Join the team CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-border bg-white px-8 py-6 shadow-card sm:flex-row">
            <div>
              <p className="font-poppins text-base font-bold text-brand-primary">Want to join this team?</p>
              <p className="font-inter text-sm text-slate-500">We are always looking for passionate engineers and technology professionals.</p>
            </div>
            <Link href="/careers"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white shadow-md shadow-brand-secondary/20 transition-all hover:bg-blue-700">
              View Open Positions <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Company Milestones ── */}
      <section className="bg-brand-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-medium text-brand-accent">Our Journey</span>
            <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">Key Milestones</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-secondary via-brand-accent to-transparent" aria-hidden="true" />
            <ol className="space-y-8">
              {MILESTONES.map(({ year, title, description }, i) => (
                <motion.li key={year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-secondary shadow-lg shadow-brand-secondary/30">
                    <span className="font-poppins text-xs font-bold text-white">{year.slice(2)}</span>
                  </div>
                  <div className="pt-2 pb-2">
                    <span className="font-inter text-xs font-bold uppercase tracking-widest text-brand-accent">{year}</span>
                    <h3 className="font-poppins text-lg font-semibold text-brand-primary">{title}</h3>
                    <p className="mt-1 font-inter text-sm leading-relaxed text-slate-600">{description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Careers CTA ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-poppins text-2xl font-bold text-brand-primary">Want to Build the Future With Us?</h2>
          <p className="mt-3 font-inter text-base text-slate-600">
            Join Preeti, Rustam, and the growing PRORYN TECH team — engineers, designers, and technology leaders
            who are passionate about building software that makes a real difference.
          </p>
          <Link href="/careers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-brand-secondary/20 hover:bg-blue-700">
            View Open Positions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
