import type { Application, BusinessArea } from "@/types";

/**
 * Pure, dependency-free filtering for the Application Center.
 *
 * Kept separate from the UI so it stays fast and easy to reason about. Matches
 * against name, descriptions, business area and keywords. Case-insensitive and
 * tolerant of extra whitespace and partial matches.
 */
export function filterApplications(
  apps: Application[],
  query: string,
  area: BusinessArea | null,
): Application[] {
  const normalizedQuery = query.trim().toLowerCase();

  return apps.filter((app) => {
    // Business-area filter first (cheap).
    if (area && app.businessArea !== area) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      app.name,
      app.shortDescription,
      app.description,
      app.businessArea,
      ...(app.keywords ?? []),
      ...app.features,
      ...app.industries,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
