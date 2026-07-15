'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      return;
    }

    // TODO: wire up to actual subscription API
    setStatus('success');
    setEmail('');
  };

  return (
    <div className="mt-6">
      <p className="mb-1 font-poppins text-sm font-semibold uppercase tracking-widest text-white">
        Stay Informed
      </p>
      <p className="mb-3 font-inter text-xs leading-relaxed text-slate-400">
        Get the latest insights on enterprise software and AI.
      </p>

      {status === 'success' ? (
        <p className="rounded-lg bg-white/10 px-4 py-3 font-inter text-sm text-green-400">
          Thank you for subscribing!
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="your@email.com"
              aria-label="Email address"
              className={`
                flex-1 rounded-lg border bg-white/5 px-3 py-2 font-inter text-sm text-white
                placeholder-slate-500 outline-none transition-colors
                focus:border-brand-accent focus:ring-1 focus:ring-brand-accent
                ${status === 'error' ? 'border-red-500' : 'border-white/10'}
              `}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-secondary px-4 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-primary"
            >
              <Send className="h-3.5 w-3.5" />
              Subscribe
            </button>
          </div>
          {status === 'error' && (
            <p role="alert" className="mt-1.5 font-inter text-xs text-red-400">
              Please enter a valid email address.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
