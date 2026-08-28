import { createStyleSet } from "@sv0/stylesets";
import { themeState } from "../../../demo/src/lib/theme-store.svelte";

themeState.setTheme("base-dark");
const currentTheme = $derived(themeState.current);
/**
 * Toolbar styleset without theme manager. Theme will be provided at component level via
 * props.
 */
export const styleset = createStyleSet({
  tokens: {
    border: {
      primary: "border-zinc-200"
    },
    color: {
      primary: "indigo-600",
      secondary: "pink-600",
      accent: "orange-500",
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
  base: "flex items-center gap-1.5",
  variants: {
    intent: {
      primary: "bg-white dark:bg-black",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
      success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800",
      ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200"
    },
    border: {
      primary: "border border-zinc-600 dark:border-zinc-900"
    },
    size: {
      xs: "h-7 px-2 text-xs rounded",
      sm: "px-2 text-sm rounded-md",
      md: "h-8 px-4 text-base rounded",
      lg: "h-12 px-6 text-lg rounded-lg",
      xl: "h-14 px-8 text-xl rounded-lg"
    },
    width: {
      compact: "relative w-fit",
      full: "w-full"
    }
  },
  defaultVariants: {
    intent: "primary",
    border: "primary",
    size: "md",
    width: "compact"
  }
});

export const button = createStyleSet({
  themes: {
    dark: themeState.manager.getTheme("dark")
  },
  base: "rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    intent: {
      primary: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      secondary: "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
    },
    size: {
      sm: "h-8 px-2 text-xs",
      md: "h-7 px-2 text-sm",
      lg: "h-12 px-4 text-base"
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "md"
  }
});
