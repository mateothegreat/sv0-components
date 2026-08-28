import { createStyleSet } from "@sv0/stylesets";

export const styleSet = createStyleSet({
  base: [
    // Layout & Display
    "inline-flex shrink-0 items-center justify-center gap-4"
  ],
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col"
    },
    size: {
      sm: [
        // Spacing
        "gap-1.5 px-3 py-0.75",
        // Border Radius
        "rounded-md",
        // Conditional Spacing
        "has-[>svg]:px-2.5"
      ],
      default: [
        // Spacing
        "px-4 py-2",
        // Conditional Spacing
        "has-[>svg]:px-3",
        // Typography
        "text-base"
      ],
      lg: [
        // Border Radius
        "rounded-md",
        // Spacing
        "px-6 py-2",
        // Conditional Spacing
        "has-[>svg]:px-4"
      ]
    },
    disabled: "pointer-events-none opacity-50"
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default"
  }
});
