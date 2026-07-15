import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  rating: 4 | 5;
  quote: string;
  initials?: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  rating,
  quote,
  initials,
  className,
}: TestimonialCardProps) {
  const avatarInitials = initials ?? name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white p-8 shadow-card',
        className,
      )}
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute left-6 top-4 font-poppins text-8xl font-bold leading-none text-brand-secondary/20 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Star rating */}
      <div className="relative mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'text-lg',
              i < rating ? 'text-yellow-400' : 'text-slate-200',
            )}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>

      {/* Quote */}
      <blockquote className="relative mb-6 font-inter text-base italic leading-relaxed text-slate-700">
        {quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-secondary font-poppins text-sm font-bold text-white">
          {avatarInitials}
        </div>

        <div>
          <p className="font-poppins text-sm font-semibold text-brand-primary">{name}</p>
          <p className="font-inter text-xs text-slate-500">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
