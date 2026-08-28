import { createStyleSet } from "@sv0/stylesets";

export const styleSet = createStyleSet({
  base: [
    "flex rounded-md border px-3 py-1 w-full",
    "bg-background dark:bg-input/30",
    "outline-none disabled:cursor-not-allowed",
    "border-input ring-offset-background placeholder:text-muted-foreground",
    "text-md",
    "focus:ring-ring focus:ring-[2px]",
    "transition-[color,box-shadow] duration-300 "
  ],
  variants: {
    type: {
      input: [],
      file: []
    },
    disabled: [
      "pointer-events-none opacity-50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    ]
  },
  defaultVariants: {
    type: "input"
  }
});
