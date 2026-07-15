'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO string
  readTime: number;
  slug: string;
  className?: string;
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}

export default function BlogCard({
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  slug,
  className,
}: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow duration-200',
        hovered ? 'shadow-card-hover' : 'shadow-card',
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-6">
        {/* Category badge */}
        <span className="mb-3 inline-block self-start rounded-full bg-brand-accent/10 px-3 py-1 font-inter text-xs font-semibold uppercase tracking-wider text-brand-accent">
          {category}
        </span>

        {/* Title */}
        <Link href={`/blogs/${slug}`}>
          <h3
            className={cn(
              'mb-3 font-poppins text-lg font-semibold leading-snug transition-colors duration-200',
              hovered ? 'text-brand-secondary' : 'text-brand-primary',
            )}
          >
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 font-inter text-sm leading-relaxed text-slate-600">
          {excerpt}
        </p>

        {/* Footer meta */}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {author}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(date)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime} min read
          </span>
        </div>

        {/* Read more */}
        <div className="mt-4 border-t border-brand-border pt-4">
          <Link
            href={`/blogs/${slug}`}
            className="inline-flex items-center gap-1 font-inter text-sm font-medium text-brand-secondary transition-gap duration-200 hover:gap-2"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
