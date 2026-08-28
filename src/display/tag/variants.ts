import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

export type TagVariant = VariantProps<typeof variants>["variant"];

export const variants = tv({
  base: [
    // Cursor & Interaction
    "cursor-pointer",
    // Focus States
    "focus-visible:border-ring",
    "focus-visible:ring-ring/50",
    "focus-visible:ring-[3px]",
    // Invalid States
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
    // Layout & Display
    "inline-flex",
    "w-fit",
    "shrink-0",
    "items-center",
    "justify-center",
    "gap-1",
    // Overflow & Text
    "overflow-hidden",
    "whitespace-nowrap",
    // Styling
    "rounded-sm",
    "border",
    "px-2",
    "py-0.5",
    "text-xs",
    // Transitions
    "transition-[color,box-shadow]",
    // SVG Styling
    "[&>svg]:pointer-events-none",
    "[&>svg]:size-3"
  ],
  variants: {
    variant: {
      default: [
        "bg-primary",
        "text-primary-foreground",
        "[a&]:hover:bg-primary/90",
        "border-transparent"
      ],
      secondary: [
        "bg-secondary",
        "text-secondary-foreground",
        "[a&]:hover:bg-secondary/90",
        "border-transparent"
      ],
      destructive: [
        "bg-destructive",
        "text-destructive-foreground",
        "[a&]:hover:bg-destructive/90",
        "focus-visible:ring-destructive/20",
        "dark:focus-visible:ring-destructive/40",
        "dark:bg-destructive/70",
        "border-transparent"
      ],
      outline: ["text-foreground", "[a&]:hover:bg-accent", "[a&]:hover:text-accent-foreground"]
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
