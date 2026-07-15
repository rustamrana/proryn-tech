# Implementation Plan: PRORYN TECH Enterprise Website

## Overview

This implementation plan covers the complete build of the PRORYN TECH enterprise website — 33 tasks organized in dependency order. The project scaffolds a Next.js 15 + React 19 + TypeScript application with Tailwind CSS, shadcn/ui, and Framer Motion. Work flows from foundation (scaffolding → types → hooks → components) through page assembly (home → inner pages) to finalization (SEO → accessibility → performance).

**Estimated scope:** ~33 tasks spanning project setup, 10 pages, 14 homepage sections, reusable component library, and production hardening.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": ["1"],
      "description": "Project scaffolding and configuration"
    },
    {
      "wave": 2,
      "tasks": ["2"],
      "description": "TypeScript types and static data",
      "dependsOn": ["1"]
    },
    {
      "wave": 3,
      "tasks": ["3"],
      "description": "Custom hooks",
      "dependsOn": ["2"]
    },
    {
      "wave": 4,
      "tasks": ["4"],
      "description": "Reusable common components",
      "dependsOn": ["3"]
    },
    {
      "wave": 5,
      "tasks": ["5", "6"],
      "description": "Layout components (Navbar and Footer) — parallel",
      "dependsOn": ["4"]
    },
    {
      "wave": 6,
      "tasks": ["7"],
      "description": "Root layout and global metadata",
      "dependsOn": ["5", "6"]
    },
    {
      "wave": 7,
      "tasks": ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"],
      "description": "All homepage sections — parallel",
      "dependsOn": ["7"]
    },
    {
      "wave": 8,
      "tasks": ["22"],
      "description": "Home page assembly",
      "dependsOn": ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]
    },
    {
      "wave": 9,
      "tasks": ["23", "24", "25", "26", "27", "28", "29", "30"],
      "description": "All inner pages — parallel",
      "dependsOn": ["22"]
    },
    {
      "wave": 10,
      "tasks": ["31"],
      "description": "SEO and metadata finalization",
      "dependsOn": ["23", "24", "25", "26", "27", "28", "29", "30"]
    },
    {
      "wave": 11,
      "tasks": ["32"],
      "description": "Accessibility audit and fixes",
      "dependsOn": ["31"]
    },
    {
      "wave": 12,
      "tasks": ["33"],
      "description": "Performance optimization and build verification",
      "dependsOn": ["32"]
    }
  ]
}
```

## Notes

- All tasks use the spec at `.kiro/specs/proryn-tech-website/`
- Data is static (no CMS/API in v1); all content lives in `lib/data/`
- Tasks 8–21 (homepage sections) can be parallelized once task 7 is complete
- Tasks 23–30 (inner pages) can be parallelized once task 22 is complete
- Tasks 31–33 must run sequentially after all pages are built
- The project uses pnpm as package manager
- Target: `pnpm build` succeeds with zero TypeScript and ESLint errors

## Tasks

- [x] 1. Project scaffolding and configuration
  - Initialize Next.js 15 project with TypeScript, Tailwind CSS, and pnpm
  - Install and configure shadcn/ui component library
  - Install Framer Motion, Lucide React, React Hook Form, Zod
  - Configure Tailwind with brand color tokens, custom shadows, and font variables
  - Set up next/font/google for Inter and Poppins with display:swap
  - Create folder structure: app/, components/layout/, components/sections/, components/common/, components/ui/, lib/data/, hooks/, types/
  - Configure TypeScript strict mode in tsconfig.json
  - Set up ESLint and Prettier with project rules
  - **Acceptance:** `pnpm build` succeeds with zero TypeScript errors; brand colors available as Tailwind classes

- [x] 2. TypeScript types and static data
  - Define all TypeScript interfaces in types/index.ts: Service, Product, Industry, Testimonial, CaseStudy, BlogPost, FAQ, JobListing, NavItem
  - Create lib/data/services.ts with all 9 service objects (id, icon, title, description, features, longDescription)
  - Create lib/data/products.ts with BusinessOS (featured, 10 modules) and 6 coming-soon products
  - Create lib/data/industries.ts with all 10 industries (icon, name, description)
  - Create lib/data/testimonials.ts with 5 professional client testimonials (name, role, company, rating, quote)
  - Create lib/data/case-studies.ts with 3 detailed case studies (industry, title, challenge, solution, technologies, 3+ outcomes each)
  - Create lib/data/blog-posts.ts with 6 blog post objects across all 6 categories
  - Create lib/data/tech-stack.ts with all 16 technologies grouped by category
  - Create lib/data/faqs.ts with 9 FAQ objects covering all required topics
  - Create lib/data/careers.ts with 4 job listings and 6 company benefits
  - Create lib/constants.ts with company info, navigation links, contact details, social links
  - **Acceptance:** All data files compile without errors; all arrays have correct item counts

- [x] 3. Custom hooks
  - Create hooks/useScrollPosition.ts — returns current scroll Y position, updates on scroll
  - Create hooks/useIntersectionObserver.ts — returns whether element is in viewport, accepts threshold option
  - **Acceptance:** Both hooks are typed, export correct return types, have no memory leaks (cleanup on unmount)

- [x] 4. Reusable common components
  - Create components/common/SectionHeader.tsx (badge, heading, subheading, align props)
  - Create components/common/AnimatedCounter.tsx (target number, suffix, label; count-up on viewport entry using useIntersectionObserver)
  - Create components/common/ServiceCard.tsx (icon, title, description, features array)
  - Create components/common/ProductCard.tsx (name, tagline, description, modules, comingSoon, featured props)
  - Create components/common/IndustryCard.tsx (icon, name, description)
  - Create components/common/TestimonialCard.tsx (name, role, company, rating, quote, initials)
  - Create components/common/BlogCard.tsx (category, title, excerpt, author, date, readTime, slug)
  - Create components/common/CaseStudyCard.tsx (industry, title, challenge, technologies, outcomes)
  - Create components/common/FAQAccordion.tsx (items array; uses shadcn Accordion, exclusive open, ChevronDown rotation)
  - Create components/common/DashboardMockup.tsx (CSS/SVG-only business dashboard with KPI cards, sidebar, mini chart, floating notification)
  - **Acceptance:** All components render without errors; props are fully typed (no implicit any); Storybook-style test renders pass

- [x] 5. Layout components — Navbar
  - Create components/layout/Navbar.tsx with sticky positioning and scroll-triggered background transition (transparent → white/blur after 10px using useScrollPosition)
  - Implement desktop nav with 9 links, Book Free Consultation CTA button, Explore Products secondary button
  - Implement mobile hamburger menu with Framer Motion AnimatePresence slide-down drawer
  - Implement MegaMenu dropdown for Services and Products on desktop hover
  - Add skip-to-main-content accessibility link as first DOM element
  - Add aria-current="page" on active route link (using Next.js usePathname)
  - Add aria-label on all icon-only buttons
  - Add focus trap in mobile menu (close on Escape key, Tab cycles within menu)
  - **Acceptance:** Navbar renders all 9 links; scroll behavior works; mobile menu opens/closes with animation; keyboard navigation works

- [x] 6. Layout components — Footer
  - Create components/layout/Footer.tsx with 5-column link grid (Company, Services, Products, Industries, Resources)
  - Add company info block (tagline, address, 3 email addresses, website)
  - Add newsletter subscription form with email input, Zod validation, success/error state
  - Add social media icons row (LinkedIn, GitHub, Facebook, Instagram, YouTube, X) using Lucide icons; all open in new tab
  - Add copyright line "© 2026 PRORYN TECH. All Rights Reserved."
  - On mobile: columns collapse to accordion sections
  - **Acceptance:** All 5 link columns present; newsletter form validates email; social icons present (×6); copyright text correct

- [x] 7. Root layout and global metadata
  - Create app/layout.tsx with HTML lang="en", font variable injection, Navbar and Footer wrappers
  - Create default OpenGraph and Twitter card metadata in layout
  - Create app/not-found.tsx with branded 404 page and back-to-home link
  - Create app/robots.ts allowing all crawlers
  - Create app/sitemap.ts listing all static routes + blog slugs
  - **Acceptance:** Build generates sitemap.xml and robots.txt; layout renders without errors

- [x] 8. Hero section
  - Create components/sections/HeroSection.tsx with dark (#0F172A) full-viewport background
  - Implement staggered Framer Motion fadeUp animation sequence: badge → headline → subheading → buttons → dashboard
  - Render headline "Engineering Intelligent Software for Modern Businesses." in Poppins bold
  - Render full subheading paragraph
  - Render "Book Free Consultation" primary button (links to /contact) and "Explore PRORYN BusinessOS" secondary button (links to /products)
  - Import and position DashboardMockup component on the right side with subtle float animation loop
  - Implement floating UI cards around the mockup with tech-themed micro-content
  - Make layout responsive: side-by-side on desktop, stacked on mobile
  - **Acceptance:** Both CTAs link correctly; dashboard mockup visible on desktop; all content animates in on load; mobile layout stacks correctly

- [x] 9. Trust indicators section
  - Create components/sections/TrustIndicators.tsx
  - Render 6 metrics: 10+/Years Experience, 100+/Projects Delivered, 99%/Client Satisfaction, Enterprise/Ready Solutions, AI Powered/Innovation, Dedicated/Support Team
  - Use AnimatedCounter for numerical metrics (10+, 100+, 99%)
  - Text-only display for non-numeric metrics with icon treatment
  - 6-column grid on desktop, 3-col tablet, 2-col mobile
  - Animate each item in with staggered fadeUp on viewport entry
  - **Acceptance:** All 6 metrics present; counter animations trigger on scroll-into-view; responsive grid works

- [x] 10. About section
  - Create components/sections/AboutSection.tsx
  - Split layout: text content left, visual/stats panel right
  - Heading "Building Technology That Powers Business Growth"
  - Three descriptive paragraphs covering company focus, specializations, and mission
  - Right panel: 2×2 mini-stat grid (years, projects, clients, technologies) with icons
  - "Learn More About Us" text link to /about
  - Animate in with slideInLeft (text) and slideInRight (visual) on viewport entry
  - **Acceptance:** Content renders; link navigates to /about; layout responsive

- [x] 11. Services section
  - Create components/sections/ServicesSection.tsx
  - SectionHeader with badge "Our Services", heading, subheading
  - Render all 9 ServiceCard components from lib/data/services.ts in a 3-col grid (desktop), 2-col (tablet), 1-col (mobile)
  - Card hover: shadow elevation + icon color accent transition (200ms)
  - Staggered fadeUp animation for cards on viewport entry
  - "View All Services" CTA linking to /services
  - **Acceptance:** All 9 cards render; hover animations work; grid is responsive; data comes from services.ts

- [x] 12. Products section
  - Create components/sections/ProductsSection.tsx
  - Featured BusinessOS card: full-width or prominent layout, product name, description, 10 module pills, "Learn More" + "Request Demo" CTAs
  - Coming-soon grid: 3-col (desktop), 2-col (tablet), 1-col (mobile) with "Coming Soon" badge
  - BusinessOS always renders first
  - "Request Demo" links to /contact?subject=demo
  - Animate in on viewport entry
  - **Acceptance:** BusinessOS appears first; all 6 coming-soon products present; module pills all 10 listed; CTAs link correctly

- [x] 13. Industries section
  - Create components/sections/IndustriesSection.tsx
  - 10 IndustryCard components from lib/data/industries.ts
  - 5-col grid desktop, 3-col tablet, 2-col mobile
  - Card hover: accent color transition, brief description reveal or tooltip
  - Staggered animation on viewport entry
  - **Acceptance:** All 10 industries present; grid responsive; hover state works

- [x] 14. Why Choose Us section
  - Create components/sections/WhyChooseUs.tsx
  - Dark background (#0F172A), white text
  - 8 differentiator cards in 4-col grid (desktop), 2-col (mobile)
  - Each card: icon (accent color), title, 1-2 sentence description
  - Staggered animation on viewport entry
  - Verify WCAG AA contrast (≥4.5:1) on dark background
  - **Acceptance:** All 8 differentiators present; dark bg with white text; contrast passes AA

- [x] 15. Development process section
  - Create components/sections/DevelopmentProcess.tsx
  - 8 sequential steps: Discovery → Requirement Analysis → UI/UX Design → Architecture → Development → Testing → Deployment → Support
  - Desktop: horizontal connected step flow with numbered circles and connecting lines
  - Mobile: vertical numbered list with connecting lines
  - Each step: step number, icon, title, brief description
  - Steps animate in sequentially with staggered delay on viewport entry
  - **Acceptance:** 8 steps in correct order; connecting lines visible; responsive layout; sequential animation

- [x] 16. Technology stack section
  - Create components/sections/TechStackSection.tsx
  - Group technologies by category: Backend (Java, Spring Boot, Node.js, TypeScript), Frontend (React, Angular), Mobile (Flutter), Databases (PostgreSQL, MySQL, Redis, RabbitMQ), Infrastructure (Docker, Kubernetes, GitHub), Cloud (AWS, Azure)
  - Each tech item: icon/logo treatment + name label
  - Category headers with subtle dividers
  - Fade-scale stagger animation on viewport entry
  - **Acceptance:** All 16 technologies present; grouped by category; animation works

- [x] 17. Case studies section
  - Create components/sections/CaseStudies.tsx
  - 3 CaseStudyCard components from lib/data/case-studies.ts
  - Each card: industry badge, project title, challenge summary, solution summary, technology tags, 3+ outcome metrics
  - "Read Full Case Study" link on each card
  - 3-col desktop, 1-col mobile
  - Card hover: elevated shadow + border color shift
  - **Acceptance:** 3 case studies render; each has ≥3 outcomes; hover state works; technologies all real

- [x] 18. Testimonials section
  - Create components/sections/Testimonials.tsx
  - 5 TestimonialCard components from lib/data/testimonials.ts
  - Desktop: 3-col grid; mobile: horizontal swipeable carousel (CSS scroll-snap or Embla carousel)
  - Each card: star rating, quote, avatar initials circle, name, role, company
  - Light blue-tint background section
  - Staggered animation on viewport entry
  - **Acceptance:** All 5 testimonials render; each has name, role, company, rating; mobile carousel works

- [x] 19. Blog section (homepage)
  - Create components/sections/BlogSection.tsx
  - 3 BlogCard components showing first 3 posts from lib/data/blog-posts.ts
  - Each card: category badge, title, author, date (human-readable), excerpt, read time, "Read More" link
  - 3-col desktop, 1-col mobile
  - Card hover: elevation + title color to secondary (#2563EB)
  - "View All Articles" CTA linking to /blogs
  - **Acceptance:** 3 cards render; dates are human-readable; links go to /blogs/[slug]; "View All" links to /blogs

- [x] 20. FAQ section
  - Create components/sections/FaqSection.tsx
  - 9 FAQ items from lib/data/faqs.ts using FAQAccordion component
  - Exclusive accordion (only one open at a time)
  - ChevronDown icon rotates 180° with smooth transition when open
  - Keyboard navigation: Tab moves between items, Enter/Space toggles
  - **Acceptance:** 9 items render; accordion is exclusive; keyboard nav works; answers are ≥30 words each

- [x] 21. Final CTA section
  - Create components/sections/FinalCTA.tsx
  - Dark gradient background (primary → secondary gradient)
  - Heading "Ready to Build Your Next Digital Product?"
  - Subheading "Partner with PRORYN TECH to transform your ideas into secure, scalable and intelligent software solutions."
  - "Book Free Consultation" primary button (→ /contact)
  - "Talk to Our Experts" secondary button (→ /contact?subject=expert)
  - FadeUp animation on viewport entry
  - **Acceptance:** Both CTAs present and link correctly; gradient background renders; animation works

- [x] 22. Home page assembly
  - Create app/page.tsx assembling all 14 section components in correct order
  - Add generateMetadata() with page-specific title and description
  - Use dynamic imports with React Suspense for below-fold sections (ServicesSection and below)
  - Set priority on hero background for LCP optimization
  - **Acceptance:** All sections render in correct order; page builds as static; metadata is present

- [x] 23. Services page
  - Create app/services/page.tsx with generateMetadata()
  - Hero banner section with "Technology Services That Drive Business Growth" heading and category pills
  - 9 detailed service sections in alternating left-right layout (even: image-left, odd: image-right)
  - Each section: expanded description, feature list, benefits, and "Get Started" CTA
  - Sticky table-of-contents sidebar on desktop (9 service links with scroll-spy active state)
  - Final CTA section at page bottom
  - **Acceptance:** All 9 services have dedicated sections; sticky TOC works; alternating layout on desktop

- [x] 24. Products page
  - Create app/products/page.tsx with generateMetadata()
  - Full-width BusinessOS hero with interactive module tabs (10 tabs: CRM, Sales, Inventory, HRMS, Projects, Helpdesk, Document Management, Workflow Automation, Analytics, AI Assistant)
  - Each tab shows a mock UI card/illustration representing that module
  - "Request Demo" and "Learn More" CTAs
  - Coming-soon products section (2×3 grid) with "Notify Me" CTAs
  - Feature highlight section comparing BusinessOS modules
  - **Acceptance:** All 10 module tabs render and switch; all 6 coming-soon products present; CTAs link correctly

- [x] 25. About page
  - Create app/about/page.tsx with generateMetadata()
  - Hero with company tagline and founding year
  - Company overview paragraphs (mission, vision, focus areas)
  - Mission & Vision two-column highlight block
  - Core values grid (6 values: Innovation, Integrity, Excellence, Collaboration, Customer-First, Security-First)
  - Leadership team cards (3 placeholder profiles with name, title, bio)
  - Company milestones timeline (5 milestones from founding to present)
  - "Join Our Team" CTA linking to /careers
  - **Acceptance:** All sections render; values grid has 6 items; timeline has 5 milestones; CTA links to /careers

- [x] 26. Careers page
  - Create app/careers/page.tsx with generateMetadata()
  - Hero section "Build the Future With Us" with culture tagline
  - Benefits grid: 6 employee benefits with icons and descriptions
  - Open positions: 4 job listing cards filterable by department (All / Engineering / Design / Management)
  - Each job card: title, department badge, location type, employment type, brief description, "View Details" button
  - Job detail expand/modal with full description and "Apply Now" button
  - "Life at PRORYN TECH" illustrated culture section
  - **Acceptance:** 4 job listings render; department filter works; job detail opens; benefits grid has 6 items

- [x] 27. Blogs page and blog detail
  - Create app/blogs/page.tsx with generateMetadata()
  - Category filter tabs (All + 6 categories); filtering shows matching posts
  - 6 BlogCard components in responsive grid
  - "Load More" button placeholder
  - Create app/blogs/[slug]/page.tsx with generateStaticParams() for all 6 slugs
  - Blog detail: full-width title hero, article body, author bio card, related posts (2 cards), social share buttons
  - **Acceptance:** Category filter works; 6 posts visible; each slug generates a valid static page; related posts render

- [x] 28. Contact page
  - Create app/contact/page.tsx with generateMetadata()
  - Split layout: contact form (left) + contact info (right)
  - Form fields: Full Name (required), Company Name, Email (required), Phone, Service of Interest (dropdown with 9 services), Message (required), Submit button
  - React Hook Form + Zod validation; inline error messages; submit button disabled while submitting
  - Success state: confirmation message after submit
  - Three contact channel cards (General/info@, Sales/sales@, Support/support@)
  - Office address, website display
  - Book consultation section with scheduling placeholder
  - **Acceptance:** Form validates all required fields; email format validated; error messages appear; success state shows on submit; all 3 email addresses displayed

- [x] 29. Industries page
  - Create app/industries/page.tsx with generateMetadata()
  - Hero section with "Industries We Serve" heading
  - Detailed section for each of 10 industries (icon, name, challenges we solve, solutions offered, relevant services)
  - Industry navigation grid at top linking to each section
  - Final CTA
  - **Acceptance:** All 10 industries have dedicated sections; anchor navigation works

- [x] 30. Technologies page
  - Create app/technologies/page.tsx with generateMetadata()
  - Hero section with technology leadership messaging
  - Full technology grid organized by category (same 6 categories as homepage section, expanded)
  - Each technology: icon/logo, name, brief description of expertise level/use case
  - Why our stack section (architectural rationale)
  - **Acceptance:** All 16 technologies have descriptions; categories are labeled; page builds statically

- [x] 31. SEO and metadata finalization
  - Add unique generateMetadata() to every page: /, /services, /products, /about, /industries, /technologies, /careers, /blogs, /blogs/[slug], /contact
  - Verify all titles follow "[Page] | PRORYN TECH - Enterprise Software Development Company" pattern
  - Verify all meta descriptions are ≤160 characters and unique
  - Add OpenGraph and Twitter Card metadata to all pages
  - Finalize app/sitemap.ts with all routes
  - Add JSON-LD structured data (Organization schema) in root layout
  - Verify all pages have exactly one H1 element
  - Verify all images have alt attributes
  - **Acceptance:** TypeScript build passes; sitemap.xml includes all routes; each page has unique title and description

- [x] 32. Accessibility audit and fixes
  - Add skip-to-main-content link in Navbar (visible on focus)
  - Audit all interactive elements for keyboard navigability; fix any missing tabIndex or role attributes
  - Add aria-label to all icon-only buttons and social links
  - Verify FAQAccordion has aria-expanded, aria-controls, aria-labelledby
  - Verify form inputs all have associated <label> elements
  - Add aria-live region for form submission success/error messages
  - Test color contrast for all text on dark backgrounds; fix any failures
  - **Acceptance:** No axe-core violations on any page; keyboard navigation works end-to-end

- [x] 33. Performance optimization and build verification
  - Wrap below-fold sections in dynamic() imports with Suspense fallback
  - Switch Framer Motion to LazyMotion with domAnimation feature bundle
  - Add loading="lazy" (via next/image) to all non-hero images
  - Add explicit width and height to all image components to prevent CLS
  - Run `pnpm build` and verify build completes without errors
  - Verify TypeScript strict build passes with zero errors
  - Verify ESLint passes with zero errors
  - **Acceptance:** `pnpm build` succeeds; no TypeScript errors; no ESLint errors; build output is static (no server functions)
