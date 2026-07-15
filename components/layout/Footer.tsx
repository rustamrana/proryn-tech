import Link from 'next/link';
import { Linkedin, Github, Facebook, Instagram, Youtube, Twitter, Mail, MapPin, Globe, Phone } from 'lucide-react';
import { COMPANY_NAME, TAGLINE, EMAIL, PHONE, WEBSITE, FULL_ADDRESS, SOCIAL_LINKS, COPYRIGHT } from '@/lib/constants';
import { services } from '@/lib/data/services';
import { products } from '@/lib/data/products';
import { industries } from '@/lib/data/industries';
import NewsletterForm from './NewsletterForm';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Leadership', href: '/about#leadership' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blogs & Insights', href: '/blogs' },
  { label: 'Case Studies', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_LINKS = services.map((s) => ({ label: s.title, href: `/services#${s.id}` }));

const PRODUCT_LINKS = products
  .filter((p) => ['proryn-businessos','proryn-crm','proryn-hrms','proryn-dms','proryn-payroll','proryn-projects'].includes(p.id))
  .map((p) => ({ label: p.name, href: `/products#${p.id}` }));

const INDUSTRY_LINKS = industries
  .filter((i) => ['manufacturing','healthcare','education','government','construction','retail','finance','hospitality','real-estate'].includes(i.id))
  .map((i) => ({ label: i.name, href: `/industries#${i.id}` }));

const RESOURCE_LINKS = [
  { label: 'Case Studies', href: '/industries' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Knowledge Base', href: '/knowledge-base' },
  { label: 'Support Center', href: '/support' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];

const SOCIAL_ITEMS = [
  { key: 'linkedin',  href: SOCIAL_LINKS.linkedin,  Icon: Linkedin,  label: `${COMPANY_NAME} on LinkedIn` },
  { key: 'github',    href: SOCIAL_LINKS.github,    Icon: Github,    label: `${COMPANY_NAME} on GitHub` },
  { key: 'facebook',  href: SOCIAL_LINKS.facebook,  Icon: Facebook,  label: `${COMPANY_NAME} on Facebook` },
  { key: 'instagram', href: SOCIAL_LINKS.instagram, Icon: Instagram, label: `${COMPANY_NAME} on Instagram` },
  { key: 'youtube',   href: SOCIAL_LINKS.youtube,   Icon: Youtube,   label: `${COMPANY_NAME} on YouTube` },
  { key: 'x',         href: SOCIAL_LINKS.x,         Icon: Twitter,   label: `${COMPANY_NAME} on X (Twitter)` },
] as const;

function FooterLinkColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h3 className="mb-5 font-poppins text-xs font-bold uppercase tracking-[0.12em] text-white/90">{heading}</h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="font-inter text-sm text-slate-400 transition-colors duration-150 hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A1628]" aria-label="Site footer">

      {/* ── Top CTA strip ── */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-poppins text-lg font-bold text-white">Ready to transform your business with technology?</p>
              <p className="mt-1 font-inter text-sm text-slate-400">Book a free consultation — no commitment required.</p>
            </div>
            <Link href="/contact"
              className="shrink-0 rounded-xl bg-brand-secondary px-6 py-3 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/20 transition-all hover:bg-blue-600 hover:shadow-xl">
              Book Free Consultation →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr]">

          {/* Company info */}
          <div>
            {/* Logo */}
            <Link href="/" aria-label={`${COMPANY_NAME} – homepage`}
              className="mb-4 inline-flex items-baseline gap-0 font-poppins text-xl font-black text-white">
              PRORYN<span className="text-brand-secondary"> TECH</span>
            </Link>

            <p className="font-inter text-sm leading-relaxed text-slate-400 max-w-[240px]">{TAGLINE}</p>

            {/* Contact details */}
            <address className="not-italic mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <p className="font-inter text-sm leading-relaxed text-slate-400">{FULL_ADDRESS}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <a href={`mailto:${EMAIL.support}`} className="font-inter text-sm text-slate-400 transition-colors hover:text-white">
                  {EMAIL.support}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="font-inter text-sm text-slate-400 transition-colors hover:text-white">
                  {PHONE}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <a href={WEBSITE} target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-slate-400 transition-colors hover:text-white">
                  {WEBSITE.replace('https://', '')}
                </a>
              </div>
            </address>

            {/* Social icons */}
            <div className="mt-6 flex flex-wrap gap-1.5" role="list" aria-label="Social media links">
              {SOCIAL_ITEMS.map(({ key, href, Icon, label }) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} role="listitem"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-brand-accent/40 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-[#0A1628]">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <NewsletterForm />

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['ISO 27001 Aligned', 'HIPAA Ready', 'GDPR Compliant'].map((badge) => (
                <span key={badge} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-inter text-[10px] font-medium text-slate-400">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkColumn heading="Company" links={COMPANY_LINKS} />
          <FooterLinkColumn heading="Services" links={SERVICE_LINKS} />
          <FooterLinkColumn heading="Products" links={PRODUCT_LINKS} />
          <FooterLinkColumn heading="Industries" links={INDUSTRY_LINKS} />
          <FooterLinkColumn heading="Resources" links={RESOURCE_LINKS} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-inter text-sm text-slate-500">{COPYRIGHT}</p>
          <div className="flex items-center gap-1 font-inter text-sm text-slate-500">
            <span>Made with</span>
            <span className="text-red-500" aria-label="love">♥</span>
            <span>in Bhopal, India</span>
          </div>
          <nav aria-label="Legal links" className="flex gap-5">
            <Link href="/privacy-policy" className="font-inter text-sm text-slate-500 transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="font-inter text-sm text-slate-500 transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
