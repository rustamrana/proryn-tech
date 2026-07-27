import { event } from './ga4';

/**
 * Pre-defined GA4 event constants for consistent tracking
 * across the PRORYN TECH website.
 */
export const EVENTS = {
  CTA_CLICK: 'cta_click',
  FORM_SUBMIT: 'form_submit',
  CHATBOT_OPEN: 'chatbot_open',
  CHATBOT_MESSAGE: 'chatbot_message',
  DEMO_STEP: 'demo_step_complete',
  DEMO_COMPLETE: 'demo_complete',
  THEME_SWITCH: 'theme_switch',
} as const;

/**
 * Track a custom event with optional parameters.
 * Wrapper around ga4.event for convenience.
 */
export function trackEvent(name: string, params?: Record<string, string | number>): void {
  event(name, params);
}
