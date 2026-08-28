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
 * @category Select
 */
export const trigger = createStyleSet({
  base: [
    // Layout & Display
    "flex items-center justify-between gap-2",
    // Appearance
    "rounded-md border border-input bg-transparent shadow-xs",
    // Transitions
    "transition-[color,box-shadow] outline-none ",
    // Focus States
    // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    // Invalid States
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "dark:aria-invalid:ring-destructive/40",
    // Disabled States
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Placeholder States
    "data-[placeholder]:text-muted-foreground",
    // SVG Icon Styles
    "[&_svg:not([class*='text-'])]:text-muted-foreground",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Dark Mode
    "dark:bg-input/30 dark:hover:bg-input/50"
  ],
  variants: {
    size: {
      sm: ["h-8 px-2.25 py-1", "text-xs"],
      default: ["h-9 px-2.5 py-2", "text-sm"],
      lg: ["h-10 px-4 py-2.5", "text-base"]
    },
    width: {
      fit: "w-fit",
      full: "w-full",
      content: "w-max"
    },
    state: {
      closed: "data-[state=closed]:bg-transparent",
      open: []
    },
    intent: {
      default: ["hover:bg-accent/50", "focus:bg-accent/30"],
      outline: ["border-2", "hover:bg-accent/30"],
      ghost: ["border-transparent", "hover:bg-accent hover:text-accent-foreground"]
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
 * @category Select
 */
export const contentStyleSet = createStyleSet({
  base: [
    // Layout & Display
    "relative z-50 overflow-x-hidden overflow-y-auto",
    // Appearance
    "scrollbar-thin",
    // Colors
    "bg-popover-background text-popover-foreground",
    // Animations - Entry
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    // Animations - Exit
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    // Side-specific animations
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    // Side-specific positioning
    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1",
    "data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
  ],
  variants: {
    size: {
      sm: ["max-h-48", "text-xs"],
      default: ["max-h-60"],
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
      default: "gap-1",
      lg: "gap-2"
    },
    padding: {
      none: "",
      sm: "p-1",
      default: "p-1.5",
      lg: "p-2"
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
        default: "min-h-7 flex items-center text-sm text-muted-foreground select-none",
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
 * @category Select
 */
export const item = createStyleSet({
  base: [
    // Layout & Display
    "relative flex w-full cursor-default items-center justify-between gap-2 select-none",
    // Appearance
    "duration-250",
    // SVG Icon Styles
    "[&_svg:not([class*='text-'])]:text-muted-foreground",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Selected State
    "data-[selected]:bg-select-item-selected-background data-[selected]:font-medium",
    "data-[selected]:text-accent-foreground",
    // Disabled State
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    // Highlighted State
    "data-[highlighted]:bg-select-item-hover-background! data-[highlighted]:text-accent-foreground",
    "focus:bg-select-item-hover-background focus:text-accent-foreground focus:outline-none"
  ],
  variants: {
    size: {
      sm: ["text-xs"],
      default: ["min-h-8 flex items-center"],
      lg: ["text-base"]
    }
  },
  defaultVariants: {
    size: "default"
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
    "font-medium text-muted-foreground",
    // Sizing
    "pl-1.75 h-8",
    // Display
    "flex items-center",
    // Appearance
    "bg-select-label-background"
  ],
  variants: {
    size: {
      sm: ["text-xs"],
      default: ["text-xs"],
      lg: ["text-sm"]
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
    // Appearance
    "bg-select-separator-color"
  ],
  variants: {
    orientation: {
      horizontal: "h-px w-full data-[orientation=horizontal]:w-full",
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
