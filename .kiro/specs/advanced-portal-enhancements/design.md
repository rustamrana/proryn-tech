# Design Document: Advanced Portal Enhancements

## Overview

This design document outlines the technical architecture for twelve feature modules that enhance the PRORYN TECH corporate website. The features are organized into four implementation phases, each building upon the previous while maintaining the existing Next.js 15 App Router codebase integrity.

**Tech Stack Context:**
- Next.js 15 (App Router) with React 19
- TypeScript, Tailwind CSS 3.4, Framer Motion 11
- pnpm package manager, deployed on Netlify
- Existing brand color system: `darkMode: ["class"]` already configured in Tailwind

**Phased Delivery:**
- **Phase 1** (Foundation): Dark Mode, Micro-interactions, 3D Hero, Video Backgrounds
- **Phase 2** (Engagement): AI Chatbot, Interactive Product Demos
- **Phase 3** (Reach): Analytics, Multi-language (i18n), Blog CMS
- **Phase 4** (Platform): PWA, Client Portal, Performance Optimization

---

## Architecture

### High-Level Architecture Diagram

```mermaid
graph TD
    subgraph App Shell
        RootLayout[Root Layout]
        ThemeProvider[Theme Provider]
        LocaleProvider[Locale Provider]
        AnalyticsProvider[Analytics Provider]
        AuthProvider[Auth Provider]
    </subgraph>

    subgraph Phase 1
        DarkMode[Dark Mode System]
        ScrollAnimator[Scroll Animator]
        ParticleCanvas[3D Particle Canvas]
        VideoBackground[Video Background]
    end

    subgraph Phase 2
        ChatbotWidget[AI Chatbot Widget]
        ProductDemo[Interactive Demo]
    end

    subgraph Phase 3
        Analytics[GA4 Tracker]
        I18n[i18n Layer]
        CMS[CMS Client]
    end

    subgraph Phase 4
        PWA[Service Worker]
        ClientPortal[Auth + Dashboard]
        PerfOptimizer[Perf Optimizer]
    end

    RootLayout --> ThemeProvider
    ThemeProvider --> LocaleProvider
    LocaleProvider --> AnalyticsProvider
    AnalyticsProvider --> AuthProvider
    AuthProvider --> Pages[Page Components]
```

### Provider Nesting Order (Root Layout)

```
<ThemeProvider>
  <LocaleProvider>
    <AnalyticsProvider>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
      </AuthProvider>
    </AnalyticsProvider>
  </LocaleProvider>
</ThemeProvider>
```

### File/Folder Structure (New Additions)

```
Web_Portal/
├── app/
│   ├── [locale]/                    # i18n route group (Phase 3)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ... (mirrored routes)
│   ├── api/
│   │   ├── chatbot/
│   │   │   └── route.ts            # GPT-powered chat API
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── session/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── revalidate/
│   │   │   └── route.ts            # CMS webhook revalidation
│   │   └── analytics/
│   │       └── route.ts            # Server-side event proxy
│   ├── portal/                      # Client portal (Phase 4)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   └── reset-password/page.tsx
│   └── manifest.ts                  # PWA manifest (Phase 4)
├── components/
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   ├── LocaleProvider.tsx
│   │   ├── AnalyticsProvider.tsx
│   │   └── AuthProvider.tsx
│   ├── effects/
│   │   ├── ParticleCanvas.tsx       # 3D WebGL hero
│   │   ├── VideoBackground.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── CardGlow.tsx
│   │   └── ScrollAnimator.tsx
│   ├── chatbot/
│   │   ├── ChatbotWidget.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── QuickReplies.tsx
│   │   └── chatbot-data.ts         # FAQ patterns
│   ├── demo/
│   │   ├── ProductDemo.tsx
│   │   ├── DemoStep.tsx
│   │   └── DemoHotspot.tsx
│   ├── portal/
│   │   ├── LoginForm.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── ProjectCard.tsx
│   │   └── MilestoneTimeline.tsx
│   ├── i18n/
│   │   └── LanguageSwitcher.tsx
│   └── theme/
│       └── ThemeToggle.tsx
├── hooks/
│   ├── useTheme.ts
│   ├── useScrollAnimator.ts
│   ├── useReducedMotion.ts
│   ├── useNetworkStatus.ts
│   └── useAuth.ts
├── lib/
│   ├── cms/
│   │   ├── client.ts               # Sanity/Contentful client
│   │   ├── queries.ts
│   │   └── types.ts
│   ├── analytics/
│   │   ├── ga4.ts
│   │   └── events.ts
│   ├── auth/
│   │   ├── session.ts
│   │   ├── csrf.ts
│   │   └── middleware.ts
│   └── i18n/
│       ├── config.ts
│       └── request.ts
├── messages/                         # i18n translation files
│   ├── en.json
│   └── hi.json
├── middleware.ts                     # i18n routing + auth guards
└── public/
    ├── sw.js                        # Service worker (generated)
    ├── manifest.json
    ├── videos/                      # Video background assets
    └── icons/                       # PWA icons (192x192, 512x512)
```

---

## Components and Interfaces

### Phase 1: Foundation

#### 1.1 Dark Mode / Theme Switching

**ThemeProvider** (`components/providers/ThemeProvider.tsx`)

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
```

- Uses `next-themes` package (lightweight, handles SSR flash prevention)
- Wraps the app in root layout with `attribute="class"` to leverage existing `darkMode: ["class"]` in Tailwind config
- Persists to localStorage key `proryn-theme`
- Inserts a blocking `<script>` to prevent FOUC (flash of unstyled content)

**ThemeToggle** (`components/theme/ThemeToggle.tsx`)

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

- Three-state cycle: light → dark → system
- Renders Sun/Moon/Monitor icons from lucide-react
- Keyboard accessible (`button` element with `aria-label`)
- Announces state changes via `aria-live="polite"` region
- Placed in Navbar between desktop CTAs and hamburger button

**Dark Color Palette** (added to `tailwind.config.ts`):

```typescript
colors: {
  brand: {
    // Existing light values unchanged
    dark: {
      background: '#0F172A',
      card: '#1E293B',
      border: '#334155',
      text: '#F1F5F9',
      muted: '#94A3B8',
    }
  }
}
```

**CSS Transition**: Applied via `globals.css`:
```css
html.transitioning * {
  transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease !important;
}
```

#### 1.2 Micro-interactions & Scroll Animations

**ScrollAnimator** (`components/effects/ScrollAnimator.tsx`)

```typescript
interface ScrollAnimatorProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  staggerDelay?: number;    // ms between child animations (default: 100)
  threshold?: number;       // IntersectionObserver threshold (default: 0.1)
  parallax?: boolean;       // Enable parallax on element
  parallaxSpeed?: number;   // Parallax multiplier (default: 0.3)
}
```

- Built on Framer Motion's `useInView` and `useScroll` hooks
- Respects `prefers-reduced-motion` via `useReducedMotion()` hook — returns static content when active
- Uses `will-change: transform` sparingly and removes it after animation completes
- Wraps existing section components without structural changes

**MagneticButton** (`components/effects/MagneticButton.tsx`)

```typescript
interface MagneticButtonProps {
  children: React.ReactNode;
  radius?: number;          // Attraction radius in px (default: 20)
  strength?: number;        // Movement multiplier (default: 0.3)
}
```

- Tracks mouse position relative to button center
- Applies CSS `translate` within the radius boundary
- Resets on mouse leave with spring easing
- Disabled when `prefers-reduced-motion` is active

**CardGlow** (`components/effects/CardGlow.tsx`)

```typescript
interface CardGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;       // Default: brand-accent with low opacity
}
```

- Uses `onMouseMove` to position a radial gradient overlay following the cursor
- GPU-accelerated via CSS `background` property (no layout thrash)

#### 1.3 3D WebGL Hero Effects

**ParticleCanvas** (`components/effects/ParticleCanvas.tsx`)

```typescript
interface ParticleCanvasProps {
  particleCount?: number;    // Default: 800 (adjusts based on device)
  colorPrimary?: string;     // Default: brand-secondary (#2563EB)
  colorSecondary?: string;   // Default: brand-accent (#06B6D4)
  interactive?: boolean;     // Enable cursor reactivity (default: true)
  className?: string;
}
```

- Built with `@react-three/fiber` and `@react-three/drei`
- Renders a `<Canvas>` element positioned absolutely behind hero content
- Uses `Points` geometry with custom shader material for performant particle rendering
- Implements `useFrame` with delta-based animation (frame-rate independent)
- Cursor interaction via raycasting or pointer events passed to shader uniforms
- **Visibility optimization**: Uses `IntersectionObserver` to pause the render loop (`frameloop="demand"`) when hero is off-screen
- **WebGL fallback**: Wraps in error boundary; on WebGL context loss or unsupported browser, renders nothing (existing gradient background remains)
- **Performance budget**: Caps at 800 particles on desktop, 400 on mobile (detected via `navigator.hardwareConcurrency` or screen width)
- Loaded via `next/dynamic` with `ssr: false` to prevent server-side Three.js issues

**Dependencies**: `@react-three/fiber@^8.0`, `@react-three/drei@^9.0`, `three@^0.160`

#### 1.4 Video Backgrounds

**VideoBackground** (`components/effects/VideoBackground.tsx`)

```typescript
interface VideoBackgroundProps {
  src: string;              // Path to MP4 file
  webmSrc?: string;         // Optional WebM for better compression
  poster: string;           // Fallback poster image
  className?: string;
  overlay?: boolean;        // Dark overlay for text readability (default: true)
  overlayOpacity?: number;  // Default: 0.5
}
```

- Uses `<video>` element with `autoPlay`, `muted`, `loop`, `playsInline` attributes
- **Viewport-aware playback**: `IntersectionObserver` triggers `play()`/`pause()` based on visibility
- **Network-aware**: Uses `navigator.connection?.effectiveType` to detect slow connections; serves poster image on `2g` or `slow-2g`
- **Fallback chain**: WebM → MP4 → poster image
- **CLS prevention**: Container has fixed aspect ratio via CSS `aspect-ratio` or absolute positioning with explicit dimensions
- Videos stored in `/public/videos/` with max 5MB per clip, compressed via H.264 (MP4) and VP9 (WebM)

### Phase 2: Engagement

#### 2.1 AI Chatbot Integration

**ChatbotWidget** (`components/chatbot/ChatbotWidget.tsx`)

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  error: string | null;
}
```

- **Floating trigger button**: Fixed `bottom-6 right-6`, z-index above content but below modals
- **Mobile positioning**: On viewports < 768px, expands to near-full-screen panel to avoid obstructing navigation
- **FAQ matching**: Local pattern matching against `chatbot-data.ts` keyword map; responds in <500ms for known patterns
- **GPT fallback**: When no FAQ match, POSTs to `/api/chatbot/route.ts` which proxies to OpenAI API with PRORYN-specific system prompt
- **Session persistence**: Stores conversation in `sessionStorage` (cleared on tab close)
- **Error handling**: On API failure, displays "I'm having trouble connecting. You can reach us at info@proryntech.com or call +91 90397 30924"
- **Accessibility**: Dialog role, focus trap when open, Escape to close

**API Route** (`app/api/chatbot/route.ts`):
- Rate limiting: Max 20 messages per session
- System prompt constrains responses to PRORYN services/products context
- Streaming response via `ReadableStream` for typing effect
- Environment variable: `OPENAI_API_KEY`

#### 2.2 Interactive Product Demos

**ProductDemo** (`components/demo/ProductDemo.tsx`)

```typescript
interface DemoStep {
  id: string;
  title: string;
  description: string;
  hotspots: DemoHotspot[];
  media: { type: 'image' | 'animation'; src: string };
}

interface DemoHotspot {
  id: string;
  x: number;          // Percentage position
  y: number;
  label: string;
  content: string;    // Rich explanation text
}

interface ProductDemoProps {
  steps: DemoStep[];
  productName: string;
}
```

- **Step navigation**: Progress bar + Previous/Next buttons + keyboard (Tab through hotspots, Enter to activate, Escape to close overlay)
- **Hotspot rendering**: Pulsing circles positioned absolutely on the media; clicking opens a tooltip/overlay with feature explanation
- **Progress tracking**: Current step stored in `sessionStorage` for same-session resume
- **Completion CTA**: After final step, renders a summary card with "Book a Live Consultation" CTA linking to `/contact`
- **Accessibility**: `role="tabpanel"` for each step, `aria-current="step"` on active, announcements via live region on step change

### Phase 3: Reach

#### 3.1 Analytics Dashboard Integration

**AnalyticsProvider** (`components/providers/AnalyticsProvider.tsx`)

```typescript
interface AnalyticsConfig {
  measurementId: string;    // GA4 measurement ID
  consentGranted: boolean;
}
```

- **Script loading**: Uses `next/script` with `strategy="afterInteractive"` to load gtag.js after FCP
- **Consent-first**: Checks cookie consent state before initializing; defaults to denied
- **Page view tracking**: Uses `usePathname()` from Next.js to fire page_view on route changes
- **Custom events API** (`lib/analytics/events.ts`):

```typescript
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
}

// Pre-defined events
export const EVENTS = {
  CTA_CLICK: 'cta_click',
  FORM_SUBMIT: 'form_submit',
  CHATBOT_OPEN: 'chatbot_open',
  CHATBOT_MESSAGE: 'chatbot_message',
  DEMO_STEP: 'demo_step_complete',
  DEMO_COMPLETE: 'demo_complete',
  THEME_SWITCH: 'theme_switch',
} as const;
```

- **Error resilience**: All gtag calls wrapped in try/catch; script failure doesn't break the app
- Environment variable: `NEXT_PUBLIC_GA4_ID`

#### 3.2 Multi-language Support (i18n)

**Implementation**: `next-intl` library (recommended for App Router)


**Routing Strategy**: Prefix-based routing (`/en/about`, `/hi/about`)

```typescript
// lib/i18n/config.ts
export const locales = ['en', 'hi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
```

**Middleware** (`middleware.ts`):
- Detects locale from URL prefix, cookie, or `Accept-Language` header
- Redirects unprefixed paths to default locale (or persisted preference)
- Sets `lang` attribute on `<html>` element via layout

**Translation files** (`messages/en.json`, `messages/hi.json`):
- Flat key structure: `"nav.home": "Home"` / `"nav.home": "होम"`
- Organized by section: nav, hero, services, products, footer, common

**Hindi Font**: Add `Noto Sans Devanagari` via `next/font/google`:
```typescript
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
});
```
Applied conditionally when locale is 'hi' with increased `line-height: 1.8` for Devanagari readability.

**LanguageSwitcher** (`components/i18n/LanguageSwitcher.tsx`):
- Dropdown in Navbar showing EN/हिन्दी
- Uses `useRouter` and `usePathname` from `next-intl` to navigate without full reload
- Persists selection in cookie `NEXT_LOCALE`

**Dependencies**: `next-intl@^3.0`

#### 3.3 Blog CMS Integration

**CMS Choice**: Sanity.io (excellent Next.js integration, generous free tier, real-time previews)

**CMS Client** (`lib/cms/client.ts`):

```typescript
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,              // Use CDN for published content
});
```


**Content Model** (`lib/cms/types.ts`):

```typescript
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: PortableTextBlock[];  // Rich text
  coverImage: SanityImage;
  author: { name: string; avatar: SanityImage };
  categories: string[];
  publishedAt: string;
  seo: { metaTitle: string; metaDescription: string; ogImage: SanityImage };
}
```

**Data Fetching Strategy**:
- Blog listing: `fetch` with `{ next: { revalidate: 60 } }` (ISR, 60-second stale window)
- Individual posts: Same ISR or on-demand revalidation via webhook
- Webhook endpoint (`app/api/revalidate/route.ts`): Receives Sanity webhook, calls `revalidatePath('/blogs')` and `revalidatePath('/blogs/[slug]')`

**Fallback**: If CMS is unreachable, `fetch` returns stale cached data (Next.js ISR behavior). A subtle "Content may be outdated" banner shown when revalidation fails.

**SEO**: Dynamic `generateMetadata()` in `app/blogs/[slug]/page.tsx` pulls OG/Twitter meta from CMS post data.

**Dependencies**: `@sanity/client@^6.0`, `@portabletext/react@^3.0`, `@sanity/image-url@^1.0`

### Phase 4: Platform

#### 4.1 Progressive Web App (PWA)

**Implementation**: `next-pwa` package (or `@ducanh2912/next-pwa` for Next.js 15 compatibility)

**Web App Manifest** (`app/manifest.ts`):

```typescript
export default function manifest() {
  return {
    name: 'PRORYN TECH',
    short_name: 'PRORYN',
    description: 'Enterprise Software Development',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#2563EB',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
```


**Service Worker Strategy**:
- **Precache**: App shell (layout HTML, critical CSS, fonts, brand images)
- **Runtime cache**: Network-first for API routes, stale-while-revalidate for images and CMS content
- **Offline page**: Custom offline fallback page at `/offline`
- **Update notification**: `workbox`-based update detection; shows a toast "New content available. Refresh?" when a new SW version is detected

**Push Notifications** (opt-in):
- Registration via Web Push API
- Backend: API route to store subscription endpoints
- Sends notifications for blog posts, product updates (future scope)

**Dependencies**: `@ducanh2912/next-pwa@^5.0`

#### 4.2 Client Portal / Login

**Auth Strategy**: NextAuth.js (Auth.js v5) with Credentials provider

**AuthProvider** (`components/providers/AuthProvider.tsx`):

```typescript
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  milestones: Milestone[];
  deliverables: Deliverable[];
}
```

**Security Measures**:
- HTTP-only, Secure, SameSite=Strict cookies for session tokens
- CSRF token validation on all mutation endpoints
- Session expiry: 30 minutes of inactivity (sliding window)
- Rate limiting on login: 5 attempts per 15 minutes per IP
- Password reset via email with time-limited tokens (15 min expiry)
- Passwords hashed with bcrypt (cost factor 12)
- Generic error messages: "Invalid email or password" (no enumeration)


**Portal Pages**:
- `/portal/login` — Login form with email/password
- `/portal/dashboard` — Project overview cards, milestone timeline, deliverable download links
- `/portal/reset-password` — Email-based password reset flow

**Route Protection**: Middleware checks session cookie; redirects unauthenticated users to `/portal/login`

**Dependencies**: `next-auth@^5.0` (Auth.js), `bcrypt@^5.0`, `jose@^5.0` (JWT handling)

#### 4.3 Performance Optimization

**Strategy**: Systematic audit and optimization across all pages and new features.

**Key Techniques**:

| Technique | Implementation |
|-----------|---------------|
| Image optimization | Next.js `<Image>` with WebP/AVIF, `sizes` attribute, priority for LCP images |
| Code splitting | `next/dynamic` for heavy components (ParticleCanvas, ChatbotWidget, ProductDemo) |
| Font optimization | `next/font` with `display: swap`, subset to used characters |
| Bundle analysis | `@next/bundle-analyzer` to identify and eliminate large dependencies |
| Lazy loading | `loading="lazy"` on below-fold images; dynamic imports for Phase 1-3 features |
| Prefetching | `<Link prefetch>` already in use; extend to dynamic routes |
| CSS optimization | Tailwind CSS purging (already configured); minimize custom CSS |
| Third-party scripts | GA4 loaded `afterInteractive`; chatbot loaded on user interaction |
| Server components | Keep page-level components as RSC where possible; mark interactive parts with `'use client'` |
| Compression | Already enabled in `next.config.ts`; consider Brotli on CDN |

**Performance Budgets**:
- LCP: < 2.5s on 4G
- FID/INP: < 100ms
- CLS: < 0.1
- Lighthouse Mobile: ≥ 90
- JS bundle per route: < 200KB gzipped (excluding shared framework)

**Monitoring**: Web Vitals reporting via `next/web-vitals` callback → GA4 custom events

---

## Data Models

### Theme State

```typescript
type ThemeMode = 'light' | 'dark' | 'system';

// localStorage key: 'proryn-theme'
// Values stored: 'light' | 'dark' | 'system'
```

### Chatbot Session Data

```typescript
// sessionStorage key: 'proryn-chat'
interface ChatSession {
  messages: ChatMessage[];
  createdAt: number;
}
```

### Analytics Events Schema

```typescript
interface GA4Event {
  event_name: string;
  event_params: {
    page_path?: string;
    page_title?: string;
    cta_text?: string;
    cta_location?: string;
    form_name?: string;
    demo_step?: number;
    theme?: string;
    locale?: string;
    [key: string]: string | number | undefined;
  };
}
```

### i18n Translation Structure

```typescript
// messages/en.json (flat namespace)
{
  "nav.home": "Home",
  "nav.services": "Services",
  "hero.title": "Engineering Intelligent Software",
  "hero.subtitle": "for Modern Businesses.",
  "common.cta.consultation": "Book Free Consultation",
  "common.cta.products": "Explore Products",
  // ... ~200-300 keys per locale
}
```

### Blog Post (Sanity Schema)

```typescript
// Sanity document schema
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'body', type: 'blockContent' },  // Portable Text
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'categories', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'seo', type: 'object', fields: [...] },
  ]
}
```

### Auth Session

```typescript
interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    company: string;
  };
  expires: string;          // ISO timestamp
  csrfToken: string;
}

// Cookie: 'proryn-session' (HTTP-only, Secure, SameSite=Strict)
// Expiry: 30 minutes sliding window
```

### Client Portal Data

```typescript
interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
}

interface Deliverable {
  id: string;
  name: string;
  fileUrl: string;
  uploadedAt: string;
  size: number;             // bytes
}
```

---

## Error Handling

### Phase 1 Error Strategies

| Component | Error Scenario | Handling |
|-----------|---------------|----------|
| ThemeProvider | localStorage unavailable | Fall back to system preference; no persistence |
| ParticleCanvas | WebGL unsupported/context lost | Error boundary catches; renders nothing (gradient stays) |
| ParticleCanvas | Low FPS detected | Reduce particle count dynamically; disable if <15fps |
| VideoBackground | Video load failure | `onError` handler shows poster image |
| VideoBackground | Slow network detected | Show poster immediately; skip video load |
| ScrollAnimator | IntersectionObserver unsupported | Show content without animation (progressive enhancement) |

### Phase 2 Error Strategies

| Component | Error Scenario | Handling |
|-----------|---------------|----------|
| ChatbotWidget | OpenAI API timeout (>10s) | Show fallback message with contact alternatives |
| ChatbotWidget | Rate limit exceeded | Display "Please try again in a moment" |
| ChatbotWidget | Network offline | Disable send button; show offline indicator |
| ProductDemo | Media asset fails to load | Show placeholder with text-only explanation |

### Phase 3 Error Strategies

| Component | Error Scenario | Handling |
|-----------|---------------|----------|
| AnalyticsProvider | GA4 script blocked (ad blocker) | Silently skip; app functions normally |
| LocaleProvider | Translation key missing | Fall back to English string; log warning in dev |
| CMS Client | Sanity API unreachable | Serve ISR cached content; show stale indicator |
| CMS Client | Malformed content response | Render partial content; skip broken blocks |

### Phase 4 Error Strategies

| Component | Error Scenario | Handling |
|-----------|---------------|----------|
| Service Worker | Registration fails | App works normally without offline support |
| PWA | Cache storage full | Evict oldest cached items; continue serving network-first |
| AuthProvider | Session expired | Redirect to login with "Session expired" message |
| AuthProvider | CSRF validation fails | Reject request; prompt re-authentication |
| Login | Invalid credentials | Generic error; no email/password enumeration |
| Login | Account locked (5 failed attempts) | Show lockout message with retry time |

---

## Testing Strategy

### Why Property-Based Testing Does Not Apply

This feature set is primarily composed of:
- **UI rendering and interactions** (dark mode, animations, 3D effects, video backgrounds, chatbot UI, product demos)
- **External service integrations** (OpenAI API, Google Analytics, Sanity CMS, push notifications)
- **Infrastructure/configuration** (PWA service worker, i18n routing, auth session management)
- **Side-effect-heavy operations** (analytics tracking, cookie persistence, localStorage writes)

None of these features involve pure functions with large input spaces where universal properties would provide meaningful test coverage. Property-based testing is therefore **not appropriate** for this project, and the Correctness Properties section is omitted.

### Testing Approach

#### Unit Tests (Vitest + React Testing Library)

| Feature | Test Focus |
|---------|-----------|
| ThemeProvider | Cycle logic (light→dark→system), localStorage read/write, system preference detection |
| ThemeToggle | Renders correct icon per state, keyboard accessibility, aria attributes |
| ScrollAnimator | Respects `prefers-reduced-motion`, applies correct animation class |
| MagneticButton | Displacement calculation stays within radius bounds |
| ChatbotWidget | FAQ pattern matching returns correct responses, message list rendering |
| ProductDemo | Step navigation, hotspot click handlers, progress tracking |
| LanguageSwitcher | Locale switching updates URL, persists cookie |
| AnalyticsProvider | Does not fire events without consent, fires correct event names |
| LoginForm | Validation errors display, submit calls API, generic error messages |
| CMS Client | Data transformation from Sanity response to typed BlogPost |

#### Integration Tests (Playwright)

| Feature | Test Focus |
|---------|-----------|
| Dark Mode | Full page renders correctly in both themes; no FOUC on reload |
| i18n | Navigation between locales preserves page; Hindi text renders with correct font |
| Blog CMS | Blog listing renders posts; individual post page displays rich content |
| Client Portal | Login flow, dashboard access, session expiry redirect |
| PWA | Manifest is valid; service worker registers; offline page appears |

#### Visual Regression Tests (Playwright Screenshots)

- Capture key pages in light and dark mode
- Compare Hindi and English layouts for spacing/overflow issues
- Video background sections with and without video loaded

#### Performance Tests (Lighthouse CI)

- Automated Lighthouse runs in CI for all primary pages
- Assert scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90
- Monitor CLS, LCP, FID/INP against budgets defined in Performance Optimization

#### Test Tooling

- **Unit/Component**: `vitest` + `@testing-library/react` + `jsdom`
- **E2E/Integration**: `playwright`
- **Visual**: Playwright screenshot comparisons
- **Performance**: `lighthouse-ci` in GitHub Actions

---

## Package Dependencies Summary

### Phase 1 (New Dependencies)

```json
{
  "next-themes": "^0.4.0",
  "@react-three/fiber": "^8.0.0",
  "@react-three/drei": "^9.0.0",
  "three": "^0.160.0",
  "@types/three": "^0.160.0"
}
```

### Phase 2 (New Dependencies)

```json
{
  "openai": "^4.0.0"
}
```

### Phase 3 (New Dependencies)

```json
{
  "next-intl": "^3.0.0",
  "@sanity/client": "^6.0.0",
  "@portabletext/react": "^3.0.0",
  "@sanity/image-url": "^1.0.0"
}
```

### Phase 4 (New Dependencies)

```json
{
  "@ducanh2912/next-pwa": "^5.0.0",
  "next-auth": "^5.0.0",
  "bcrypt": "^5.0.0",
  "@types/bcrypt": "^5.0.0",
  "jose": "^5.0.0"
}
```

### Dev Dependencies (All Phases)

```json
{
  "vitest": "^2.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "jsdom": "^25.0.0",
  "playwright": "^1.45.0",
  "@playwright/test": "^1.45.0",
  "@next/bundle-analyzer": "^15.0.0"
}
```

---

## Integration Points with Existing Code

### Root Layout (`app/layout.tsx`)

- Wrap `<body>` content with `<ThemeProvider>` (suppresses hydration mismatch via `next-themes`)
- Add `<ChatbotWidget />` as last child inside providers (Phase 2)
- Conditionally apply Hindi font variable when locale is 'hi'

### Navbar (`components/layout/Navbar.tsx`)

- Add `<ThemeToggle />` between desktop CTA buttons
- Add `<LanguageSwitcher />` in desktop nav area
- Update color classes to use dark-mode variants (`dark:text-white`, `dark:bg-slate-900`)

### HeroSection (`components/sections/HeroSection.tsx`)

- Replace static gradient background divs with `<ParticleCanvas />` (dynamic import, client-only)
- Keep existing content (h1, CTAs, trust pills) layered above the canvas via z-index
- Existing `DashboardMockup` component remains unchanged

### Tailwind Config (`tailwind.config.ts`)

- Add dark color tokens under `colors.brand.dark.*`
- `darkMode: ["class"]` already configured — no change needed
- Add font-family entry for Devanagari font variable

### globals.css

- Add dark mode base styles: `html.dark body { @apply bg-brand-dark-background text-brand-dark-text; }`
- Add theme transition class
- Add reduced-motion media query overrides

### next.config.ts

- Add `next-pwa` wrapper for service worker generation (Phase 4)
- Add Sanity image domain to `images.remotePatterns` (Phase 3)
- Add `next-intl` plugin configuration (Phase 3)

### middleware.ts (New File)

- i18n locale detection and redirect logic
- Auth session validation for `/portal/*` routes
- Combines both concerns in a single middleware with path-based branching

### Existing Components (All Sections/Cards)

- Add `dark:` Tailwind variants to all color utilities
- No structural changes; purely additive class modifications
- Cards: `dark:bg-brand-dark-card dark:border-brand-dark-border`
- Text: `dark:text-brand-dark-text`, `dark:text-brand-dark-muted`

---

## Performance Considerations

### Critical Rendering Path

1. **ParticleCanvas**: Loaded via `next/dynamic({ ssr: false })` — zero impact on SSR/initial HTML
2. **ChatbotWidget**: Loaded on first user interaction (click/hover) or after 5s idle, not on initial paint
3. **Three.js bundle**: ~150KB gzipped; loaded only on pages with hero (homepage). Tree-shaken via specific imports.
4. **Video files**: Not fetched until section enters viewport (IntersectionObserver trigger)
5. **GA4 script**: `afterInteractive` strategy; no blocking of FCP/LCP

### Bundle Size Management

- Three.js: Import only `Points`, `BufferGeometry`, `ShaderMaterial` — avoid importing full library
- Framer Motion: Already in project; no additional cost for scroll animations
- next-intl: ~5KB gzipped runtime
- next-themes: ~1KB gzipped
- Sanity client: ~8KB gzipped (used only in server components)

### Memory & GPU

- ParticleCanvas pauses render loop when offscreen (saves GPU cycles)
- Video elements pause when offscreen (saves memory bandwidth)
- ChatbotWidget destroys DOM when closed on mobile (saves memory)
- Service worker cache limited to 50MB with LRU eviction

### Network

- Videos: max 5MB each, served from CDN with Cache-Control headers
- Images: Next.js automatic WebP/AVIF conversion with responsive srcset
- Fonts: Preloaded critical subset; full character sets loaded async
- API calls: Debounced chatbot input; batched analytics events

