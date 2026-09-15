import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Users, Building2 } from 'lucide-react';
import { applications, getApplicationBySlug } from '@/lib/data/applications';
import { getApplicationIcon, getStatusMeta } from '@/lib/application-ui';
import LaunchAppButton from '@/components/common/LaunchAppButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return applications.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getApplicationBySlug(slug);
  if (!app) return { title: 'Application Not Found' };

  return {
    title: app.name,
    description: app.shortDescription,
    alternates: { canonical: `https://proryntech.com/applications/${app.slug}` },
    openGraph: {
      title: `${app.name} — PRORYN Applications`,
      description: app.shortDescription,
      url: `https://proryntech.com/applications/${app.slug}`,
      type: 'website',
    },
  };
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const app = getApplicationBySlug(slug);
  if (!app) notFound();

  const Icon = getApplicationIcon(app.icon);
  const status = getStatusMeta(app.status);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-28 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 15% -5%, rgba(37,99,235,0.22) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 85% 100%, rgba(6,182,212,0.10) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/applications"
            className="mb-6 inline-flex items-center gap-2 font-inter text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Applications
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15"
            >
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="font-inter text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  {app.businessArea}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-inter text-xs font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
              <h1 className="font-poppins text-3xl font-extrabold text-white sm:text-4xl">
                {app.name}
              </h1>
              <p className="mt-2 max-w-2xl font-inter text-base text-white/60">
                {app.shortDescription}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <LaunchAppButton app={app} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          <div className="max-w-3xl">
            <h2 className="font-poppins text-2xl font-bold text-brand-primary">Overview</h2>
            <p className="mt-4 font-inter text-base leading-relaxed text-slate-600">
              {app.description}
            </p>
          </div>

          {/* Key capabilities */}
          <div className="mt-12">
            <h2 className="font-poppins text-2xl font-bold text-brand-primary">
              Key Capabilities
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {app.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-background p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" aria-hidden="true" />
                  <span className="font-inter text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mt-12">
            <h2 className="font-poppins text-2xl font-bold text-brand-primary">Benefits</h2>
            <ul className="mt-6 space-y-3">
              {app.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
                  <span className="font-inter text-base text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta grid: business area / target users / industries */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="mb-3 flex items-center gap-2 text-brand-secondary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-poppins text-sm font-semibold text-brand-primary">
                  Business Area
                </h3>
              </div>
              <p className="font-inter text-sm text-slate-600">{app.businessArea}</p>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="mb-3 flex items-center gap-2 text-brand-secondary">
                <Users className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-poppins text-sm font-semibold text-brand-primary">
                  Target Users
                </h3>
              </div>
              <ul className="space-y-1.5">
                {app.targetUsers.map((user) => (
                  <li key={user} className="font-inter text-sm text-slate-600">
                    {user}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="mb-3 flex items-center gap-2 text-brand-secondary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-poppins text-sm font-semibold text-brand-primary">
                  Industries
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {app.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3 py-1 font-inter text-xs font-medium text-brand-secondary"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Launch CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-secondary to-brand-accent p-px">
            <div className="flex w-full flex-col items-center gap-4 rounded-[15px] bg-white px-6 py-10 text-center">
              <h2 className="font-poppins text-2xl font-bold text-brand-primary">
                Ready to get started with {app.name}?
              </h2>
              <p className="max-w-xl font-inter text-sm text-slate-600">
                {app.isAvailable
                  ? 'Launch the application in PRORYN BusinessOS, or talk to our team about rolling it out for your organization.'
                  : `${app.name} is on our roadmap. Talk to our team to learn more or register your interest.`}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <LaunchAppButton app={app} />
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Enquiry about ${app.name}`)}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-secondary px-6 py-3 font-inter text-sm font-semibold text-brand-secondary transition-colors hover:bg-brand-secondary/5"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
