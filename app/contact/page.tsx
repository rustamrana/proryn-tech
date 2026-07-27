'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail, MapPin, Globe, Phone, CheckCircle2, Send, ArrowRight,
  Linkedin, Twitter, Clock, MessageSquare, Headphones,
} from 'lucide-react';
import { services } from '@/lib/data/services';
import { EMAIL, WEBSITE, FULL_ADDRESS, PHONE, SOCIAL_LINKS } from '@/lib/constants';

// ── Schema ───────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  fullName:    z.string().min(2, 'Full name is required'),
  companyName: z.string().optional(),
  email:       z.string().email('Please enter a valid email address'),
  phone:       z.string().optional(),
  service:     z.string().optional(),
  message:     z.string().min(20, 'Please describe your project in at least 20 characters'),
});
type ContactFormData = z.infer<typeof contactSchema>;

// ── Field ────────────────────────────────────────────────────────────────────
function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-inter text-sm font-semibold text-slate-700">
        {label}{required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p role="alert" className="font-inter text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full rounded-xl border px-4 py-3 font-inter text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white
   focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15
   ${err ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'}`;

// ── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 py-16 px-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-poppins text-xl font-bold text-brand-primary">Message Sent Successfully!</h3>
        <p className="mt-2 font-inter text-sm text-slate-600 max-w-xs">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white hover:bg-blue-700">
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
          <input id="fullName" {...register('fullName')} placeholder="Rajesh Kumar" className={inputCls(errors.fullName?.message)} />
        </Field>
        <Field id="companyName" label="Company Name" error={errors.companyName?.message}>
          <input id="companyName" {...register('companyName')} placeholder="Acme Technologies" className={inputCls()} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="email" label="Email Address" required error={errors.email?.message}>
          <input id="email" type="email" {...register('email')} placeholder="you@company.com" className={inputCls(errors.email?.message)} />
        </Field>
        <Field id="phone" label="Phone Number" error={errors.phone?.message}>
          <input id="phone" {...register('phone')} placeholder="+91 98765 43210" className={inputCls()} />
        </Field>
      </div>

      <Field id="service" label="Service of Interest">
        <select id="service" {...register('service')} className={inputCls() + ' cursor-pointer'}>
          <option value="">Select a service...</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </Field>

      <Field id="message" label="Project Details" required error={errors.message?.message}>
        <textarea id="message" {...register('message')} rows={5}
          placeholder="Tell us about your project — goals, timeline, budget, and anything else that helps us prepare..."
          className={inputCls(errors.message?.message) + ' resize-none'} />
      </Field>

      <button type="submit" disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary py-4 font-inter text-base font-bold text-white shadow-lg shadow-brand-secondary/25 transition-all hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? (
          <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending...</>
        ) : (
          <><Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />Send Message</>
        )}
      </button>

      <p className="text-center font-inter text-xs text-slate-400">
        We respond within 24 hours · No commitment required
      </p>
    </form>
  );
}

// ── Contact Channel Card ──────────────────────────────────────────────────────
function ChannelCard({ icon: Icon, label, value, href, accent }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string; accent: string;
}) {
  return (
    <a href={href} className={`group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition-all hover:shadow-card-hover hover:border-${accent}-200`}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-${accent}-50 transition-colors group-hover:bg-${accent}-100`}>
        <Icon className={`h-5 w-5 text-${accent}-600`} />
      </div>
      <div className="min-w-0">
        <p className="font-inter text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="truncate font-inter text-sm font-semibold text-slate-700 group-hover:text-brand-secondary transition-colors">{value}</p>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% -10%, rgba(37,99,235,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 100%, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-inter text-sm text-white/70">
              Let&apos;s Build Something Great
            </span>
            <h1 className="font-poppins text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Start Your Project
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                With PRORYN TECH
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-inter text-lg text-white/60">
              Book a free consultation, get a project estimate, or ask anything about our services.
              We respond to every inquiry within 24 hours.
            </p>
          </motion.div>

          {/* Response time pills */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Clock, text: '24h Response Time' },
              { icon: MessageSquare, text: 'Free Consultation' },
              { icon: Headphones, text: 'Dedicated Support' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-inter text-sm text-white/60">
                <Icon className="h-3.5 w-3.5 text-brand-accent" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="bg-brand-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr] lg:items-start">

            {/* ── Left: Info Panel ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55 }} className="flex flex-col gap-6">

              {/* Info card */}
              <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <h2 className="mb-1 font-poppins text-xl font-bold text-brand-primary">Contact Information</h2>
                <p className="mb-6 font-inter text-sm text-slate-500">Reach us through any of the channels below.</p>

                <div className="flex flex-col gap-3">
                  <ChannelCard icon={Mail} label="Email" value={EMAIL.support} href={`mailto:${EMAIL.support}`} accent="blue" />
                  <ChannelCard icon={Headphones} label="Support" value={EMAIL.support} href={`mailto:${EMAIL.support}`} accent="emerald" />
                  <ChannelCard icon={MapPin} label="Office" value={FULL_ADDRESS} href="https://maps.google.com/?q=Bhopal+Madhya+Pradesh+India" accent="amber" />
                  <ChannelCard icon={Phone} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s/g, '')}`} accent="violet" />
                  <ChannelCard icon={Globe} label="Website" value={WEBSITE.replace('https://', '')} href={WEBSITE} accent="cyan" />
                </div>
              </div>

              {/* Address detail card */}
              <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <h3 className="mb-3 font-poppins text-sm font-bold uppercase tracking-widest text-slate-400">Office Address</h3>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10">
                    <MapPin className="h-4 w-4 text-brand-secondary" />
                  </div>
                  <address className="not-italic font-inter text-sm leading-relaxed text-slate-700">
                    {FULL_ADDRESS}
                  </address>
                </div>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <h3 className="mb-4 font-poppins text-sm font-bold uppercase tracking-widest text-slate-400">Follow Us</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', color: 'bg-[#0A66C2]/10 text-[#0A66C2]' },
                    { Icon: Twitter,  href: SOCIAL_LINKS.x,        label: 'X / Twitter', color: 'bg-slate-100 text-slate-700' },
                  ].map(({ Icon, href, label, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-inter text-sm font-semibold transition-all hover:scale-105 ${color}`}>
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Booking CTA */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary to-[#1e3a6e] p-6 text-center">
                <MessageSquare className="mx-auto mb-3 h-8 w-8 text-brand-accent" />
                <h3 className="font-poppins text-lg font-bold text-white">Prefer a Video Call?</h3>
                <p className="mt-2 font-inter text-sm text-white/60">
                  Book a free 30-minute consultation call with our technology team.
                </p>
                <a href={`mailto:${EMAIL.support}?subject=Book%20Free%20Consultation`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-bold text-white transition-all hover:bg-blue-600">
                  Schedule a Call <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}>
              <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-card lg:p-10">
                {/* Form header */}
                <div className="mb-8">
                  <h2 className="font-poppins text-2xl font-extrabold text-brand-primary">Send Us a Message</h2>
                  <p className="mt-1.5 font-inter text-sm text-slate-500">
                    Fill in the form and we&apos;ll get back to you with a tailored proposal.
                  </p>
                </div>

                <ContactForm />
              </div>

              {/* What happens next */}
              <div className="mt-5 rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <h3 className="mb-4 font-poppins text-sm font-bold text-brand-primary">What Happens Next?</h3>
                <ol className="space-y-3">
                  {[
                    { n: '01', text: 'We review your message and requirements within 24 hours.' },
                    { n: '02', text: 'Our team schedules a discovery call to understand your project in detail.' },
                    { n: '03', text: 'You receive a detailed proposal with scope, timeline, and investment.' },
                  ].map(({ n, text }) => (
                    <li key={n} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 font-poppins text-[11px] font-bold text-brand-secondary">
                        {n}
                      </span>
                      <span className="font-inter text-sm leading-relaxed text-slate-600">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
