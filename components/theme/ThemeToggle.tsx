'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

/**
 * Three-state theme toggle: light → dark → system → light (cycling).
 * Renders Sun (light), Moon (dark), or Monitor (system) icons.
 * Accessible via keyboard and announces state changes to screen readers.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = useCallback(() => {
    // Add transitioning class for smooth CSS transitions
    document.documentElement.classList.add('transitioning');
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 350);

    // Three-state cycle: light → dark → system → light
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  }, [theme, setTheme]);

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      default:
        return 'Switch to light mode';
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" aria-hidden="true" />;
      case 'dark':
        return <Moon className="h-5 w-5" aria-hidden="true" />;
      default:
        return <Monitor className="h-5 w-5" aria-hidden="true" />;
    }
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={getLabel()}
      aria-live="polite"
      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors duration-150 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {getIcon()}
    </button>
  );
}
