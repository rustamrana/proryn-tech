// TypeScript interfaces for PRORYN TECH website

export interface Service {
  id: string;
  icon: string; // Lucide icon name
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
