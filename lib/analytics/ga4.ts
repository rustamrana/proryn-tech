declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

/**
 * Track a page view in GA4.
 * Silently no-ops if GA4 is not configured.
 */
export function pageview(url: string): void {
  try {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
      return;
    }
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  } catch {
    // Analytics should never break the app
  }
}

/**
 * Send a custom event to GA4.
 * Silently no-ops if GA4 is not configured.
 */
export function event(name: string, params?: Record<string, string | number>): void {
  try {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
      return;
    }
    window.gtag('event', name, params);
  } catch {
    // Analytics should never break the app
  }
}
