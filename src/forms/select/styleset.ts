import { createStyleSet } from "@sv0/stylesets";

export const base = createStyleSet({
  variants: {
    items: {
      default: ["px-2"],
      lg: ["px-2"]
    }
  }
});

export const root = createStyleSet({
  variants: {
    width: {
      fit: ["w-fit"],
      full: ["w-full"],
      content: ["w-max"]
    }
  },
  defaultVariants: {
    width: "fit"
  }
});

/**
 * Styleset for the Select.Trigger component. Provides styling for the button that opens
 * and closes the select dropdown, including various states and size variants.
 *
 * A sharp, sleek look inspired by shadcn-svelte's Select: crisp 1px border on `--input`,
 * neutral background derived from theme tokens, strong focus ring for accessibility,
 * and refined hover/open affordances that respect the neutral grayscale palette.
 *
 * @category Select
 */
export const trigger = createStyleSet({
  base: [
    // Layout & Display
    "inline-flex items-center justify-between gap-2 whitespace-nowrap",
    // Appearance
    "rounded-md border border-input bg-background text-foreground shadow-xs",
    "dark:bg-input/30 dark:hover:bg-input/50",
    // Typography
    "font-medium",
    // Cursor
    "cursor-pointer",
    // Transitions
    "transition-[color,background-color,border-color,box-shadow] duration-150 outline-none",
    // Invalid States
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "dark:aria-invalid:ring-destructive/40",
    // Disabled States
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Placeholder States
    "data-[placeholder]:text-muted-foreground",
    // Open State
    "data-[state=open]:border-ring/25 data-[state=open]:ring-ring/10 data-[state=open]:ring-[2px]",
    // SVG Icon Styles
    "[&_svg:not([class*='text-'])]:text-muted-foreground",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&[data-state=open]_svg.chevron]:rotate-180 [&_svg.chevron]:transition-transform [&_svg.chevron]:duration-200"
  ],
  variants: {
    size: {
      sm: ["h-8 px-2.5 py-1", "text-xs"],
      default: ["h-9 px-3 py-2", "text-sm"],
      lg: ["h-10 px-4 py-2.5", "text-base"]
    },
    width: {
      fit: "w-fit",
      full: "w-full",
      content: "w-max"
    },
    state: {
      closed: [],
      open: []
    },
    intent: {
      default: ["hover:bg-accent hover:text-accent-foreground"],
      outline: ["border-2", "hover:bg-accent hover:text-accent-foreground"],
      ghost: [
        "border-transparent bg-transparent shadow-none",
        "hover:bg-accent hover:text-accent-foreground",
        "dark:bg-transparent dark:hover:bg-accent"
      ]
    }
  },
  defaultVariants: {
    size: "default",
    width: "full",
    intent: "default"
  }
});

/**
 * Styleset for the Select.Content component. Provides styling for the dropdown container
 * that holds all the select options, including animations and positioning.
 *
 * Uses the `--popover-*` tokens (elevated surface in the neutral palette) with a
 * pronounced shadow, hairline border, and refined enter/exit animations to feel
 * responsive and polished.
 *
 * @category Select
 */
export const contentStyleSet = createStyleSet({
  base: [
    // Layout & Display
    "relative z-50 overflow-x-hidden overflow-y-auto",
    // Appearance
        "bg-popover-background",

    "rounded-md border border-popover-border shadow-lg",
    "bg-popover-background text-popover-foreground",
    // Padding
    "p-1",
    // Scrollbar
    "scrollbar-thin",
    // Animations - Entry
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    // Animations - Exit
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    // Side-specific animations
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  ],
  variants: {
    size: {
      sm: ["max-h-48", "text-xs"],
      default: ["max-h-60", "text-sm"],
      lg: ["max-h-72", "text-base"]
    },
    width: {
      trigger: "min-w-[var(--radix-select-trigger-width)]",
      content: "w-max",
      full: "w-full"
    }
  },
  defaultVariants: {
    size: "default",
    width: "trigger"
  }
});

/**
 * Styleset for the Select.Group component. Provides styling for grouping related select
 * options together with optional labels.
 *
 * @category Select
 */
export const group = createStyleSet({
  base: ["flex flex-col"],
  variants: {
    spacing: {
      none: "",
      sm: "gap-0.5",
      default: "gap-0.5",
      lg: "gap-1"
    },
    padding: {
      none: "",
      sm: "p-0.5",
      default: "p-1",
      lg: "p-1.5"
    },
    container: {
      default: "bg-select-group-background"
    },
    heading: {
      colors: {
        default: "bg-select-label-background",
        muted: "bg-muted",
        accent: "bg-accent"
      },
      spacing: {
        none: "",
        sm: "ml-2",
        default: "min-h-7 flex items-center text-xs font-medium text-muted-foreground select-none",
        lg: "ml-4"
      }
    }
  },
  defaultVariants: {
    spacing: "default",
    heading: {
      spacing: "default"
    }
  }
});

/**
 * Styleset for the Select.Item component. Provides styling for individual selectable
 * options within the dropdown, including selection and highlight states.
 *
 * Contrast-forward defaults: hovered / highlighted items lift onto `--accent` with
 * `--accent-foreground` text (which in the neutral dark palette becomes a punchy near-
 * white on charcoal, and in light mode is dark ink on soft gray). Selected rows also
 * get a subtle weight bump to signal state without shouting.
 *
 * @category Select
 */
export const item = createStyleSet({
  base: [
    // Layout & Display
    "relative flex w-full items-center justify-between gap-2 select-none",
    // Sizing
    "rounded-sm px-2 py-1.5",
    // Cursor
    "cursor-pointer",
    // Appearance
    // "bg-popover-background",
    "text-popover-foreground",
    "rounded-md",
    // Transitions
    "transition-colors duration-100",
    // Typography
    "text-sm outline-none",
    // SVG Icon Styles
    "[&_svg:not([class*='text-'])]:text-muted-foreground",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Selected State
    "data-[selected]:bg-select-item-selected-background data-[selected]:text-accent-foreground",
    "data-[selected]:font-semibold",
    // Highlighted State (keyboard + hover)
    "data-[highlighted]:bg-select-item-hover-background data-[highlighted]:text-accent-foreground",
    "focus:bg-select-item-hover-background focus:text-accent-foreground",
    // Disabled State
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
  ],
  variants: {
    size: {
      sm: ["min-h-7 text-xs px-1.5 py-1"],
      default: ["min-h-8 text-sm"],
      lg: ["min-h-9 text-base px-2.5 py-2"]
    },
        spacing: {
      none: "",
      sm: "gap-0.5",
      default: "gap-0.5",
      lg: "gap-1"
    },
    intent: {
      default: [],
      destructive: [
        "text-destructive",
        "data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground",
        "focus:bg-destructive focus:text-destructive-foreground",
        "[&_svg:not([class*='text-'])]:text-destructive"
      ]
    }
  },
  defaultVariants: {
    size: "default",
    intent: "default"
  }
});

/**
 * Styleset for the Select.Label component. Provides styling for group labels that
 * describe sections of select options.
 *
 * @category Select
 */
export const label = createStyleSet({
  base: [
    // Typography
    "font-medium text-muted-foreground select-none",
    // Sizing
    "px-2 py-1.5",
    // Display
    "flex items-center",
    // Appearance
    "bg-select-label-background"
  ],
  variants: {
    size: {
      sm: ["text-[0.7rem] tracking-wide uppercase"],
      default: ["text-xs tracking-wide uppercase"],
      lg: ["text-sm tracking-wide uppercase"]
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold"
    }
  },
  defaultVariants: {
    size: "default",
    weight: "medium"
  }
});

/**
 * Styleset for the Select.Separator component. Provides styling for visual separators
 * between groups or sections of select options.
 *
 * @category Select
 */
export const separator = createStyleSet({
  base: [
    // Layout
    "pointer-events-none",
    // Spacing
    "-mx-1 my-1",
    // Appearance
    "bg-select-separator-color"
  ],
  variants: {
    spacing: {
      none: "",
      sm: "gap-0.5",
      default: "gap-0.5",
      lg: "gap-1"
    },
    orientation: {
      horizontal: "h-px w-auto data-[orientation=horizontal]:w-auto",
      vertical: "w-px h-full data-[orientation=vertical]:h-full"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

/**
 * Default export for the main trigger styleset, as it's the most commonly used.
 *
 * @category Select
 */
export const styleSet = trigger;
