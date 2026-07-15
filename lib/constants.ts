import type { NavItem } from "@/types";

// ─── Company Info ───────────────────────────────────────────────────────────

export const COMPANY_NAME = "PRORYN TECH";

export const TAGLINE =
  "Engineering Intelligent Software for Modern Businesses.";

export const EMAIL = {
  support: "support@proryntech.com",
} as const;

export const WEBSITE = "https://proryntech.com";

export const PHONE = "+91 90397 30924";

export const ADDRESS = "Bhopal";

export const CITY = "Bhopal";

export const STATE = "Madhya Pradesh";

export const COUNTRY = "India";

export const FULL_ADDRESS = `${CITY}, ${STATE} 462010, ${COUNTRY}`;

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Enterprise Software Development",
        href: "/services#enterprise-software-development",
      },
      {
        label: "Custom Web Application Development",
        href: "/services#custom-web-application-development",
      },
      {
        label: "Mobile App Development",
        href: "/services#mobile-app-development",
      },
      {
        label: "Artificial Intelligence Solutions",
        href: "/services#artificial-intelligence-solutions",
      },
      {
        label: "Business Automation",
        href: "/services#business-automation",
      },
      {
        label: "Cloud & DevOps",
        href: "/services#cloud-devops",
      },
      {
        label: "Resource Augmentation",
        href: "/services#resource-augmentation",
      },
      {
        label: "Annual Maintenance & Support",
        href: "/services#annual-maintenance-support",
      },
      {
        label: "Technology Consulting",
        href: "/services#technology-consulting",
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "PRORYN BusinessOS",
        href: "/products#proryn-businessos",
      },
      {
        label: "PRORYN CRM",
        href: "/products#proryn-crm",
      },
      {
        label: "PRORYN HRMS",
        href: "/products#proryn-hrms",
      },
      {
        label: "PRORYN DMS",
        href: "/products#proryn-dms",
      },
      {
        label: "PRORYN Payroll",
        href: "/products#proryn-payroll",
      },
      {
        label: "PRORYN Projects",
        href: "/products#proryn-projects",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Technologies", href: "/technologies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

// ─── Social Links ────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/proryntech",
  github: "https://github.com/proryntech",
  facebook: "https://www.facebook.com/proryntech",
  instagram: "https://www.instagram.com/proryntech",
  youtube: "https://www.youtube.com/@proryntech",
  x: "https://x.com/proryntech",
} as const;

// ─── Brand Colors (reference) ────────────────────────────────────────────────

export const BRAND = {
  primary: "#0F172A",
  secondary: "#2563EB",
  accent: "#06B6D4",
} as const;

// ─── Copyright ────────────────────────────────────────────────────────────────

export const COPYRIGHT = `© 2026 ${COMPANY_NAME}. All Rights Reserved.`;
