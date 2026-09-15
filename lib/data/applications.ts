import type { Application, BusinessArea } from "@/types";

/**
 * PRORYN Application Catalog.
 *
 * Static, typed catalog of the business applications available through
 * PRORYN BusinessOS. This is intentionally a plain data layer so it can be
 * swapped for an API response later without changing the UI.
 *
 * Capabilities listed here mirror the approved BusinessOS modules
 * (see lib/data/products.ts). Applications that are not yet live are marked
 * with a `coming-soon` / `beta` status and `isAvailable: false` so the UI
 * shows a status badge instead of a broken Launch link.
 */
export const applications: Application[] = [
  {
    id: "crm",
    slug: "crm",
    name: "CRM",
    shortDescription:
      "Customer relationship management for leads, contacts and deals.",
    description:
      "Manage customer relationships, activities, sales interactions and business communication through PRORYN BusinessOS. The CRM application gives sales and account teams a unified view of every customer — from first contact through to long-term retention.",
    businessArea: "CRM",
    industries: ["Manufacturing", "Retail", "Professional Services", "Finance"],
    targetUsers: ["Sales Teams", "Account Managers", "Business Development", "Customer Success"],
    features: [
      "Customer & contact management",
      "Lead capture and tracking",
      "Deal / opportunity pipeline",
      "Activity and interaction history",
      "Notes, tasks and follow-up reminders",
      "Customer communication log",
    ],
    benefits: [
      "A single source of truth for every customer relationship",
      "Fewer missed follow-ups and lost opportunities",
      "Faster onboarding for new sales team members",
      "Clear visibility into pipeline health",
    ],
    status: "available",
    icon: "Users",
    keywords: ["customer", "leads", "contacts", "pipeline", "relationship", "accounts"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/crm",
  },
  {
    id: "sales",
    slug: "sales",
    name: "Sales",
    shortDescription:
      "Pipeline, quotations and order tracking with revenue visibility.",
    description:
      "Track your complete sales process — from quotations and orders through to revenue — inside PRORYN BusinessOS. The Sales application connects directly to CRM data so your team works from one consistent view of customers and deals.",
    businessArea: "Sales",
    industries: ["Manufacturing", "Retail", "Distribution", "Professional Services"],
    targetUsers: ["Sales Managers", "Sales Representatives", "Revenue Operations"],
    features: [
      "Sales pipeline tracking",
      "Quotations and proposals",
      "Order management",
      "Revenue and forecast dashboards",
      "Deal stage automation",
    ],
    benefits: [
      "Shorten the quote-to-order cycle",
      "Real-time visibility into forecasted revenue",
      "Consistent sales process across the team",
    ],
    status: "available",
    icon: "TrendingUp",
    keywords: ["sales", "pipeline", "quotation", "orders", "revenue", "forecast"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/sales",
  },
  {
    id: "inventory",
    slug: "inventory",
    name: "Inventory",
    shortDescription:
      "Multi-warehouse stock management with alerts and replenishment.",
    description:
      "Manage stock across multiple warehouses inside PRORYN BusinessOS. The Inventory application tracks stock levels, movements and replenishment so operations teams always know what is on hand and what needs reordering.",
    businessArea: "Inventory",
    industries: ["Manufacturing", "Retail", "Distribution", "Logistics"],
    targetUsers: ["Operations Teams", "Warehouse Managers", "Procurement"],
    features: [
      "Multi-warehouse stock management",
      "Stock level tracking",
      "Automatic replenishment alerts",
      "Stock movement history",
      "Barcode-ready item catalog",
    ],
    benefits: [
      "Reduce stock-outs and overstocking",
      "Accurate, real-time inventory visibility",
      "Faster stock reconciliation",
    ],
    status: "available",
    icon: "Package",
    keywords: ["inventory", "stock", "warehouse", "replenishment", "barcode", "operations"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/inventory",
  },
  {
    id: "hrms",
    slug: "hrms",
    name: "HRMS",
    shortDescription:
      "Employee lifecycle: onboarding, attendance and performance.",
    description:
      "Manage the complete employee lifecycle through PRORYN BusinessOS — from onboarding and attendance through to performance reviews. The HRMS application centralizes people data so HR teams spend less time on administration.",
    businessArea: "HR",
    industries: ["All Industries", "Professional Services", "Manufacturing", "Technology"],
    targetUsers: ["HR Teams", "People Managers", "Team Leads"],
    features: [
      "Employee records and directory",
      "Onboarding workflows",
      "Attendance and leave tracking",
      "Performance reviews",
      "Employee self-service",
    ],
    benefits: [
      "Less manual HR administration",
      "Consistent onboarding experience",
      "A single record for every employee",
    ],
    status: "available",
    icon: "UserCog",
    keywords: ["hr", "hrms", "employees", "attendance", "onboarding", "performance", "people"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/hrms",
  },
  {
    id: "projects",
    slug: "projects",
    name: "Projects",
    shortDescription:
      "Plan, track and deliver projects with milestones and reporting.",
    description:
      "Plan, execute and track projects inside PRORYN BusinessOS. The Projects application gives cross-functional teams milestones, task tracking and progress reporting in one collaborative workspace.",
    businessArea: "Projects",
    industries: ["Professional Services", "Technology", "Construction", "Consulting"],
    targetUsers: ["Project Managers", "Delivery Teams", "Team Leads"],
    features: [
      "Project and task planning",
      "Milestone tracking",
      "Resource allocation",
      "Progress and status reporting",
      "Team collaboration",
    ],
    benefits: [
      "Keep projects on scope and on schedule",
      "Clear visibility into delivery progress",
      "Better coordination across teams",
    ],
    status: "available",
    icon: "FolderKanban",
    keywords: ["projects", "tasks", "milestones", "delivery", "planning", "gantt"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/projects",
  },
  {
    id: "helpdesk",
    slug: "helpdesk",
    name: "Helpdesk",
    shortDescription:
      "Ticket management and multi-channel customer support.",
    description:
      "Support customers through PRORYN BusinessOS with ticket management and SLA tracking. The Helpdesk application keeps every support request organized so teams can respond quickly and consistently.",
    businessArea: "Support",
    industries: ["Technology", "Retail", "Professional Services", "SaaS"],
    targetUsers: ["Support Teams", "Customer Success", "Service Desk Agents"],
    features: [
      "Ticket management",
      "Multi-channel intake",
      "SLA tracking",
      "Ticket assignment and routing",
      "Customer communication history",
    ],
    benefits: [
      "Faster, more consistent support responses",
      "Nothing falls through the cracks",
      "Clear accountability for every ticket",
    ],
    status: "available",
    icon: "LifeBuoy",
    keywords: ["helpdesk", "support", "tickets", "sla", "service", "customer support"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/helpdesk",
  },
  {
    id: "documents",
    slug: "documents",
    name: "Document Management",
    shortDescription:
      "Centralized, searchable document repository with access control.",
    description:
      "Store, organize and control business documents inside PRORYN BusinessOS. The Document Management application provides a centralized repository with version control, approval workflows and role-based access.",
    businessArea: "Documents",
    industries: ["Finance", "Legal", "Government", "Professional Services"],
    targetUsers: ["Operations Teams", "Compliance", "Administrators"],
    features: [
      "Centralized document repository",
      "Version control",
      "Approval workflows",
      "Role-based access control",
      "Full-text search",
    ],
    benefits: [
      "Find the right document in seconds",
      "Controlled access to sensitive files",
      "A clear audit trail on every document",
    ],
    status: "available",
    icon: "FileText",
    keywords: ["documents", "dms", "files", "repository", "version control", "approval"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/documents",
  },
  {
    id: "analytics",
    slug: "analytics",
    name: "Analytics",
    shortDescription:
      "Real-time business dashboards and KPI reporting.",
    description:
      "Turn business data into insight with PRORYN BusinessOS Analytics. The application provides real-time dashboards, custom KPIs and drill-down reports across your connected applications.",
    businessArea: "Analytics",
    industries: ["All Industries", "Finance", "Retail", "Manufacturing"],
    targetUsers: ["Business Leaders", "Analysts", "Operations Managers"],
    features: [
      "Real-time dashboards",
      "Custom KPI tracking",
      "Drill-down reports",
      "Cross-application data views",
      "Export capabilities",
    ],
    benefits: [
      "Make decisions from live data",
      "One view across business functions",
      "Less time spent building manual reports",
    ],
    status: "available",
    icon: "BarChart3",
    keywords: ["analytics", "dashboards", "kpi", "reports", "business intelligence", "insights"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/analytics",
  },
  {
    id: "workflow-automation",
    slug: "workflow-automation",
    name: "Workflow Automation",
    shortDescription:
      "Automate approvals, notifications and cross-app processes.",
    description:
      "Automate repetitive business processes across PRORYN BusinessOS. The Workflow Automation application lets teams build approval flows, notifications and cross-application automations without writing code.",
    businessArea: "Operations",
    industries: ["All Industries", "Manufacturing", "Finance", "Professional Services"],
    targetUsers: ["Operations Teams", "Administrators", "Process Owners"],
    features: [
      "Visual workflow builder",
      "Approval automation",
      "Automated notifications",
      "Cross-application triggers",
    ],
    benefits: [
      "Remove manual, repetitive steps",
      "Consistent, auditable processes",
      "Faster approvals and handoffs",
    ],
    status: "beta",
    icon: "Workflow",
    keywords: ["workflow", "automation", "approvals", "notifications", "process", "no-code"],
    requiresAuthentication: true,
    isAvailable: true,
    launchPath: "/workflow",
  },
  {
    id: "finance",
    slug: "finance",
    name: "Finance",
    shortDescription:
      "Invoicing, payments and financial reporting.",
    description:
      "Manage core finance operations through PRORYN BusinessOS. The Finance application is planned to cover invoicing, payments and financial reporting, connecting directly to Sales and Inventory data.",
    businessArea: "Finance",
    industries: ["All Industries", "Retail", "Manufacturing", "Professional Services"],
    targetUsers: ["Finance Teams", "Accountants", "Business Owners"],
    features: [
      "Invoicing",
      "Payment tracking",
      "Financial reporting",
      "Integration with Sales and Inventory",
    ],
    benefits: [
      "One connected view of finances",
      "Faster, more accurate invoicing",
      "Reduced manual reconciliation",
    ],
    status: "coming-soon",
    icon: "Wallet",
    keywords: ["finance", "invoicing", "payments", "accounting", "billing", "reporting"],
    requiresAuthentication: true,
    isAvailable: false,
  },
];

// ─── Derived helpers ─────────────────────────────────────────────────────────

/** Distinct business areas present in the catalog, in a stable order. */
const BUSINESS_AREA_ORDER: BusinessArea[] = [
  "CRM",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Projects",
  "Inventory",
  "Support",
  "Documents",
  "Analytics",
];

/** Business areas that actually have at least one application. */
export const businessAreas: BusinessArea[] = BUSINESS_AREA_ORDER.filter((area) =>
  applications.some((app) => app.businessArea === area),
);

/** Look up a single application by slug. */
export function getApplicationBySlug(slug: string): Application | undefined {
  return applications.find((app) => app.slug === slug);
}
