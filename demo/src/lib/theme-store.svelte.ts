/**
 * @file Theme Store for SSR-safe theme management
 *
 *   This module provides a reactive theme management system that works correctly with SvelteKit's
 *   SSR. It uses Svelte 5 runes for reactivity and ensures that browser-only APIs are not accessed
 *   during server-side rendering.
 *
 *   ## Key Features:
 *
 *   - Lazy initialization of ThemeManager
 *   - Browser-safe localStorage access
 *   - Reactive theme state using $state rune
 *   - SSR-compatible defaults
 */

import { browser } from "$app/environment";
import { createStyleSet, createThemeVariant, ThemeManager, type ThemeConfig } from "@sv0/stylesets";

/**
 * Base theme configuration Safe to define at module level (no side effects)
 */
export const baseTheme: ThemeConfig = {
  id: "base",
  name: "Light Theme",
  darkMode: false,
  tokens: {
    border: {
      primary: "border-zinc-200"
    },
    color: {
      primary: { value: "indigo-600", description: "Brand primary" },
      secondary: { value: "pink-600", description: "Brand secondary" },
      accent: { value: "orange-500", description: "Brand accent" },
      background: "white",
      surface: "gray-50",
      text: "gray-900",
      textMuted: "gray-600"
    },
    spacing: {
      xs: "2px",
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "32px"
    }
  },
  accessibility: {
    focusRing: {
      default: "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
      auto: true
    }
  },
  cssVariables: {
    "--theme-primary": "#4f46e5",
    "--theme-background": "#ffffff",
    "--theme-text": "#111827"
  }
};

/**
 * Dark theme variant Safe to define at module level (no side effects)
 */
export const darkTheme = createThemeVariant(baseTheme, "dark", {
  id: "dark",
  name: "Dark Theme",
  darkMode: true,
  tokens: {
    border: {
      primary: "border-zinc-800"
    },
    color: {
      border: "zinc-800",
      background: "black",
      text: "white",
      surface: "gray-900",
      textMuted: "gray-400"
    },
    thickness: {
      thin: "1",
      normal: "2",
      thick: "4"
    }
  },
  cssVariables: {
    "--theme-primary": "#fbbf24",
    "--theme-background": "#000000",
    "--theme-text": "#ffffff"
  }
});

/**
 * Lazy theme manager initialization Only creates the instance when first accessed
 */
let _themeManager: ThemeManager | null = null;

export function getThemeManager(): ThemeManager {
  if (!_themeManager) {
    _themeManager = new ThemeManager([baseTheme, darkTheme]);

    // Set initial theme based on environment
    if (browser) {
      const saved = localStorage.getItem("theme-preference");
      _themeManager.setActiveTheme(saved || "base");
    } else {
      // SSR default - always start with base theme
      _themeManager.setActiveTheme("base");
    }
  }
  return _themeManager;
}

/**
 * Reactive theme state using Svelte 5 runes Provides reactive access to current theme and theme
 * switching
 */
export class ThemeState {
  #currentThemeId = $state<string>("base");

  constructor() {
    // Initialize from localStorage on client only
    if (browser) {
      const saved = localStorage.getItem("theme-preference");
      this.#currentThemeId = saved || "base";
      // Update ThemeManager to match
      getThemeManager().setActiveTheme(this.#currentThemeId);
    }
  }

  get currentThemeId(): string {
    return this.#currentThemeId;
  }

  get manager(): ThemeManager {
    return getThemeManager();
  }

  // Derive current theme from reactive currentThemeId
  get current(): ThemeConfig | undefined {
    // Access currentThemeId to establish reactivity dependency
    const id = this.#currentThemeId;
    return this.manager.getTheme(id);
  }

  get isDark(): boolean {
    return this.current?.darkMode ?? false;
  }

  setTheme(themeId: string): void {
    // Update reactive state first
    this.#currentThemeId = themeId;
    // Then update manager
    this.manager.setActiveTheme(themeId);

    // Persist to localStorage on client only
    if (browser) {
      localStorage.setItem("theme-preference", themeId);
    }
  }

  toggleTheme(): void {
    const newTheme = this.#currentThemeId === "base" ? "dark" : "base";
    this.setTheme(newTheme);
  }
}

/**
 * Singleton theme state instance Safe to export as it uses lazy initialization internally
 */
export const themeState = new ThemeState();

/**
 * Create a styleset factory for components This allows components to create stylesets that respond
 * to theme changes
 */
export function createThemedStyleSet(options: Parameters<typeof createStyleSet>[0]) {
  return createStyleSet({
    ...options,
    themeManager: getThemeManager()
  });
}
