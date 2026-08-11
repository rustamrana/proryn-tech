# Tasks: PRORYN Website Restructure

## Phase 1: Foundation — Data & Route Structure

- [ ] 1.1 Create `lib/data/verticals.ts` with definitions for Software Studio, Consulting Services, and Talent Services (name, slug, description, services array, benefits array, icon)
- [ ] 1.2 Create `lib/data/products-extended.ts` with extended product data for all 8 products (BusinessOS, CRM, ERP, HRMS, Inventory, AI Employee, Website Builder, Document Management) including features, description, and CTA
- [ ] 1.3 Create `lib/data/industries-extended.ts` with extended industry data for all 8 industries including challenges, solutions, and related verticals/products
- [ ] 1.4 Update `lib/constants.ts` — Replace NAV_LINKS with new navigation structure (Home, Verticals, Products, Solutions, Industries, Resources, Company), update TAGLINE, add SIGN_IN_URL constant
- [ ] 1.5 Create route directories with placeholder pages: `app/verticals/page.tsx`, `app/verticals/software-studio/page.tsx`, `app/verticals/consulting/page.tsx`, `app/verticals/talent/page.tsx`
- [ ] 1.6 Create route directories with placeholder pages: `app/products/businessos/page.tsx`, `app/products/crm/page.tsx`, `app/products/erp/page.tsx`, `app/products/hrms/page.tsx`, `app/products/inventory/page.tsx`, `app/products/ai-employee/page.tsx`, `app/products/website-builder/page.tsx`, `app/products/document-management/page.tsx`
- [ ] 1.7 Create route directories with placeholder pages: `app/industries/manufacturing/page.tsx`, `app/industries/healthcare/page.tsx`, `app/industries/education/page.tsx`, `app/industries/government/page.tsx`, `app/industries/construction/page.tsx`, `app/industries/retail/page.tsx`, `app/industries/finance/page.tsx`, `app/industries/real-estate/page.tsx`
- [ ] 1.8 Create route directories with placeholder pages: `app/resources/page.tsx`, `app/resources/documentation/page.tsx`, `app/resources/knowledge-base/page.tsx`, `app/resources/case-studies/page.tsx`, `app/resources/support/page.tsx`
- [ ] 1.9 Create route directories with placeholder pages: `app/company/page.tsx`, `app/company/about/page.tsx`, `app/company/leadership/page.tsx`, `app/company/careers/page.tsx`, `app/company/partners/page.tsx`, `app/company/contact/page.tsx`
- [ ] 1.10 Create `app/book-consultation/page.tsx` with consultation booking form/CTA page
- [ ] 1.11 Create `app/solutions/page.tsx` with solutions by industry overview page

## Phase 2: Navigation — Header, MegaMenu, Footer

- [ ] 2.1 Update `components/layout/Navbar.tsx` — Replace desktop CTAs with "Sign In" (external link to https://app.proryntech.com) and "Book Consultation" (primary CTA button linking to /book-consultation), update ALL_ROUTES for prefetching
- [ ] 2.2 Update `components/layout/Navbar.tsx` — Update mobile menu CTA section to show Sign In and Book Consultation buttons with correct hierarchy
- [ ] 2.3 Update `components/layout/MegaMenu.tsx` — Enhance to display brief descriptions for Verticals sub-items and handle the expanded product list gracefully
- [ ] 2.4 Update `components/layout/Footer.tsx` — Restructure to 5-column layout: Column 1 (Company Info, Contact, Social, Newsletter), Column 2 (Business Verticals links), Column 3 (Products links), Column 4 (Industries links), Column 5 (Resources links including Privacy/Terms)
- [ ] 2.5 Verify navigation renders correctly — all mega menu dropdowns work, all links resolve, Sign In redirects to external URL

## Phase 3: Homepage Restructure

- [ ] 3.1 Update `components/sections/HeroSection.tsx` — Change tagline to "Technology. Consulting. Talent. One Partner for Digital Growth." with primary CTA "Book Consultation" and secondary CTA "Explore Services"
- [ ] 3.2 Update `components/sections/TrustIndicators.tsx` — Rename/update to "Trusted By" section with client logos
- [ ] 3.3 Create `components/sections/BusinessVerticals.tsx` — Three cards for Software Studio, Consulting Services, Talent Services, each with overview, services list, and benefits
- [ ] 3.4 Update `components/sections/ProductsSection.tsx` — Showcase all 8 products as "Featured Products" section
- [ ] 3.5 Create `components/sections/BusinessOSHighlight.tsx` — Premium BusinessOS section with detailed feature overview, screenshots placeholder, and dedicated "Explore BusinessOS" CTA
- [ ] 3.6 Update `components/sections/IndustriesSection.tsx` — Display 8 target industries with updated cards linking to individual industry pages
- [ ] 3.7 Update `components/sections/TechStackSection.tsx` — Rename to "Technology Expertise" with updated messaging framing tech as a capability across all verticals
- [ ] 3.8 Create `components/sections/CustomerSuccess.tsx` — Enhanced testimonials section with client outcomes and success metrics
- [ ] 3.9 Update `components/sections/WhyChooseUs.tsx` — Reframe as "Why PRORYN" with integrated value proposition: Technology → Consulting → Talent → Partnership
- [ ] 3.10 Update `components/sections/FinalCTA.tsx` — Reframe as "Book Consultation" CTA section with enterprise messaging
- [ ] 3.11 Update `app/page.tsx` — Restructure homepage to render sections in new order: Hero, Trusted By, Business Verticals, Featured Products, BusinessOS Highlight, Industries, Technology Expertise, Case Studies, Customer Success, Why PRORYN, Book Consultation CTA. Remove AboutSection, ServicesSection, DevelopmentProcess, BlogSection, FaqSection from homepage.
- [ ] 3.12 Update homepage metadata — Change title to "PRORYN TECH — Enterprise Technology Company" and description to reflect all three verticals

## Phase 4: Content Pages — Verticals

- [ ] 4.1 Create vertical page template component `components/templates/VerticalPageTemplate.tsx` with sections: Hero, Value Proposition, Service List, Process Overview, Case Studies, Book Consultation CTA
- [ ] 4.2 Build `app/verticals/software-studio/page.tsx` using template with Software Studio data (custom development, enterprise apps, AI, SaaS)
- [ ] 4.3 Build `app/verticals/consulting/page.tsx` using template with Consulting Services data (digital transformation, architecture, advisory)
- [ ] 4.4 Build `app/verticals/talent/page.tsx` using template with Talent Services data (hiring, staffing, resource augmentation)
- [ ] 4.5 Build `app/verticals/page.tsx` overview page with cards linking to all three verticals

## Phase 5: Content Pages — Products

- [ ] 5.1 Create product page template component `components/templates/ProductPageTemplate.tsx` with sections: Hero, Feature Overview, Screenshots/Demo, Request Demo CTA
- [ ] 5.2 Build `app/products/businessos/page.tsx` with premium product page (expanded features, integrations, enterprise-grade messaging)
- [ ] 5.3 Build remaining product pages (CRM, ERP, HRMS, Inventory, AI Employee, Website Builder, Document Management) using template with data from `products-extended.ts`
- [ ] 5.4 Update `app/products/page.tsx` overview to showcase all 8 products with cards linking to individual pages

## Phase 6: Content Pages — Industries

- [ ] 6.1 Create industry page template component `components/templates/IndustryPageTemplate.tsx` with sections: Hero, Challenges, Solutions, Case Study, Book Consultation CTA
- [ ] 6.2 Build all 8 industry pages (Manufacturing, Healthcare, Education, Government, Construction, Retail, Finance, Real Estate) using template with data from `industries-extended.ts`
- [ ] 6.3 Update `app/industries/page.tsx` overview to showcase all 8 industries with cards linking to individual pages

## Phase 7: Content Pages — Resources & Company

- [ ] 7.1 Build `app/resources/page.tsx` as resources hub with links to Documentation, Knowledge Base, Blogs, Case Studies, Support
- [ ] 7.2 Build resource sub-pages (documentation, knowledge-base, case-studies, support) with placeholder content
- [ ] 7.3 Build `app/company/page.tsx` as company overview
- [ ] 7.4 Migrate content from existing `app/about/page.tsx` to `app/company/about/page.tsx`
- [ ] 7.5 Build `app/company/leadership/page.tsx` with leadership team section
- [ ] 7.6 Migrate content from existing `app/careers/page.tsx` to `app/company/careers/page.tsx`
- [ ] 7.7 Build `app/company/partners/page.tsx` with partner ecosystem information
- [ ] 7.8 Migrate content from existing `app/contact/page.tsx` to `app/company/contact/page.tsx`
- [ ] 7.9 Build `app/book-consultation/page.tsx` with consultation booking form and messaging

## Phase 8: SEO, Redirects & Finalization

- [ ] 8.1 Add Organization JSON-LD schema markup to `app/layout.tsx` identifying PRORYN as Enterprise Technology Company
- [ ] 8.2 Add Product JSON-LD schema markup to each product page
- [ ] 8.3 Add Service JSON-LD schema markup to each vertical page
- [ ] 8.4 Update `app/sitemap.ts` to include all new routes (verticals, products, industries, resources, company, solutions, book-consultation)
- [ ] 8.5 Add redirects in `next.config.js` or middleware: /services → /verticals/software-studio, /about → /company/about, /careers → /company/careers, /contact → /company/contact, /technologies → /verticals/software-studio
- [ ] 8.6 Update all page metadata (title, description, canonical URLs) to reflect "Enterprise Technology Company" positioning
- [ ] 8.7 Run build verification (`next build`) to ensure all routes compile, no broken links, no TypeScript errors
- [ ] 8.8 Validate Schema.org markup renders correctly in page source
