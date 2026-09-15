import {
  BarChart3,
  FileText,
  FolderKanban,
  LifeBuoy,
  Package,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Workflow,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import type { ApplicationStatus } from "@/types";

/** Map catalog icon names to Lucide components (avoids dynamic imports). */
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Package,
  UserCog,
  FolderKanban,
  LifeBuoy,
  FileText,
  BarChart3,
  Workflow,
  Wallet,
};

/** Resolve an icon name from the catalog to a Lucide component. */
export function getApplicationIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? LayoutGrid;
}

interface StatusMeta {
  label: string;
  /** Tailwind classes for the badge (bg + text + border). */
  className: string;
}

/** Human-readable label and styling for each application status. */
export function getStatusMeta(status: ApplicationStatus): StatusMeta {
  switch (status) {
    case "available":
      return {
        label: "Available",
        className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      };
    case "beta":
      return {
        label: "Beta",
        className: "bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20",
      };
    case "coming-soon":
    default:
      return {
        label: "Coming Soon",
        className: "bg-amber-100 text-amber-700 border border-amber-200",
      };
  }
}
