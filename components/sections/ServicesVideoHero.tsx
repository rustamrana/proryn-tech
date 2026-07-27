'use client';

import VideoBackground from '@/components/effects/VideoBackground';

/**
 * Demo section showcasing VideoBackground integration on the services page.
 *
 * Uses a placeholder poster image since actual video files haven't been added yet.
 * Once video files are available, place them in `/public/videos/` and update the
 * `src` and `webmSrc` props below.
 *
 * The VideoBackground component automatically:
 * - Plays/pauses based on viewport visibility (IntersectionObserver)
 * - Falls back to poster on slow/metered connections (Network Information API)
 * - Handles video load errors gracefully
 * - Renders a dark overlay for text readability
 *
 * @example — Full integration with actual video:
 * ```tsx
 * <VideoBackground
 *   src="/videos/services-hero.mp4"
 *   webmSrc="/videos/services-hero.webm"
 *   poster="/images/services-poster.jpg"
 *   overlay={true}
 *   overlayOpacity={0.55}
 *   className="aspect-[21/9]"
 * />
 * ```
 */
export default function ServicesVideoHero() {
  return (
    <section className="relative">
      {/* VideoBackground with dark overlay for text readability.
          Currently using poster-only mode since video files are not yet available.
          Replace src with actual video path when files are added to /public/videos/ */}
      <VideoBackground
        src="/videos/services-hero.mp4"
        webmSrc="/videos/services-hero.webm"
        poster="/images/Rustam_Profile.jpg"
        overlay={true}
        overlayOpacity={0.6}
        className="aspect-[21/9] min-h-[240px]"
      />

      {/* Content overlay positioned on top of the video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-inter text-sm font-medium text-white/80 backdrop-blur-sm">
            Enterprise Solutions
          </span>
          <h2 className="font-poppins text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Technology That Drives{' '}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm leading-relaxed text-white/70 sm:text-base">
            From custom software development to AI-powered automation — we deliver
            solutions that transform how businesses operate and grow.
          </p>
        </div>
      </div>
    </section>
  );
}
