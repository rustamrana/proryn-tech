# Technical Design Document

## PRORYN TECH Enterprise Website

---

## Architecture

### High-Level Architecture

The PRORYN TECH website is a statically-generated Next.js 15 application using the App Router. All pages are pre-rendered at build time (SSG) with no runtime server dependency, served from a CDN edge network. Client-side interactivity (forms, animations, navigation state) is handled via React client components.

```
Browser
  └─▶ CDN Edge (Vercel / AWS CloudFront)
        └─▶ Static HTML + JS chunks (Next.js build output)
              ├─▶ React hydration (client components)
              ├─▶ Framer Motion (animations)
              └─▶ Form submissions → external API / email service
```

### Rendering Strategy

- **SSG (Static Site Generation)**: All marketing pages generated at build time via `generateStaticParams` and `export const dynamic = 'force-static'`.
- **Client Components**: Navigation scroll state, form handling, animations, accordion state.
- **Server Components** (default): All static content sections — maximum performance, zero JS for content.

### Folder Architecture

```
app/                  ← Next.js App Router (pages + metadata)
components/           ← All React components
  layout/             ← Navbar, Footer, MegaMenu
  sections/           ← Full page sections (Hero, Services, etc.)
  common/             ← Reusable primitives (ServiceCard, BlogCard, etc.)
  ui/                 ← shadcn/ui base components
lib/
  data/               ← Static typed content arrays (services, products, etc.)
  utils.ts            ← Shared utility functions
  constants.ts        ← Site-wide constants (company info, navigation)
types/index.ts        ← All shared TypeScript interfaces
hooks/                ← Custom React hooks
public/               ← Static assets (icons, manifest)
```

---

## Overview

This document describes the technical architecture and design decisions for the PRORYN TECH enterprise website — a premium, production-ready web application built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

The website serves as the primary digital presence for PRORYN TECH, targeting enterprise clients worldwide. It must achieve Lighthouse Performance ≥ 90, Accessibility ≥ 95, and Core Web Vitals within Google's "Good" thresholds.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Fonts | next/font/google (Inter, Poppins) |
| Form Handling | React Hook Form + Zod |
| Linting | ESLint + Prettier |
| Package Manager | pnpm |

---

## Project Structure

```
proryn-tech/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, nav, footer)
│   ├── page.tsx                  # Home page
│   ├── services/page.tsx
│   ├── products/page.tsx
│   ├── industries/page.tsx
│   ├── technologies/page.tsx
│   ├── about/page.tsx
│   ├── careers/page.tsx
│   ├── blogs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MegaMenu.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustIndicators.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── DevelopmentProcess.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BlogSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/                       # shadcn/ui base components
│   └── common/
│       ├── SectionHeader.tsx
│       ├── AnimatedCounter.tsx
│       ├── DashboardMockup.tsx
│       ├── ServiceCard.tsx
│       ├── ProductCard.tsx
│       ├── IndustryCard.tsx
│       ├── TestimonialCard.tsx
│       ├── BlogCard.tsx
│       ├── CaseStudyCard.tsx
│       └── FAQAccordion.tsx
├── lib/
│   ├── data/
│   │   ├── services.ts
│   │   ├── products.ts
│   │   ├── industries.ts
│   │   ├── testimonials.ts
│   │   ├── case-studies.ts
│   │   ├── blog-posts.ts
│   │   ├── tech-stack.ts
│   │   ├── faqs.ts
│   │   └── careers.ts
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useScrollPosition.ts
│   └── useIntersectionObserver.ts
├── types/
│   └── index.ts
└── public/
    ├── icons/
    └── images/
```


---

## Design System

### Color Tokens (tailwind.config.ts)

```ts
colors: {
  brand: {
    primary:    '#0F172A',   // Deep navy — backgrounds, text
    secondary:  '#2563EB',   // Royal blue — CTAs, links, accents
    accent:     '#06B6D4',   // Cyan — highlights, tags, badges
    background: '#F8FAFC',   // Off-white — page background
    card:       '#FFFFFF',   // White — card backgrounds
    border:     '#E2E8F0',   // Light gray — dividers, borders
  }
}
```

### Typography

- **Display / H1**: Poppins 700, 56–72px, line-height 1.1
- **H2**: Poppins 600, 36–48px, line-height 1.2
- **H3**: Poppins 600, 24–28px
- **Body**: Inter 400/500, 16–18px, line-height 1.6
- **Small / Caption**: Inter 400, 14px

### Spacing Scale

Tailwind's default scale. Section padding: `py-20` (80px) on desktop, `py-12` on mobile.

### Shadows

```ts
boxShadow: {
  card:    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  'card-hover': '0 10px 25px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)',
  hero:    '0 25px 60px rgba(15,23,42,0.15)',
}
```

### Animation Vocabulary (Framer Motion)

| Variant | Use Case | Duration |
|---------|----------|----------|
| `fadeUp` | Section entry, text reveal | 600ms |
| `fadeIn` | Overlay, backdrop | 400ms |
| `scaleUp` | Card hover, button press | 200ms |
| `staggerChildren` | Grid items, list items | 100ms stagger |
| `slideInLeft/Right` | Alternating content blocks | 500ms |
| `countUp` | Trust indicator numbers | 1500ms |

Standard easing: `[0.25, 0.1, 0.25, 1]` (ease-in-out cubic)

---

## Components and Interfaces

### Navbar

- Fixed, `z-50`, starts transparent over hero, transitions to `bg-white/95 backdrop-blur-md shadow-sm` after 10px scroll.
- Desktop: horizontal link row + mega-menu on Services/Products hover.
- Mobile: hamburger button → full-screen drawer with `AnimatePresence`.
- Logo: SVG text mark "PRORYN TECH" with accent dot.

### DashboardMockup (Hero visual)

Built entirely with Tailwind CSS + Framer Motion — no external images:
- Outer browser chrome frame with traffic light dots
- Sidebar navigation with icon placeholders
- Main content area with KPI cards (Revenue, Users, Orders, Growth)
- A mini line chart using SVG path
- Floating notification cards that drift with subtle `y` animation loop

### AnimatedCounter

Uses `useIntersectionObserver` to trigger once. Animates from 0 to target using `framer-motion`'s `useMotionValue` + `useTransform` + `animate()` API. Formats large numbers with "+" suffix.

### SectionHeader

```tsx
interface SectionHeaderProps {
  badge?: string;         // e.g. "Our Services"
  heading: string;        // H2 text
  subheading?: string;    // Optional paragraph below H2
  align?: 'left' | 'center';
  className?: string;
}
```

### ServiceCard

```tsx
interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href?: string;
}
```

Renders: icon container (secondary bg tint), title, description, feature tags, hover arrow link.

### ProductCard

```tsx
interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  modules?: string[];
  comingSoon?: boolean;
  featured?: boolean;
}
```

### TestimonialCard

```tsx
interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  rating: 4 | 5;
  quote: string;
  initials: string;
}
```

### FAQAccordion

Uses shadcn/ui `Accordion` primitive with `type="single"` (exclusive open). Each item: trigger with `ChevronDown` icon that rotates 180° on open.

---

## Page Designs

### Home Page (`/`)

Sections in order:
1. `<HeroSection />` — full-viewport, dark bg (#0F172A), white text
2. `<TrustIndicators />` — light bg strip, 6 animated counters
3. `<AboutSection />` — white bg, split layout
4. `<ServicesSection />` — off-white bg, 3-col card grid
5. `<ProductsSection />` — white bg, featured + grid
6. `<IndustriesSection />` — off-white bg, icon grid
7. `<WhyChooseUs />` — dark bg (#0F172A), icon cards
8. `<DevelopmentProcess />` — white bg, horizontal timeline
9. `<TechStackSection />` — off-white bg, logo grid
10. `<CaseStudies />` — white bg, 3-col cards
11. `<Testimonials />` — light blue tint bg, carousel
12. `<BlogSection />` — white bg, 3 cards + CTA
13. `<FaqSection />` — off-white bg, accordion
14. `<FinalCTA />` — gradient bg, dual CTAs

Alternating light/dark sections maintain visual rhythm and prevent monotony.

### Services Page (`/services`)

- Hero banner with service category pills
- 9 detailed service blocks in alternating left-right layout
- Sticky side TOC on desktop (scroll spy)
- Final CTA

### Products Page (`/products`)

- Full-width BusinessOS hero with interactive module tabs
- Module showcase: clicking a tab shows a mock UI screenshot/illustration for that module
- Coming-soon grid (2 rows × 3 cols on desktop)
- Feature comparison table

### About Page (`/about`)

- Hero with company tagline
- Stats row (same as trust indicators but different framing)
- Mission/Vision two-column block
- Core values icon grid
- Leadership team cards
- Company timeline (vertical on mobile, horizontal on desktop)
- Join Our Team CTA

### Careers Page (`/careers`)

- Hero: "Build the Future With Us"
- Open positions filter (by department)
- Job listing cards with expand-to-detail
- Benefits grid
- Culture/life photo-style illustration grid

### Blogs Page (`/blogs`)

- Hero with category filter tabs
- 3-column card grid (masonry-ish)
- Pagination or "Load More"

### Blog Detail (`/blogs/[slug]`)

- Full-width hero with title, author, date, read time
- Article body (rich text)
- Table of contents (sticky sidebar on desktop)
- Author bio card
- Related posts

### Contact Page (`/contact`)

- Split layout: form left, info right
- Contact form with React Hook Form + Zod validation
- Three contact channel cards (General, Sales, Support)
- Location info
- Book consultation scheduling section

---

## Data Models

All static content lives in `lib/data/` as typed TypeScript arrays. No CMS or API in v1 — data is co-located with the app for maximum performance (static generation).

### Type Definitions (`types/index.ts`)

```ts
export interface Service {
  id: string;
  icon: string;          // Lucide icon name
  title: string;
  description: string;
  features: string[];
  longDescription?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  modules?: string[];
  comingSoon: boolean;
  featured: boolean;
}

export interface Industry {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: 4 | 5;
  quote: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcomes: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;          // ISO date string
  readTime: number;      // minutes
  content?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  mode: 'Remote' | 'Onsite' | 'Hybrid';
  description: string;
}
```

---

## Routing

Using Next.js App Router. All routes are statically generated at build time using `generateStaticParams` where applicable (blog slugs).

| Route | Strategy |
|-------|----------|
| `/` | Static |
| `/services` | Static |
| `/products` | Static |
| `/industries` | Static |
| `/technologies` | Static |
| `/about` | Static |
| `/careers` | Static |
| `/blogs` | Static |
| `/blogs/[slug]` | Static (generateStaticParams) |
| `/contact` | Static + Client form |

---

## SEO Implementation

Each page exports a `generateMetadata()` function returning:
```ts
{
  title: '[Page] | PRORYN TECH - Enterprise Software Development',
  description: '...',  // max 160 chars, unique per page
  openGraph: { title, description, url, siteName, images },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: '...' }
}
```

`app/sitemap.ts` exports a `Sitemap` array with all static routes + dynamic blog slugs.
`app/robots.ts` allows all crawlers, references sitemap URL.

---

## Accessibility

- All interactive elements keyboard-navigable (Tab order, Enter/Space activation)
- `aria-label` on icon-only buttons
- `aria-expanded` on accordion triggers
- `aria-current="page"` on active nav links
- Focus trapping in mobile menu (focus-trap-react or custom)
- Skip-to-main-content link as first DOM element
- Color contrast ≥ 4.5:1 for all text (verified against brand palette)

---

## Performance Strategy

1. **Fonts**: `next/font/google` with `display: 'swap'`, subset to `latin`
2. **Images**: `next/image` with explicit `width`/`height`, `priority` on hero
3. **Code splitting**: Dynamic imports for below-fold page sections
4. **Animations**: Framer Motion `LazyMotion` with `domAnimation` feature bundle
5. **CSS**: Tailwind CSS purges unused styles at build; no runtime CSS-in-JS
6. **Caching**: Static pages served from CDN edge; headers set `Cache-Control: public, max-age=31536000, immutable` for assets


---

## Correctness Properties

These properties are verified by property-based tests in the test suite.

### Property 1: Navigation completeness

**Validates: Requirements 1.2, 1.5**

The navigation must render exactly 9 top-level links (Home, Services, Products, Industries, Technologies, About, Careers, Blogs, Contact) on every render regardless of viewport size.

### Property 2: Service data integrity

**Validates: Requirements 5.2, 5.3**

For every service object in `lib/data/services.ts`, the rendered ServiceCard must have a non-empty title, a description of at least 10 words, and at least one feature tag.

### Property 3: Product ordering invariant

**Validates: Requirements 6.2, 6.5**

In the ProductsSection, PRORYN BusinessOS (featured=true) must always be the first product rendered. All six coming-soon products must follow.

### Property 4: FAQ count bounds

**Validates: Requirements 14.1, 14.5**

The FAQ section must render a minimum of 8 and maximum of 10 accordion items. Each answer must contain at least 30 words.

### Property 5: Footer link completeness

**Validates: Requirements 16.1, 16.4, 16.6**

The footer must render all six social media icons and the copyright year 2026. All internal footer links must resolve to existing routes.

### Property 6: Animation duration bounds

**Validates: Requirements 25.3**

All Framer Motion transition durations defined in component files must be between 200ms (0.2s) and 800ms (0.8s).

### Property 7: TypeScript type safety

**Validates: Requirements 25.5**

No component file may contain implicit `any` types. The TypeScript build with `strict: true` must complete without errors.

### Property 8: Section count invariants

**Validates: Requirements 3.1, 7.1, 8.1, 9.1, 10.1**

- Trust Indicators: exactly 6 stat items
- Industries: exactly 10 industry cards
- Why Choose Us: exactly 8 differentiator cards
- Development Process: exactly 8 steps in sequential order
- Tech Stack: all 16 technologies present

The full property table for reference:

| ID | Property | Where Tested |
|----|----------|-------------|
| P1 | Navigation renders exactly 9 links | `Navbar.test.tsx` |
| P2 | Hero renders both CTA buttons | `HeroSection.test.tsx` |
| P3 | Trust indicators render exactly 6 metrics | `TrustIndicators.test.tsx` |
| P4 | Services section renders exactly 9 cards | `ServicesSection.test.tsx` |
| P5 | Each service card has title, description, ≥1 feature | `ServiceCard.test.tsx` |
| P6 | Products section has BusinessOS as first product | `ProductsSection.test.tsx` |
| P7 | BusinessOS lists all 10 modules | `ProductsSection.test.tsx` |
| P8 | Industries section renders exactly 10 items | `IndustriesSection.test.tsx` |
| P9 | Why Choose Us renders exactly 8 differentiators | `WhyChooseUs.test.tsx` |
| P10 | Development process renders 8 steps in correct order | `DevelopmentProcess.test.tsx` |
| P11 | Tech stack renders all 16 technologies | `TechStackSection.test.tsx` |
| P12 | FAQ renders 8–10 items, each answer ≥30 words | `FaqSection.test.tsx` |
| P13 | Footer renders copyright with year 2026 | `Footer.test.tsx` |
| P14 | Footer renders all 6 social icons | `Footer.test.tsx` |
| P15 | All TypeScript props are fully typed (no implicit any) | TypeScript build |
| P16 | Animation durations are 200ms–800ms | Component review |

---

## Error Handling

### Form Validation

Contact and Newsletter forms use `react-hook-form` + `zod`:
- Required fields show inline error messages on blur/submit
- Email fields validate format with Zod `.email()`
- Submit button disabled while `isSubmitting` is true
- On success: show success toast/message, reset form
- On network error: show error message with retry option

### 404 / Not Found

`app/not-found.tsx` renders a branded 404 page with navigation back to home.

### Navigation Errors

If a nav link route doesn't exist, Next.js falls through to `not-found.tsx`. All routes are statically verified at build time.

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

Each component in `components/common/` and `components/sections/` has a corresponding `.test.tsx` file.

**What is tested:**
- Renders without crashing
- Required props produce correct DOM output
- Conditional rendering (e.g., `comingSoon` badge appears when `comingSoon=true`)
- Form validation errors appear on invalid input
- Accessibility: all interactive elements have accessible names

### Property-Based Tests (fast-check)

For data-driven correctness properties listed above (P1–P14). Tests iterate over all data arrays and assert structural invariants.

### Integration Tests

- Navbar scroll behavior (mock `window.scrollY`)
- FAQ accordion exclusive-open behavior (click item 2 while item 1 is open → item 1 closes)
- Form submission flow (mock fetch, assert success/error states)

### Build-Time Checks

- `tsc --noEmit` for TypeScript correctness (P15)
- `eslint` for code quality
- Lighthouse CI for performance/accessibility scores (P16 targets: Performance ≥ 90, Accessibility ≥ 95)
