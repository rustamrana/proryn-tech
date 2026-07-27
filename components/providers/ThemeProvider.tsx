"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme context value interface representing the theme state
 * exposed by next-themes throughout the application.
 */
export interface ThemeContextValue {
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider wraps the application with next-themes to enable
 * dark mode support. Uses `attribute="class"` to match the existing
 * Tailwind CSS `darkMode: ["class"]` configuration.
 *
 * - Defaults to system preference
 * - Persists selection in localStorage under "proryn-theme"
 * - Prevents FOUC via next-themes' built-in script injection
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      storageKey="proryn-theme"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
