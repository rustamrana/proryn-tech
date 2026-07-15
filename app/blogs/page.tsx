'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Calendar, TrendingUp, BookOpen, Cpu, Cloud, Zap, Globe } from 'lucide-react';
import BlogCard from '@/components/common/BlogCard';
import { blogPosts } from '@/lib/data/blog-posts';

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string; count: number }> = {
  'Artificial Intelligence': { icon: Cpu,       color: 'text-violet-600', bg: 'bg-violet-50',  count: 1 },
  'Software Engineering':    { icon: BookOpen,  color: 'text-blue-600',   bg: 'bg-blue-50',    count: 1 },
  'Cloud':                   { icon: Cloud,     color: 'text-sky-600',    bg: 'bg-sky-50',     count: 1 },
  'Business Automation':     { icon: Zap,       color: 'text-amber-600',  bg: 'bg-amber-50',   count: 1 },
  'Digital Transformation':  { icon: TrendingUp,color: 'text-emerald-600',bg: 'bg-emerald-50', count: 1 },
  'Technology':              { icon: Globe,     color: 'text-indigo-600', bg: 'bg-indigo-50',  count: 1 },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Featured post = first (most recent) blog post
const featured = blogPosts[0];
const rest = blogPosts.slice(1);

export default function BlogsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? rest : blogPosts.filter((p) => p.category === active);

  return (
    <>
      {/* ── PREMIUM HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-28 pb-0">
        {/* Multi-layer background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 15% -5%, rgba(37,99,235,0.22) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 85% 100%, rgba(6,182,212,0.12) 0%, transparent 55%)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-secondary/15 blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-brand-accent/10 blur-[80px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Top text block ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-inter text-sm text-white/70">
              <BookOpen className="h-3.5 w-3.5 text-brand-accent" />
              Insights &amp; Articles
            </span>
            <h1 className="font-poppins text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Knowledge Base &amp;{' '}
              <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                Thought Leadership
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-inter text-lg text-white/60">
              Expert insights on enterprise software, artificial intelligence, cloud architecture, digital transformation,
              and business automation — from the PRORYN TECH engineering team.
            </p>
          </motion.div>

          {/* ── Category stats strip ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            className="mb-10 hidden grid-cols-6 gap-3 lg:grid">
            {Object.entries(CATEGORY_META).map(([cat, meta]) => {
              const Icon = meta.icon;
              return (
                <button key={cat} onClick={() => setActive(cat === active ? 'All' : cat)}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-all duration-200 text-center
                    ${active === cat
                      ? 'border-brand-secondary/60 bg-brand-secondary/20 shadow-lg shadow-brand-secondary/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${active === cat ? 'bg-brand-secondary' : 'bg-white/10 group-hover:bg-white/20'} transition-colors`}>
                    <Icon className={`h-4 w-4 ${active === cat ? 'text-white' : 'text-white/60'}`} />
                  </div>
                  <span className={`font-inter text-[11px] font-semibold leading-tight ${active === cat ? 'text-white' : 'text-white/50'}`}>
                    {cat.split(' ').slice(0, 2).join(' ')}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Featured article card ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative">
            <Link href={`/blogs/${featured.slug}`}
              className="group block overflow-hidden rounded-t-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/8">
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
                {/* Left: content */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-brand-secondary/20 px-3 py-1 font-inter text-xs font-bold uppercase tracking-wider text-brand-accent">
                        Featured
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 font-inter text-xs font-medium text-white/60">
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="font-poppins text-2xl font-extrabold leading-tight text-white group-hover:text-brand-accent transition-colors sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 font-inter text-sm leading-relaxed text-white/55 line-clamp-3">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 font-inter text-sm text-white/40">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(featured.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime} min read</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/30 transition-all group-hover:bg-blue-500">
                      Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                {/* Right: visual accent panel */}
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10 p-10 border-l border-white/10">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-secondary/20 border border-brand-secondary/30">
                      <Cpu className="h-10 w-10 text-brand-accent" />
                    </div>
                    <p className="font-poppins text-lg font-bold text-white">AI &amp; Enterprise</p>
                    <p className="mt-1 font-inter text-sm text-white/40">Featured Topic</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {['AI', 'ERP', 'Manufacturing', 'Automation'].map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 font-inter text-[11px] text-white/50">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Article Grid ─────────────────────────────────────────────────── */}
      <section className="bg-brand-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Mobile category filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 lg:hidden">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 font-inter text-sm font-medium transition-colors ${active === cat ? 'bg-brand-secondary text-white shadow-md' : 'border border-brand-border bg-white text-slate-600 hover:bg-white hover:border-brand-secondary/40'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Section label */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-poppins text-2xl font-bold text-brand-primary">
                {active === 'All' ? 'All Articles' : active}
              </h2>
              <p className="mt-0.5 font-inter text-sm text-slate-500">
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            {active !== 'All' && (
              <button onClick={() => setActive('All')}
                className="font-inter text-sm font-medium text-brand-secondary hover:underline">
                Clear filter ×
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div key={post.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <BlogCard slug={post.slug} category={post.category} title={post.title}
                  excerpt={post.excerpt} author={post.author} date={post.date} readTime={post.readTime} />
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary to-[#1e3a6e]">
            <div className="flex flex-col items-center justify-between gap-6 px-8 py-8 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-poppins text-lg font-bold text-white">Never Miss an Article</p>
                <p className="mt-1 font-inter text-sm text-white/60">
                  Get the latest insights on enterprise tech, AI, and digital transformation delivered to your inbox.
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <input type="email" placeholder="your@email.com" aria-label="Email for newsletter"
                  className="w-48 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 font-inter text-sm text-white placeholder-white/30 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                <button className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-2.5 font-inter text-sm font-bold text-white transition-all hover:bg-blue-600 whitespace-nowrap">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
