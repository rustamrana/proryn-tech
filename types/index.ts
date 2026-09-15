// TypeScript interfaces for PRORYN TECH website

export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  features: string[];
  longDescription?: string;
  image?: string; // optional image path under /public/
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
  date: string; // ISO date string
  readTime: number; // minutes
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
  type: "Full-time" | "Contract" | "Part-time";
  mode: "Remote" | "Onsite" | "Hybrid";
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Application Catalog ───────────────────────────────────────────────────

/**
 * Lifecycle status of a PRORYN business application.
 * - "available"    → live and launchable via BusinessOS
 * - "coming-soon"  → announced but not yet launchable
 * - "beta"         → available in early-access
 */
export type ApplicationStatus = "available" | "beta" | "coming-soon";

/** Broad business area an application belongs to (used for filtering). */
export type BusinessArea =
  | "CRM"
  | "Sales"
  | "HR"
  | "Finance"
  | "Operations"
  | "Projects"
  | "Inventory"
  | "Support"
  | "Documents"
  | "Analytics";

/**
 * A discoverable PRORYN business application.
 *
 * This is a UI-facing catalog definition. It is intentionally decoupled from
 * any backend contract so the static catalog in `lib/data/applications.ts`
 * can later be replaced by an API response without redesigning the UI.
 */
export interface Application {
  /** Stable unique identifier. */
  id: string;
  /** URL-safe slug used for `/applications/[slug]`. */
  slug: string;
  /** Display name, e.g. "CRM". */
  name: string;
  /** One-line summary shown on cards and metadata. */
  shortDescription: string;
  /** Full description shown on the details page. */
  description: string;
  /** Primary business area (drives area filtering). */
  businessArea: BusinessArea;
  /** Relevant industries / use cases. */
  industries: string[];
  /** Who the application is built for. */
  targetUsers: string[];
  /** Key capabilities / features. */
  features: string[];
  /** Business/operational benefits. */
  benefits: string[];
  /** Lifecycle status. */
  status: ApplicationStatus;
  /** Lucide icon name used to render the app glyph. */
  icon: string;
  /** Additional searchable keywords (not displayed). */
  keywords?: string[];
  /**
   * Whether launching requires authentication in BusinessOS.
   * Purely informational for the public site — no auth happens here.
   */
  requiresAuthentication: boolean;
  /**
   * Whether the application can currently be launched.
   * When false the UI shows a status badge instead of a Launch button.
   */
  isAvailable: boolean;
  /**
   * Path appended to the configured BusinessOS base URL when launching.
   * Example: "/crm". Combined with NEXT_PUBLIC_BUSINESSOS_URL at runtime.
   */
  launchPath?: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
  icon?: string;
  description?: string;
}

export interface CompanyBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TrustStat {
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
}

export interface ProcessStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}
