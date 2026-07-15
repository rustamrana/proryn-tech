import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "proryn-businessos",
    name: "PRORYN BusinessOS",
    tagline: "One Platform. Every Business Function.",
    description:
      "A next-generation AI-powered Business Operating System that manages every business function from a single intelligent platform. Built for enterprises and growing businesses that want to eliminate fragmented software stacks and replace them with a unified, AI-assisted operational backbone.",
    modules: [
      "CRM",
      "Sales",
      "Inventory",
      "HRMS",
      "Projects",
      "Helpdesk",
      "Document Management",
      "Workflow Automation",
      "Analytics",
      "AI Assistant",
    ],
    comingSoon: false,
    featured: true,
  },
  {
    id: "proryn-crm",
    name: "PRORYN CRM",
    tagline: "Close More Deals. Build Stronger Relationships.",
    description:
      "A purpose-built Customer Relationship Management platform designed for B2B sales teams. PRORYN CRM streamlines lead management, pipeline tracking, and customer communications with AI-powered lead scoring and automated follow-up sequences.",
    comingSoon: true,
    featured: false,
  },
  {
    id: "proryn-hrms",
    name: "PRORYN HRMS",
    tagline: "Simplify HR. Empower Your People.",
    description:
      "A comprehensive Human Resource Management System that covers the complete employee lifecycle — from recruitment and onboarding through attendance, payroll, performance management, and offboarding. Designed for organizations that value both HR efficiency and employee experience.",
    comingSoon: true,
    featured: false,
  },
  {
    id: "proryn-dms",
    name: "PRORYN DMS",
    tagline: "Every Document. Organized. Secure. Accessible.",
    description:
      "An enterprise Document Management System that replaces paper-based and disconnected file storage with a centralized, searchable, and permission-controlled document repository. Features version control, approval workflows, and role-based access aligned to your organizational structure.",
    comingSoon: true,
    featured: false,
  },
  {
    id: "proryn-payroll",
    name: "PRORYN Payroll",
    tagline: "Accurate Payroll. On Time. Every Time.",
    description:
      "A statutory-compliant payroll processing platform built for Indian enterprises, handling PF, ESI, TDS, and professional tax computations automatically. PRORYN Payroll integrates directly with your HRMS to eliminate data duplication and reduce month-end payroll processing to minutes.",
    comingSoon: true,
    featured: false,
  },
  {
    id: "proryn-projects",
    name: "PRORYN Projects",
    tagline: "Deliver Projects. On Scope. On Time. On Budget.",
    description:
      "A project management platform engineered for technical and cross-functional teams that need more than basic task tracking. PRORYN Projects provides resource planning, milestone tracking, dependency management, and real-time burndown reporting in a single collaborative workspace.",
    comingSoon: true,
    featured: false,
  },
  {
    id: "proryn-ai",
    name: "PRORYN AI",
    tagline: "Your Intelligent Business Co-pilot.",
    description:
      "A standalone AI platform that brings conversational AI, intelligent document processing, and predictive analytics directly into your business workflows. PRORYN AI connects to your existing systems and acts as an always-available AI co-pilot for your team — answering queries, summarizing reports, and triggering actions through natural language.",
    comingSoon: true,
    featured: false,
  },
];
