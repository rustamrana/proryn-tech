# Implementation Plan: Advanced Portal Enhancements

## Overview

This implementation plan covers twelve feature modules across four phases, progressively enhancing the PRORYN TECH portal. Tasks are ordered so Phase 1 (no backend dependencies) ships first, followed by Phases 2–4. Each task builds on previous work and integrates non-destructively with the existing codebase.

## Tasks

- [ ] 1. Phase 1 Foundation — Dark Mode System
  - [x] 1.1 Install next-themes and configure ThemeProvider
    - Run `pnpm add next-themes`
    - Create `components/providers/ThemeProvider.tsx` with `ThemeContextValue` interface
    - Configure `attribute="class"` and `storageKey="proryn-theme"` with system default
    - Wrap root layout `app/layout.tsx` body content with ThemeProvider
    - Add dark color tokens to `tailwind.config.ts` under `colors.brand.dark`
    - _Requirements: 1.1, 1.4, 1.5_

  - [x] 1.2 Create ThemeToggle component and dark mode styles
    - Create `components/theme/ThemeToggle.tsx` with three-state cycle (light → dark → system)
    - Render Sun/Moon/Monitor icons from lucide-react based on current state
    - Add `aria-label`, `aria-live="polite"` for accessibility announcements
    - Place ThemeToggle in Navbar between desktop CTA buttons
    - Add theme transition CSS class in `globals.css` (300ms ease on bg/text/border)
    - _Requirements: 1.2, 1.3, 1.4, 1.6_

  - [~] 1.3 Apply dark mode variants to all existing components
    - Add `dark:` Tailwind variants to Navbar, Footer, MegaMenu, all section components
    - Update card components (`ServiceCard`, `ProductCard`, `BlogCard`, etc.) with `dark:bg-brand-dark-card dark:border-brand-dark-border`
    - Update text colors across all components with `dark:text-brand-dark-text` and `dark:text-brand-dark-muted`
    - Verify WCAG AA contrast ratios (4.5:1 minimum) for dark palette
    - _Requirements: 1.3, 1.6_

  - [ ]* 1.4 Write unit tests for ThemeProvider and ThemeToggle
    - Test three-state cycle logic (light→dark→system→light)
    - Test localStorage persistence and restoration
    - Test keyboard navigation and aria attributes on ThemeToggle
    - Test system preference fallback when localStorage unavailable
    - _Requirements: 1.1, 1.2, 1.5, 1.6_

- [ ] 2. Phase 1 Foundation — Micro-interactions and Scroll Animations
  - [x] 2.1 Create useReducedMotion hook and ScrollAnimator component
    - Create `hooks/useReducedMotion.ts` checking `prefers-reduced-motion` media query
    - Create `components/effects/ScrollAnimator.tsx` using Framer Motion `useInView` and `useScroll`
    - Implement staggered fade-in-up, fade-in, slide-left, slide-right animations
    - Support configurable `staggerDelay`, `threshold`, `parallax`, `parallaxSpeed` props
    - When reduced motion is active, render content statically without animations
    - _Requirements: 2.1, 2.2, 2.5_

  - [x] 2.2 Create MagneticButton and CardGlow effect components
    - Create `components/effects/MagneticButton.tsx` with cursor-tracking magnetic attraction within 20px radius
    - Reset position on mouse leave with spring easing
    - Create `components/effects/CardGlow.tsx` with radial gradient overlay following cursor
    - Disable both effects when `prefers-reduced-motion` is active
    - _Requirements: 2.3, 2.4, 2.5_

  - [~] 2.3 Integrate scroll animations into existing page sections
    - Wrap existing section components (ServicesSection, ProductsSection, CaseStudies, etc.) with ScrollAnimator
    - Apply MagneticButton to primary CTA buttons across pages
    - Apply CardGlow to interactive cards (ServiceCard, ProductCard, IndustryCard)
    - Add parallax to designated background elements
    - Ensure Lighthouse Performance score stays above 90 on mobile
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6_

  - [ ]* 2.4 Write unit tests for ScrollAnimator and MagneticButton
    - Test that ScrollAnimator respects `prefers-reduced-motion`
    - Test MagneticButton displacement stays within configured radius bounds
    - Test CardGlow gradient positioning follows mouse coordinates
    - _Requirements: 2.5, 2.6_

- [ ] 3. Phase 1 Foundation — 3D WebGL Hero Effects
  - [x] 3.1 Install Three.js dependencies and create ParticleCanvas component
    - Run `pnpm add @react-three/fiber @react-three/drei three` and `pnpm add -D @types/three`
    - Create `components/effects/ParticleCanvas.tsx` with `@react-three/fiber` Canvas
    - Implement animated 3D particle field using `Points` geometry and custom shader material
    - Add cursor reactivity via raycasting or pointer event uniforms
    - Cap at 800 particles desktop / 400 mobile based on `navigator.hardwareConcurrency` or screen width
    - Use delta-based animation in `useFrame` for frame-rate independence
    - _Requirements: 3.1, 3.2, 3.5_

  - [~] 3.2 Add performance optimizations and WebGL fallback
    - Use `IntersectionObserver` to toggle `frameloop="demand"` when hero is off-screen
    - Wrap ParticleCanvas in React error boundary for WebGL context loss fallback
    - If WebGL unsupported, render nothing (existing gradient stays visible)
    - Dynamically reduce particle count if FPS drops below 15
    - _Requirements: 3.3, 3.4, 3.5, 3.6_

  - [~] 3.3 Integrate ParticleCanvas into HeroSection
    - Load ParticleCanvas via `next/dynamic` with `ssr: false` in HeroSection
    - Position canvas absolutely behind hero content using z-index layering
    - Keep existing hero content (h1, CTAs, trust pills, DashboardMockup) unchanged above canvas
    - Verify LCP increase is under 500ms compared to current static background
    - _Requirements: 3.1, 3.6_

- [x] 4. Phase 1 Foundation — Video Backgrounds
  - [x] 4.1 Create VideoBackground component
    - Create `components/effects/VideoBackground.tsx` with autoPlay, muted, loop, playsInline
    - Implement IntersectionObserver for viewport-aware play/pause
    - Use `navigator.connection?.effectiveType` to detect slow/metered networks; show poster on 2g/slow-2g
    - Implement fallback chain: WebM → MP4 → poster image
    - Prevent CLS with fixed aspect-ratio container or explicit dimensions
    - Handle `onError` gracefully by showing poster image without layout shift
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 4.2 Create useNetworkStatus hook and integrate videos into sections
    - Create `hooks/useNetworkStatus.ts` wrapping Network Information API
    - Add video assets to `/public/videos/` (compressed MP4 + WebM, max 5MB each)
    - Integrate VideoBackground into selected sections (e.g., About, Services hero areas)
    - Add dark overlay option for text readability
    - _Requirements: 4.1, 4.3, 4.5_

- [~] 5. Checkpoint — Phase 1 Complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify dark mode works across all pages
  - Verify animations respect reduced motion preferences
  - Verify 3D hero renders and falls back gracefully
  - Verify video backgrounds play/pause correctly

- [ ] 6. Phase 2 Engagement — AI Chatbot Integration
  - [~] 6.1 Create ChatbotWidget UI components
    - Create `components/chatbot/ChatbotWidget.tsx` with floating trigger button (bottom-6 right-6)
    - Create `components/chatbot/ChatMessage.tsx` for individual message rendering
    - Create `components/chatbot/QuickReplies.tsx` for suggested quick-reply buttons
    - Implement open/close state with conversation panel, greeting message, and typing indicator
    - Add mobile-responsive near-full-screen panel for viewports < 768px
    - Implement focus trap, dialog role, Escape to close for accessibility
    - _Requirements: 5.1, 5.2, 5.7_

  - [~] 6.2 Implement FAQ pattern matching and chatbot data
    - Create `components/chatbot/chatbot-data.ts` with keyword-to-answer map for PRORYN services/products
    - Implement local pattern matching that responds within 500ms for known FAQ patterns
    - Store conversation in `sessionStorage` under `proryn-chat` key for same-session persistence
    - _Requirements: 5.3, 5.6_

  - [~] 6.3 Create chatbot API route with GPT integration
    - Run `pnpm add openai`
    - Create `app/api/chatbot/route.ts` with OpenAI API proxy
    - Add PRORYN-specific system prompt constraining responses to company context
    - Implement streaming response via ReadableStream for typing effect
    - Add rate limiting (max 20 messages per session)
    - On API failure, return fallback message with contact alternatives (email, phone)
    - Environment variable: `OPENAI_API_KEY`
    - _Requirements: 5.4, 5.5_

  - [~] 6.4 Integrate ChatbotWidget into root layout
    - Add `<ChatbotWidget />` as last child inside providers in `app/layout.tsx`
    - Load chatbot lazily (on first interaction or after 5s idle) via dynamic import
    - Ensure widget doesn't obstruct Navbar or primary CTAs on mobile
    - _Requirements: 5.1, 5.7_

  - [ ]* 6.5 Write unit tests for ChatbotWidget
    - Test FAQ pattern matching returns correct responses
    - Test message list rendering and conversation persistence
    - Test graceful error handling when API is unavailable
    - Test keyboard accessibility (focus trap, Escape to close)
    - _Requirements: 5.3, 5.4, 5.5, 5.6_

- [ ] 7. Phase 2 Engagement — Interactive Product Demos
  - [~] 7.1 Create ProductDemo component with step navigation
    - Create `components/demo/ProductDemo.tsx` with DemoStep interface and step navigation
    - Create `components/demo/DemoStep.tsx` rendering media with hotspot overlays
    - Create `components/demo/DemoHotspot.tsx` with pulsing circles and click-to-reveal overlays
    - Implement progress bar + Previous/Next buttons
    - Store current step in `sessionStorage` for same-session resume
    - _Requirements: 6.1, 6.2, 6.4_

  - [~] 7.2 Add completion flow and accessibility
    - Render completion summary card after final step with "Book a Live Consultation" CTA linking to `/contact`
    - Implement keyboard navigation: Tab through hotspots, Enter to activate, Escape to close overlay
    - Add `role="tabpanel"`, `aria-current="step"`, and live region announcements on step change
    - _Requirements: 6.3, 6.5_

  - [~] 7.3 Integrate ProductDemo into products page
    - Add demo section to products page with BusinessOS feature walkthrough
    - Create demo step data with hotspot positions and feature descriptions
    - Load ProductDemo via dynamic import to avoid blocking page load
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 7.4 Write unit tests for ProductDemo
    - Test step navigation (forward, backward, resume from sessionStorage)
    - Test hotspot click handlers open correct overlay content
    - Test completion CTA renders after final step
    - Test keyboard navigation and aria attributes
    - _Requirements: 6.4, 6.5_

- [~] 8. Checkpoint — Phase 2 Complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify chatbot opens, responds to FAQs, handles errors gracefully
  - Verify product demo is navigable via keyboard and tracks progress

- [ ] 9. Phase 3 Reach — Analytics Dashboard Integration
  - [~] 9.1 Create AnalyticsProvider and event tracking utilities
    - Create `components/providers/AnalyticsProvider.tsx` using `next/script` with `strategy="afterInteractive"`
    - Implement consent-first loading (default denied until cookie consent granted)
    - Track page views on route changes using `usePathname()` from Next.js
    - Create `lib/analytics/ga4.ts` with gtag initialization
    - Create `lib/analytics/events.ts` with `trackEvent()` function and pre-defined event constants
    - Wrap all gtag calls in try/catch for error resilience
    - Environment variable: `NEXT_PUBLIC_GA4_ID`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [~] 9.2 Integrate analytics events across features
    - Add AnalyticsProvider to root layout provider stack
    - Fire custom events for: CTA clicks, form submissions, chatbot interactions, demo step completions, theme switches
    - Ensure analytics does not fire without consent
    - Verify GA4 script failure doesn't produce console errors
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [ ]* 9.3 Write unit tests for AnalyticsProvider
    - Test that events are not fired without consent
    - Test correct event names and parameters are sent
    - Test graceful handling when gtag script is blocked
    - _Requirements: 7.4, 7.5_

- [ ] 10. Phase 3 Reach — Multi-language Support (i18n)
  - [~] 10.1 Install next-intl and configure i18n infrastructure
    - Run `pnpm add next-intl`
    - Create `lib/i18n/config.ts` with locales (`en`, `hi`) and defaultLocale
    - Create `lib/i18n/request.ts` for server-side locale loading
    - Create `middleware.ts` with locale detection from URL prefix, cookie, or Accept-Language header
    - Configure `next.config.ts` with next-intl plugin
    - _Requirements: 8.1, 8.6_

  - [~] 10.2 Create translation files and LocaleProvider
    - Create `messages/en.json` with all UI strings organized by section (~200-300 keys)
    - Create `messages/hi.json` with Hindi translations for all keys
    - Create `components/providers/LocaleProvider.tsx` wrapping next-intl's provider
    - Add LocaleProvider to root layout provider nesting order
    - _Requirements: 8.1, 8.2_

  - [~] 10.3 Set up Hindi font and LanguageSwitcher
    - Add `Noto Sans Devanagari` via `next/font/google` with devanagari subset
    - Apply font conditionally when locale is 'hi' with `line-height: 1.8`
    - Create `components/i18n/LanguageSwitcher.tsx` dropdown (EN/हिन्दी) in Navbar
    - Persist language selection in `NEXT_LOCALE` cookie
    - Set `lang` attribute on `<html>` element matching active locale
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

  - [~] 10.4 Migrate existing pages to i18n route structure
    - Create `app/[locale]/` route group mirroring existing routes
    - Replace hardcoded UI strings with `useTranslations()` calls in all components
    - Ensure navigation between locales preserves current page without full reload
    - Update URL path prefixes to reflect selected language (e.g., `/hi/about`)
    - _Requirements: 8.2, 8.5, 8.6_

  - [ ]* 10.5 Write unit tests for i18n
    - Test locale switching updates URL and persists cookie
    - Test fallback to English when translation key is missing
    - Test Hindi text renders with correct Devanagari font
    - _Requirements: 8.1, 8.2, 8.4_

- [ ] 11. Phase 3 Reach — Blog CMS Integration (Sanity)
  - [~] 11.1 Set up Sanity client and content types
    - Run `pnpm add @sanity/client @portabletext/react @sanity/image-url`
    - Create `lib/cms/client.ts` with Sanity client configuration
    - Create `lib/cms/types.ts` with `BlogPost`, `SanityImage`, and related interfaces
    - Create `lib/cms/queries.ts` with GROQ queries for blog listing and individual posts
    - Environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
    - _Requirements: 9.1, 9.2_

  - [~] 11.2 Build blog listing and post pages with ISR
    - Update `app/blogs/page.tsx` to fetch published posts from Sanity with `{ next: { revalidate: 60 } }`
    - Update `app/blogs/[slug]/page.tsx` to fetch full post content including rich text, images, metadata
    - Render blog content with Portable Text component and proper semantic HTML
    - Implement paginated grid on listing page
    - Show "Content may be outdated" banner when revalidation fails
    - _Requirements: 9.1, 9.2, 9.4, 9.5_

  - [~] 11.3 Create revalidation webhook and SEO metadata
    - Create `app/api/revalidate/route.ts` to receive Sanity webhook and call `revalidatePath`
    - Implement `generateMetadata()` in blog post page for dynamic OG/Twitter Card meta
    - Generate appropriate Open Graph images from CMS cover image data
    - _Requirements: 9.3, 9.6_

  - [ ]* 11.4 Write unit tests for CMS client
    - Test data transformation from Sanity response to typed BlogPost
    - Test fallback behavior when CMS is unreachable (serve cached content)
    - Test semantic HTML rendering of rich text blocks
    - _Requirements: 9.4, 9.5_

- [~] 12. Checkpoint — Phase 3 Complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify analytics fires events with consent, silent without
  - Verify language switching works end-to-end with Hindi font
  - Verify blog posts render from CMS with ISR revalidation

- [ ] 13. Phase 4 Platform — Progressive Web App
  - [~] 13.1 Configure PWA with next-pwa and web app manifest
    - Run `pnpm add @ducanh2912/next-pwa`
    - Create `app/manifest.ts` with PRORYN branding, icons, standalone display
    - Add PWA icon assets to `/public/icons/` (192x192, 512x512, maskable)
    - Configure `next.config.ts` to wrap with next-pwa for service worker generation
    - _Requirements: 10.3, 10.4_

  - [~] 13.2 Implement service worker caching strategies
    - Configure precache for app shell (HTML shells, critical CSS, fonts, brand images)
    - Set runtime cache: network-first for API routes, stale-while-revalidate for images/CMS content
    - Create custom offline fallback page at `/offline`
    - Implement cache size limit (50MB) with LRU eviction
    - _Requirements: 10.1, 10.2_

  - [~] 13.3 Add update notification and push notification registration
    - Implement workbox-based update detection with toast "New content available. Refresh?"
    - Add Web Push API registration for opt-in push notifications
    - Create API route to store push subscription endpoints
    - _Requirements: 10.5, 10.6_

  - [ ]* 13.4 Write integration tests for PWA
    - Test manifest is valid and service worker registers
    - Test offline page appears when network is unavailable
    - Test update notification shows when new SW version detected
    - _Requirements: 10.1, 10.2, 10.3_

- [ ] 14. Phase 4 Platform — Client Portal and Authentication
  - [~] 14.1 Install auth dependencies and create auth utilities
    - Run `pnpm add next-auth@5 bcrypt jose` and `pnpm add -D @types/bcrypt`
    - Create `lib/auth/session.ts` with session management (HTTP-only, Secure, SameSite=Strict cookies)
    - Create `lib/auth/csrf.ts` with CSRF token generation and validation
    - Configure 30-minute sliding window session expiry
    - Implement rate limiting (5 login attempts per 15 minutes per IP)
    - _Requirements: 11.5, 11.6_

  - [~] 14.2 Create auth API routes
    - Create `app/api/auth/login/route.ts` with credential validation and bcrypt comparison
    - Create `app/api/auth/logout/route.ts` for session destruction
    - Create `app/api/auth/session/route.ts` for session checking
    - Create `app/api/auth/reset-password/route.ts` with email verification and time-limited tokens (15 min)
    - Return generic "Invalid email or password" errors (no enumeration)
    - _Requirements: 11.1, 11.2, 11.3, 11.6, 11.7_

  - [~] 14.3 Create AuthProvider and login page UI
    - Create `components/providers/AuthProvider.tsx` with AuthContextValue interface
    - Create `components/portal/LoginForm.tsx` with email/password form and validation
    - Create `app/portal/login/page.tsx` with secure login form
    - Create `app/portal/reset-password/page.tsx` with email-based reset flow
    - Display generic error messages on invalid credentials
    - _Requirements: 11.1, 11.3, 11.7_

  - [~] 14.4 Build client dashboard
    - Create `app/portal/dashboard/page.tsx` with personalized project overview
    - Create `components/portal/DashboardLayout.tsx` with portal navigation
    - Create `components/portal/ProjectCard.tsx` displaying project status, milestones
    - Create `components/portal/MilestoneTimeline.tsx` with timeline visualization
    - Add deliverable download links
    - _Requirements: 11.4_

  - [~] 14.5 Add route protection middleware
    - Update `middleware.ts` to validate session cookie on `/portal/*` routes
    - Redirect unauthenticated users to `/portal/login`
    - Redirect to login with "Session expired" message on idle timeout
    - _Requirements: 11.2, 11.5_

  - [ ]* 14.6 Write unit tests for auth system
    - Test login form validation and generic error messages
    - Test session expiry after 30 minutes idle
    - Test CSRF token validation on mutation requests
    - Test rate limiting blocks after 5 failed attempts
    - _Requirements: 11.3, 11.5, 11.6_

- [ ] 15. Phase 4 Platform — Performance Optimization
  - [~] 15.1 Implement code splitting and lazy loading for all new features
    - Apply `next/dynamic` with `ssr: false` to ParticleCanvas, ChatbotWidget, ProductDemo
    - Add `loading="lazy"` to below-fold images across all pages
    - Ensure route-level code splitting (each page bundle loads only required JS)
    - Run `pnpm add -D @next/bundle-analyzer` and analyze bundle to identify large dependencies
    - _Requirements: 12.3, 12.4_

  - [~] 15.2 Optimize images, fonts, and third-party scripts
    - Ensure all images use Next.js `<Image>` with WebP/AVIF, `sizes` attribute, and priority for LCP images
    - Verify `next/font` is used with `display: swap` and subset to used characters
    - Confirm GA4 loaded `afterInteractive`; chatbot loaded on interaction
    - Verify server components are used for page-level data fetching where possible
    - _Requirements: 12.1, 12.2, 12.3_

  - [~] 15.3 Add Web Vitals monitoring and performance budget enforcement
    - Implement Web Vitals reporting callback → GA4 custom events
    - Set performance budgets: LCP < 2.5s, FID/INP < 100ms, CLS < 0.1
    - JS bundle per route: < 200KB gzipped (excluding shared framework)
    - Verify Lighthouse Mobile score ≥ 90 on all primary pages
    - _Requirements: 12.1, 12.5, 12.6_

  - [ ]* 15.4 Write performance regression tests
    - Configure Lighthouse CI assertions for Performance ≥ 90, Accessibility ≥ 95
    - Test CLS remains under 0.1 with video backgrounds and 3D hero
    - Verify new features don't degrade Core Web Vitals beyond thresholds
    - _Requirements: 12.1, 12.5, 12.6_

- [~] 16. Final Checkpoint — All Phases Complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all 12 feature modules integrated and functional
  - Confirm Core Web Vitals within acceptable thresholds
  - Validate accessibility across all new features

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation between phases
- Phase 1 has no backend dependencies and can be deployed immediately
- Phase 2 requires `OPENAI_API_KEY` environment variable
- Phase 3 requires Sanity project setup and `NEXT_PUBLIC_GA4_ID`
- Phase 4 requires auth backend setup and PWA icon assets
- All new components follow existing patterns: TypeScript, Tailwind CSS, Framer Motion
- Dark mode variants must be applied to ALL existing components in task 1.3

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "4.1"] },
    { "id": 1, "tasks": ["1.2", "2.2", "3.1", "4.2"] },
    { "id": 2, "tasks": ["1.3", "2.3", "3.2"] },
    { "id": 3, "tasks": ["1.4", "2.4", "3.3"] },
    { "id": 4, "tasks": ["6.1", "7.1", "9.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "7.2", "9.2"] },
    { "id": 6, "tasks": ["6.4", "6.5", "7.3", "7.4", "9.3", "10.1"] },
    { "id": 7, "tasks": ["10.2", "10.3", "11.1"] },
    { "id": 8, "tasks": ["10.4", "10.5", "11.2"] },
    { "id": 9, "tasks": ["11.3", "11.4"] },
    { "id": 10, "tasks": ["13.1", "14.1"] },
    { "id": 11, "tasks": ["13.2", "14.2"] },
    { "id": 12, "tasks": ["13.3", "13.4", "14.3"] },
    { "id": 13, "tasks": ["14.4", "14.5"] },
    { "id": 14, "tasks": ["14.6", "15.1"] },
    { "id": 15, "tasks": ["15.2", "15.3"] },
    { "id": 16, "tasks": ["15.4"] }
  ]
}
```
