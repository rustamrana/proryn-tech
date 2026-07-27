'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { validateCredentials, setSession, getSession } from '@/lib/auth/demo-auth';
import { useEffect } from 'react';

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const session = getSession();
    if (session) {
      router.replace('/portal/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setForgotMessage('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const user = validateCredentials(email, password);
    if (user) {
      setSession(user);
      router.push('/portal/dashboard');
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotMessage('Please contact your account administrator to reset your password.');
    setError('');
  };

  return (
    <>
      {/* Dark Hero Header */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-12 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 30% -10%, rgba(37,99,235,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 100%, rgba(6,182,212,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-md px-4 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-inter text-sm text-white/70">
            Secure Client Access
          </span>
          <h1 className="font-poppins text-3xl font-extrabold text-white sm:text-4xl">
            Client Portal
          </h1>
          <p className="mt-3 font-inter text-base text-white/60">
            Access your projects, milestones, and deliverables.
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="relative -mt-8 pb-16">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-hero">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-inter text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 font-inter text-sm text-slate-800 placeholder-slate-400 outline-none transition-all hover:border-slate-300 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="font-inter text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 font-inter text-sm text-slate-800 placeholder-slate-400 outline-none transition-all hover:border-slate-300 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <p className="font-inter text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Forgot password message */}
              {forgotMessage && (
                <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                  <Info className="h-4 w-4 shrink-0 text-amber-600" />
                  <p className="font-inter text-sm text-amber-700">{forgotMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary py-3.5 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/25 transition-all hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {/* Forgot Password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-inter text-sm text-brand-secondary hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </button>
            </form>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-5 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
              <div>
                <p className="font-inter text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Demo Credentials
                </p>
                <p className="mt-1 font-inter text-sm text-slate-600">
                  <span className="font-medium">Email:</span> demo@proryntech.com
                </p>
                <p className="font-inter text-sm text-slate-600">
                  <span className="font-medium">Password:</span> Demo@123
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
