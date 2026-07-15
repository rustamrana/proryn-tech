import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-primary px-8 text-center">
      {/* 404 number */}
      <p
        className="font-poppins font-extrabold leading-none text-brand-secondary"
        style={{ fontSize: 'clamp(6rem, 20vw, 10rem)', letterSpacing: '-0.04em' }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1 className="mt-4 font-poppins text-3xl font-bold text-white sm:text-4xl">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-3 font-inter text-lg text-slate-400 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-brand-secondary px-7 py-3 font-poppins text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate-600 px-7 py-3 font-poppins text-sm font-semibold text-white transition-colors duration-200 hover:border-brand-secondary"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
