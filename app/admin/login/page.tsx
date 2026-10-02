'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get('from') || '/admin/blogs';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        router.replace(from);
        router.refresh();
        return;
      }
      setError(data?.message ?? 'Invalid email or password.');
      setLoading(false);
    } catch {
      setError('Unable to reach the server. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondary/10 text-brand-secondary">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="font-poppins text-2xl font-extrabold text-brand-primary">Admin Sign In</h1>
          <p className="mt-1 font-inter text-sm text-slate-500">PRORYN TECH content management</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-inter text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoComplete="username" placeholder="admin@proryntech.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 font-inter text-sm text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-inter text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="password" type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 font-inter text-sm text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15" />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <p className="font-inter text-sm text-red-600">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary py-3.5 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/25 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Signing in…</>
              ) : (
                <>Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
