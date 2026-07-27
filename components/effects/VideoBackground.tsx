'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface VideoBackgroundProps {
  /** Path to the MP4 video file */
  src: string;
  /** Optional WebM source for better compression */
  webmSrc?: string;
  /** Fallback poster image shown on slow networks or video error */
  poster: string;
  /** Additional CSS classes for the outer container */
  className?: string;
  /** Whether to render a dark overlay for text readability (default: true) */
  overlay?: boolean;
  /** Overlay opacity value between 0 and 1 (default: 0.5) */
  overlayOpacity?: number;
}

/**
 * Detects whether the user is on a slow or metered network connection.
 * Returns `true` for 2g, slow-2g, or metered (data-saver) connections.
 */
function isSlowNetworkConnection(): boolean {
  if (typeof navigator === 'undefined') return false;

  const connection = (navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  }).connection;

  if (!connection) return false;

  const { effectiveType, saveData } = connection;

  if (saveData) return true;
  if (effectiveType === '2g' || effectiveType === 'slow-2g') return true;

  return false;
}

/**
 * A performant video background component with viewport-aware playback,
 * network-aware loading, and graceful fallback to a poster image.
 *
 * Features:
 * - IntersectionObserver for play/pause based on viewport visibility
 * - Network Information API to skip video on slow/metered connections
 * - Fallback chain: WebM → MP4 → poster image
 * - Fixed aspect-ratio container to prevent CLS
 * - Graceful error handling (shows poster without layout shift)
 */
export default function VideoBackground({
  src,
  webmSrc,
  poster,
  className = '',
  overlay = true,
  overlayOpacity = 0.5,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showPoster, setShowPoster] = useState<boolean>(() => isSlowNetworkConnection());
  const [hasError, setHasError] = useState(false);

  // Viewport-aware play/pause via IntersectionObserver
  useEffect(() => {
    // If we're showing poster (slow network or error), no need to observe
    if (showPoster || hasError) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // play() can fail due to browser policies; fail silently
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [showPoster, hasError]);

  // Handle video load error — gracefully fall back to poster
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // If on slow network or video errored, show poster image
  if (showPoster || hasError) {
    return (
      <div
        ref={containerRef}
        className={`relative aspect-video w-full overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Poster image as background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* Optional dark overlay */}
        {overlay && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onError={handleError}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* WebM source first for better compression support */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback */}
        <source src={src} type="video/mp4" />
      </video>

      {/* Optional dark overlay for text readability */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
