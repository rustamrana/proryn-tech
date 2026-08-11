# Design Document: PRORYN Website Restructure

## Overview

This design document defines the implementation plan for restructuring the PRORYN public website from a software engineering-focused site to an Enterprise Technology Company website representing three business verticals. The restructure updates information architecture, navigation, content hierarchy, page structure, and messaging while preserving the existing brand identity.

## Architecture

### Current State
- Next.js 15 App Router with pages at: /, /services, /products, /industries, /technologies, /about, /careers, /blogs, /contact
- Flat navigation defined in `lib/constants.ts` (NAV_LINKS)
- MegaMenu component supporting children arrays per NavItem
- Footer with 6-column layout (Company Info + 5 link columns)
- Homepage with 14 sections focused on software engineering

### Target State
- Next.js 15 App Router with restructured routes: /, /verticals/*, /products/*, /solutions, /industries/*, /resources/*, /company/*, /contact, /book-consultation
- Enhanced MegaMenu with grouped sub-items per category
- Footer with 5-column layout (Company Info + 4 link columns)
- Homepage with 12 sections representing all three verticals

## Components

### 1. Route Structure (App Directory)

Create new route directories in `app/`:

```
app/
├── page.tsx                          (Updated Homepage)
├── verticals/
│   ├── page.tsx                      (Verticals overview)
│   ├── software-studio/page.tsx
│   ├── consulting/page.tsx
│   └── talent/page.tsx
├── products/
│   ├── page.tsx                      (Products overview - update existing)
│   ├── businessos/page.tsx
│   ├── crm/page.tsx
│   ├── erp/page.tsx
│   ├── hrms/page.tsx
│   ├── inventory/page.tsx
│   ├── ai-employee/page.tsx
│   ├── website-builder/page.tsx
│   └── document-management/page.tsx
├── solutions/
│   └── page.tsx                      (Solutions by industry)
├── industries/
│   ├── page.tsx                      (Industries overview - update existing)
│   ├── manufacturing/page.tsx
│   ├── healthcare/page.tsx
│   ├── education/page.tsx
│   ├── government/page.tsx
│   ├── construction/page.tsx
│   ├── retail/page.tsx
│   ├── finance/page.tsx
│   └── real-estate/page.tsx
├── resources/
│   ├── page.tsx                      (Resources hub)
│   ├── documentation/page.tsx
│   ├── knowledge-base/page.tsx
│   ├── case-studies/page.tsx
│   └── support/page.tsx
├── company/
│   ├── page.tsx                      (Company overview)
│   ├── about/page.tsx                (Migrate from /about)
│   ├── leadership/page.tsx
│   ├── careers/page.tsx              (Migrate from /careers)
│   ├── partners/page.tsx
│   └── contact/page.tsx              (Migrate from /contact)
├── book-consultation/
│   └── page.tsx                      (Consultation booking page)
├── blogs/                            (Retain existing)
├── contact/                          (Redirect to /company/contact)
└── about/                            (Redirect to /company/about)
```

### 2. Navigation Constants Update (`lib/constants.ts`)

Update `NAV_LINKS` array to reflect new structure:

```typescript
export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Verticals",
    href: "/verticals",
    children: [
      { label: "Software Studio", href: "/verticals/software-studio" },
      { label: "Consulting Services", href: "/verticals/consulting" },
      { label: "Talent Services", href: "/verticals/talent" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "BusinessOS", href: "/products/businessos" },
      { label: "CRM", href: "/products/crm" },
      { label: "ERP", href: "/products/erp" },
      { label: "HRMS", href: "/products/hrms" },
      { label: "Inventory", href: "/products/inventory" },
      { label: "AI Employee", href: "/products/ai-employee" },
      { label: "Website Builder", href: "/products/website-builder" },
      { label: "Document Management", href: "/products/document-management" },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
      { label: "Government", href: "/industries/government" },
      { label: "Construction", href: "/industries/construction" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Real Estate", href: "/industries/real-estate" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Knowledge Base", href: "/resources/knowledge-base" },
      { label: "Blogs", href: "/blogs" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Support", href: "/resources/support" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company/about" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
      { label: "Partners", href: "/company/partners" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];
```

Additionally, add Sign In (external link to https://app.proryntech.com) and Book Consultation as CTA buttons outside the nav list, similar to the current "Explore Products" and "Book Free Consultation" pattern.

### 3. Updated Navbar Component (`components/layout/Navbar.tsx`)

**Changes:**
- Update `ALL_ROUTES` array to include new routes for prefetching
- Replace desktop CTA section: Remove "Explore Products" → Add "Sign In" (link to external app) + "Book Consultation" (primary CTA)
- Keep the existing MegaMenu component structure (it already supports children arrays)
- Update mobile menu CTA section to match new CTA hierarchy

### 4. Updated MegaMenu Component (`components/layout/MegaMenu.tsx`)

**Changes:**
- The existing MegaMenu already handles `item.children` rendering in a grid
- For the Verticals mega menu, enhance to show service descriptions alongside links
- Adjust grid columns based on number of children (already handles this with the 6-item threshold)
- No structural changes needed — the data-driven approach means updating constants is sufficient

### 5. Updated Footer Component (`components/layout/Footer.tsx`)

**Changes:**
- Restructure from 6-column to 5-column layout: Company Info | Verticals | Products | Industries | Resources
- Replace "Services" column with "Verticals" column (3 links)
- Update Products column to include all 8 products
- Update Industries column to include all 8 industries
- Update Resources column to include Documentation, Case Studies, Support, Blogs, Privacy, Terms
- Remove the separate "Company" column (company links move to Company Info section)

### 6. Updated Homepage (`app/page.tsx`)

**New section order:**
1. `HeroSection` — Updated tagline + CTAs
2. `TrustedBy` — Client logos (rename from TrustIndicators)
3. `BusinessVerticals` — NEW: Three vertical cards
4. `FeaturedProducts` — Updated products showcase
5. `BusinessOSHighlight` — NEW: Premium BusinessOS section
6. `IndustriesSection` — Existing, updated data
7. `TechExpertise` — Rename from TechStackSection
8. `CaseStudies` — Existing
9. `CustomerSuccess` — Rename/update from Testimonials
10. `WhyProryn` — Updated messaging (Technology → Consulting → Talent → Partnership)
11. `BookConsultationCTA` — Updated from FinalCTA
12. Footer (rendered via layout)

**Sections to remove from homepage:**
- AboutSection (moved to /company/about)
- ServicesSection (replaced by BusinessVerticals)
- DevelopmentProcess (moved to vertical pages)
- BlogSection (moved to /resources)
- FaqSection (moved to individual pages)

**New sections to create:**
- `components/sections/BusinessVerticals.tsx` — Three cards for Software Studio, Consulting, Talent
- `components/sections/BusinessOSHighlight.tsx` — Premium product showcase
- `components/sections/CustomerSuccess.tsx` — Enhanced testimonials + metrics

### 7. Vertical Pages

Each vertical page (`/verticals/software-studio`, `/verticals/consulting`, `/verticals/talent`) follows a template:
1. Page Hero with vertical-specific tagline
2. Value Proposition
3. Service List (detailed cards)
4. Process Overview
5. Case Studies (filtered by vertical)
6. Book Consultation CTA

### 8. Product Pages

Each product page (`/products/businessos`, etc.) follows a template:
1. Product Hero with product name and tagline
2. Feature Overview
3. Screenshots / Demo
4. Pricing / Plans (if applicable)
5. Request Demo CTA

### 9. Industry Pages

Each industry page (`/industries/manufacturing`, etc.) follows a template:
1. Industry Hero
2. Challenges addressed
3. Solutions offered (linking to relevant verticals/products)
4. Case Study
5. Book Consultation CTA

### 10. SEO Implementation

**Schema.org Markup:**
- Add Organization JSON-LD to root layout (`app/layout.tsx`)
- Add Product JSON-LD to each product page
- Add Service JSON-LD to each vertical page

**Sitemap Update:**
- Update `app/sitemap.ts` to include all new routes

**Meta Tags:**
- Each page exports `metadata` with unique title, description, and canonical URL
- Update root metadata to "Enterprise Technology Company"

### 11. Data Layer Updates

**New data files:**
- `lib/data/verticals.ts` — Vertical definitions (name, slug, description, services, benefits)
- `lib/data/products-extended.ts` — Extended product data (features, screenshots, pricing)
- `lib/data/industries-extended.ts` — Extended industry data (challenges, solutions, case studies)

**Updated data files:**
- `lib/constants.ts` — NAV_LINKS, TAGLINE, ALL_ROUTES
- `lib/data/services.ts` — Map existing services to verticals

### 12. Redirects

Add redirects in `next.config.js` or middleware:
- `/services` → `/verticals/software-studio`
- `/about` → `/company/about`
- `/careers` → `/company/careers`
- `/contact` → `/company/contact`
- `/technologies` → `/verticals/software-studio#technology`

## Correctness Properties

1. **Route Completeness**: All specified routes in the site map must resolve to valid pages (not 404).
2. **Navigation Consistency**: Every link in the Header, MegaMenu, and Footer must point to a valid internal route or the specified external URL (https://app.proryntech.com).
3. **Two-Click Reachability**: Every page in the site must be accessible within 2 navigation actions from the Homepage via Header/MegaMenu links.
4. **Section Order Invariant**: Homepage sections must render in the specified order (Hero → Trusted By → Verticals → Products → BusinessOS → Industries → Tech → Case Studies → Customer Success → Why PRORYN → CTA).
5. **CTA Hierarchy**: "Book Consultation" CTA must appear in Header, Hero, and final section on every page. "Sign In" must always link to https://app.proryntech.com.
6. **SEO Schema Presence**: Organization JSON-LD must be present on all pages. Product JSON-LD must be present on product pages. Service JSON-LD must be present on vertical pages.
7. **Footer Column Structure**: Footer must render exactly 5 column groups with the specified link sets.
8. **Brand Preservation**: No changes to logo component, color variables (primary: #0F172A, secondary: #2563EB, accent: #06B6D4), or font configuration (Inter, Poppins).

## Migration Strategy

### Phase 1: Foundation
1. Create new route directories and placeholder pages
2. Update `lib/constants.ts` with new NAV_LINKS
3. Create new data files for verticals, extended products, extended industries

### Phase 2: Navigation
4. Update Navbar component (CTAs, prefetch routes)
5. Update Footer component (5-column structure)
6. Verify MegaMenu works with new data

### Phase 3: Homepage
7. Create new homepage sections (BusinessVerticals, BusinessOSHighlight, CustomerSuccess)
8. Update HeroSection with new tagline and CTAs
9. Restructure homepage section order
10. Remove deprecated sections from homepage

### Phase 4: Content Pages
11. Build vertical page template and three vertical pages
12. Build product page template and product pages
13. Build industry page template and industry pages
14. Build resources hub and sub-pages
15. Build company section pages

### Phase 5: SEO & Polish
16. Implement Schema.org markup
17. Update sitemap.ts
18. Add redirects for old routes
19. Update meta tags across all pages
20. Final validation and testing
