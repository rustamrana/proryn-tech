'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcomes: string[];
  className?: string;
}

/**
 * Highlights numbers within a string by wrapping them in a bold brand-secondary span.
 */
function HighlightNumbers({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:[.,]\d+)?(?:%|x|\+)?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\d+(?:[.,]\d+)?(?:%|x|\+)?$/.test(part) ? (
          <strong key={i} className="font-semibold text-brand-secondary">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function CaseStudyCard({
  industry,
  title,
  challenge,
  solution,
  technologies,
  outcomes,
  className,
}: CaseStudyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex flex-col rounded-2xl border border-brand-border bg-white p-8 transition-shadow duration-200',
        hovered ? 'shadow-card-hover' : 'shadow-card',
        className,
      )}
    >
      {/* Industry badge */}
      <span className="mb-4 inline-block self-start rounded-full bg-brand-secondary/10 px-3 py-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-brand-secondary">
        {industry}
      </span>

      {/* Title */}
      <h3 className="mb-4 font-poppins text-xl font-semibold text-brand-primary">{title}</h3>

      {/* Challenge */}
      <div className="mb-3">
        <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-wider text-slate-400">
          Challenge
        </p>
        <p className="line-clamp-2 font-inter text-sm leading-relaxed text-slate-600">
          {challenge}
        </p>
      </div>

      {/* Solution */}
      <div className="mb-5">
        <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-wider text-slate-400">
          Solution
        </p>
        <p className="line-clamp-2 font-inter text-sm leading-relaxed text-slate-600">{solution}</p>
      </div>

      {/* Technologies */}
      <div className="mb-5 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 font-inter text-xs font-medium text-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Outcomes */}
      <div className="mb-6">
        <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-wider text-slate-400">
          Outcomes
        </p>
        <ul className="space-y-1.5">
          {outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span className="font-inter text-sm text-slate-700">
                <HighlightNumbers text={outcome} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Read more link */}
      <div className="mt-auto border-t border-brand-border pt-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 font-inter text-sm font-medium text-brand-secondary hover:gap-2 transition-all duration-200"
        >
          Read Case Study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
