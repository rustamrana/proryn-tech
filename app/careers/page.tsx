'use client';

import { useState } from 'react';
import {
  BadgeDollarSign, Clock, BookOpen, HeartPulse, Laptop, TrendingUp,
  MapPin, Briefcase, ChevronDown, ArrowRight,
} from 'lucide-react';
import { jobListings, companyBenefits } from '@/lib/data/careers';
import PageHero from '@/components/common/PageHero';

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  BadgeIndianRupee: BadgeDollarSign,
  Clock,
  BookOpen,
  HeartPulse,
  Laptop,
  TrendingUp,
};

const DEPARTMENTS = ['All', ...Array.from(new Set(jobListings.map((j) => j.department)))];

function JobCard({ job }: { job: typeof jobListings[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-brand-border bg-white shadow-card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-brand-secondary/10 px-3 py-1 font-inter text-xs font-semibold text-brand-secondary">
              {job.department}
            </span>
            <h3 className="font-poppins text-lg font-semibold text-brand-primary">{job.title}</h3>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="shrink-0 rounded-lg border border-brand-border p-2 transition-colors hover:bg-brand-background"
          >
            <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <span className="flex items-center gap-1 font-inter text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />{job.location}
          </span>
          <span className="flex items-center gap-1 font-inter text-sm text-slate-500">
            <Briefcase className="h-3.5 w-3.5" />{job.type}
          </span>
          <span className="rounded-full bg-green-50 px-2 py-0.5 font-inter text-xs font-medium text-green-700">
            {job.mode}
          </span>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-border bg-brand-background px-6 py-5">
          <p className="font-inter text-sm leading-relaxed text-slate-600">{job.description}</p>
          <a
            href={`mailto:careers@proryntech.com?subject=Application: ${encodeURIComponent(job.title)}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white hover:bg-blue-700"
          >
            Apply Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  const [dept, setDept] = useState('All');
  const filtered = dept === 'All' ? jobListings : jobListings.filter((j) => j.department === dept);

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Join Our Team"
        heading="Build the Future "
        headingHighlight="With Us"
        subheading="We are a growing team of engineers, designers, and technology leaders passionate about building enterprise software that makes a real difference for businesses worldwide."
        stats={[
          { value: '4+', label: 'Open Positions' },
          { value: 'Hybrid', label: 'Work Model' },
          { value: '6', label: 'Employee Benefits' },
        ]}
      />

      {/* Benefits */}
      <section className="bg-brand-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-medium text-brand-accent">Why Join Us</span>
            <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">Benefits &amp; Perks</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyBenefits.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon] ?? TrendingUp;
              return (
                <div key={benefit.id} className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/10">
                    <Icon className="h-6 w-6 text-brand-secondary" />
                  </div>
                  <h3 className="font-poppins text-base font-semibold text-brand-primary">{benefit.title}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-medium text-brand-accent">Open Roles</span>
            <h2 className="font-poppins text-3xl font-bold text-brand-primary sm:text-4xl">Current Openings</h2>
          </div>

          {/* Department filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {DEPARTMENTS.map((d) => (
              <button key={d} onClick={() => setDept(d)}
                className={`rounded-full px-4 py-2 font-inter text-sm font-medium transition-colors ${dept === d ? 'bg-brand-secondary text-white' : 'border border-brand-border text-slate-600 hover:bg-brand-background'}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((job) => <JobCard key={job.id} job={job} />)}
          </div>

          <p className="mt-8 text-center font-inter text-sm text-slate-500">
            Don&apos;t see a role that fits?{' '}
            <a href="mailto:careers@proryntech.com" className="text-brand-secondary hover:underline">
              Send us your resume anyway
            </a>
            {' '}— we are always open to exceptional talent.
          </p>
        </div>
      </section>

      {/* Life at PRORYN TECH */}
      <section className="bg-brand-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-poppins text-3xl font-bold text-white">Life at PRORYN TECH</h2>
            <p className="mt-3 font-inter text-base text-white/70 max-w-xl mx-auto">We believe that great work comes from great people in a supportive, challenging, and fun environment.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Collaborative Culture', 'Growth Mindset', 'Work–Life Balance', 'Technical Excellence'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-poppins text-base font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
