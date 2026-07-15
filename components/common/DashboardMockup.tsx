'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  ShoppingCart,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardMockupProps {
  className?: string;
}

const KPI_CARDS = [
  { label: 'Revenue', value: '₹42.8L', change: '+18.3%', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Active Orders', value: '1,284', change: '+9.2%', up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Efficiency', value: '94.7%', change: '+2.1%', up: true, color: 'text-violet-600', bg: 'bg-violet-50' },
] as const;

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: ShoppingCart, label: 'Orders', active: false },
  { icon: Users, label: 'Clients', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
] as const;

const ACTIVITY = [
  { text: 'ERP sync complete', time: '1m ago', color: 'bg-emerald-400' },
  { text: 'Invoice #4821 raised', time: '8m ago', color: 'bg-brand-secondary' },
  { text: 'AI report generated', time: '23m ago', color: 'bg-violet-400' },
  { text: 'New client onboarded', time: '1h ago', color: 'bg-amber-400' },
] as const;

function MiniLineChart() {
  const points: [number, number][] = [
    [0, 52], [35, 42], [70, 48], [105, 28], [140, 35], [175, 18], [210, 24], [245, 10], [280, 5],
  ];
  const polyline = points.map((p) => p.join(',')).join(' ');
  const areaPath = `M${points[0][0]},${points[0][1]} ${points.slice(1).map((p) => `L${p[0]},${p[1]}`).join(' ')} L${points[points.length - 1][0]},60 L0,60 Z`;

  return (
    <svg viewBox="0 0 280 60" className="w-full" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chartGrad2)" />
      <polyline points={polyline} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map(([x, y], i) =>
        i === points.length - 1 ? (
          <circle key={i} cx={x} cy={y} r="4" fill="#2563EB" stroke="white" strokeWidth="1.5" />
        ) : null
      )}
    </svg>
  );
}

export default function DashboardMockup({ className }: DashboardMockupProps) {
  return (
    <div className={cn('relative select-none', className)}>
      {/* Glow ring behind the mockup */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, #2563EB 0%, #06B6D4 50%, transparent 80%)' }}
        aria-hidden="true"
      />

      {/* Browser chrome */}
      <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(15,23,42,0.45)]">
        {/* Title bar */}
        <div className="flex h-9 items-center gap-2 bg-[#1E293B] px-4">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <div className="mx-auto flex h-5 w-52 items-center justify-center gap-1.5 rounded-md bg-white/10 px-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-inter text-[10px] text-white/60">app.proryntech.com</span>
          </div>
          <Bell className="ml-auto h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        </div>

        {/* App body */}
        <div className="flex bg-[#F1F5F9]" style={{ height: 360 }}>
          {/* Sidebar */}
          <aside className="flex w-14 flex-shrink-0 flex-col items-center gap-1.5 bg-[#0F172A] py-4">
            {/* Logo dot */}
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary">
              <Zap className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
              <div key={label} title={label}
                className={cn('flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                  active ? 'bg-brand-secondary text-white' : 'text-slate-500 hover:bg-white/10 hover:text-slate-300')}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-poppins text-xs font-bold text-[#0F172A]">Business Overview</p>
                <p className="font-inter text-[9px] text-slate-400">Updated just now</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                <span className="font-inter text-[9px] font-medium text-emerald-600">All Systems OK</span>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {KPI_CARDS.map((kpi) => (
                <div key={kpi.label} className="flex flex-col rounded-xl bg-white p-2.5 shadow-sm">
                  <div className={cn('mb-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md', kpi.bg)}>
                    <TrendingUp className={cn('h-3 w-3', kpi.color)} aria-hidden="true" />
                  </div>
                  <span className="font-inter text-[8px] text-slate-400">{kpi.label}</span>
                  <span className="mt-0.5 font-poppins text-sm font-extrabold text-[#0F172A]">{kpi.value}</span>
                  <span className="mt-0.5 font-inter text-[8px] font-semibold text-emerald-500">{kpi.change}</span>
                </div>
              ))}
            </div>

            {/* Chart + Activity */}
            <div className="flex flex-1 gap-2 overflow-hidden">
              <div className="flex flex-1 flex-col rounded-xl bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-poppins text-[9px] font-bold text-slate-600">Revenue Trend</span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 font-inter text-[8px] font-semibold text-brand-secondary">+18% MTD</span>
                </div>
                <div className="flex-1"><MiniLineChart /></div>
                <div className="mt-1 flex justify-between">
                  {['W1', 'W2', 'W3', 'W4'].map((w) => (
                    <span key={w} className="font-inter text-[7px] text-slate-300">{w}</span>
                  ))}
                </div>
              </div>

              <div className="flex w-[118px] flex-shrink-0 flex-col rounded-xl bg-white p-3 shadow-sm">
                <span className="mb-2 font-poppins text-[9px] font-bold text-slate-600">Recent Activity</span>
                <ul className="space-y-2">
                  {ACTIVITY.map((item) => (
                    <li key={item.text} className="flex items-start gap-1.5">
                      <span className={cn('mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full', item.color)} />
                      <div>
                        <p className="font-inter text-[8px] leading-tight text-slate-700">{item.text}</p>
                        <p className="font-inter text-[7px] text-slate-400">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card — top right */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-6 -top-6 z-10 flex items-center gap-2.5 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
        aria-hidden="true"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </span>
        <div>
          <p className="font-poppins text-[11px] font-bold text-brand-primary">Revenue Up</p>
          <p className="font-inter text-[10px] text-slate-400">+18.3% this month</p>
        </div>
      </motion.div>

      {/* Floating card — bottom left */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-6 -left-6 z-10 flex items-center gap-2.5 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-card-hover"
        aria-hidden="true"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
          <Zap className="h-4 w-4 text-violet-600" />
        </span>
        <div>
          <p className="font-poppins text-[11px] font-bold text-brand-primary">AI Insight Ready</p>
          <p className="font-inter text-[10px] text-slate-400">Q3 forecast generated</p>
        </div>
      </motion.div>
    </div>
  );
}
