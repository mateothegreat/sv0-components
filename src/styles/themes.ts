import type { ThemeConfig } from "@sv0/stylesets";
import { ThemeManager, createThemeVariant } from "@sv0/stylesets";

export const base: ThemeConfig = {
  id: "base",
  name: "Base Theme",
  darkMode: false,
  tokens: {
    border: {
      primary: "dark:border-zinc-800 dark:bg-zinc-900"
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

export const dark = createThemeVariant(base, "dark", {
  id: "dark",
  name: "Dark Theme",
  darkMode: true,
  tokens: {
    color: {
      primary: "yellow-400",
      background: "black",
      text: "white",
      surface: "gray-900"
    }
  },
  cssVariables: {
    "--theme-primary": "#fbbf24",
    "--theme-background": "#000000",
    "--theme-text": "#ffffff"
  }
});

export const themeManager = new ThemeManager([base, dark]);
