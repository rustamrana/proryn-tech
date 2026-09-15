/**
 * Launch App configuration.
 *
 * The public Web Portal never embeds or duplicates BusinessOS. The "Launch App"
 * action is a single configurable transition:
 *
 *     Web Portal  ──▶  PRORYN Core Frontend  ──▶  BusinessOS
 *
 * The target base URL is resolved from the environment so it can differ per
 * deployment (local dev, staging, production) without code changes.
 *
 * Configure via `NEXT_PUBLIC_BUSINESSOS_URL`. In local development the Core
 * Frontend BusinessOS app runs on port 3001, so that is used as a safe default.
 */

import type { Application } from "@/types";

/** Development fallback — BusinessOS dev server (Core Frontend) runs here. */
const DEV_FALLBACK_URL = "http://localhost:3001";

/**
 * The configured BusinessOS base URL, or `null` when it is unset in a
 * non-development environment (so the UI can avoid rendering a broken link).
 */
export function getBusinessOsBaseUrl(): string | null {
  const configured = process.env.NEXT_PUBLIC_BUSINESSOS_URL?.trim();
  if (configured) {
    // Strip any trailing slash for predictable path joining.
    return configured.replace(/\/+$/, "");
  }
  // Only fall back to the dev server outside production so production never
  // silently points at localhost.
  if (process.env.NODE_ENV !== "production") {
    return DEV_FALLBACK_URL;
  }
  return null;
}

/**
 * Build the absolute launch URL for an application, or `null` when it cannot
 * be launched (unavailable, or no base URL configured in production).
 *
 * Returning `null` lets the UI show an appropriate status (e.g. "Coming Soon")
 * instead of an undefined/broken link.
 */
export function getLaunchUrl(app: Application): string | null {
  if (!app.isAvailable) return null;

  const base = getBusinessOsBaseUrl();
  if (!base) return null;

  const path = app.launchPath ?? "";
  const normalizedPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  return `${base}${normalizedPath}`;
}

/** Whether a valid launch target currently exists for the application. */
export function canLaunch(app: Application): boolean {
  return getLaunchUrl(app) !== null;
}
