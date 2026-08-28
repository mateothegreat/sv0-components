import { createStyleSet } from "@sv0/stylesets";

export const styleSet = createStyleSet({
  base: [
    // Layout & Display
    "inline-flex shrink-0 items-center justify-center gap-2",
    // Typography
    "whitespace-nowrap text-sm font-medium",
    // Appearance
    "rounded-md outline-none shadow-xs",
    // Transitions
    "transition-all",
    // Invalid States
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "dark:aria-invalid:ring-destructive/40",
    // Disabled States
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    // SVG Icon Styles
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
  ],
  variants: {
    intent: {
      default: [
        // Colors
        "bg-primary text-primary-foreground",
        // Shadow
        "shadow-xs",
        // Hover
        "hover:bg-primary/80"
      ],
      action: [
        // Colors
        "bg-green-600 text-white",
        // Shadow
        "shadow-xs",
        // Hover
        "hover:bg-green-700"
      ],
      destructive: [
        // Colors
        "bg-destructive text-destructive-foreground",
        // Shadow
        "shadow-xs",
        // Hover
        "hover:bg-destructive/80"
        // Dark Mode
        // "dark:bg-destructive dark:focus-visible:ring-destructive/40"
      ],
      outline: [
        // Border
        "border",
        // Shadow
        "shadow-xs",
        // Hover
        "hover:bg-accent hover:text-accent-foreground",
        // Dark Mode
        "dark:border-input dark:hover:bg-input/50"
      ],
      secondary: [
        // Colors
        "bg-secondary text-secondary-foreground",
        // Shadow
        "shadow-xs",
        // Hover
        "hover:bg-secondary/80"
      ],
      ghost: [
        // Hover
        "hover:bg-accent hover:text-accent-foreground",
        // Dark Mode
        "dark:hover:bg-accent/80"
      ],
      link: [
        // Typography
        "text-primary underline-offset-4",
        // Hover
        "hover:underline"
      ]
    },
    size: {
      sm: [
        // Spacing
        "gap-1.5 px-3 py-1.5",
        // Border Radius
        "rounded-md",
        // Conditional Spacing
        "has-[>svg]:px-2.5"
      ],
      default: [
        // Border Radius
        "rounded-md",
        // Spacing
        "px-4 py-2",
        // Conditional Spacing
        "has-[>svg]:px-4"
      ],
      lg: [
        // Border Radius
        "rounded-md",
        // Spacing
        "px-6 py-2",
        // Conditional Spacing
        "has-[>svg]:px-4",
        // Typography
        "text-md"
      ],
      icon: [
        // Sizing
        "size-6"
      ]
    },
    effect: {
      press: "active:scale-96 active:shadow-none duration-100",
      shake: "shake",
      bounce: "bounce",
      wobble: "wobble",
      ripple: "ripple"
    },
    focus: "focus:ring-2 focus:ring-focus-ring focus:border-focus-ring"
  },
  defaultVariants: {
    intent: "default",
    size: "default"
  }
});
