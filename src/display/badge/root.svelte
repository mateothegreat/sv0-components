<script lang="ts">
  import type { WithChildren, WithOptionalClass } from "@sv0/components/utils/props";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";

  const {
    ...rest
  }: {
    href?: string;
    intent?: VariantProps<typeof styleSet>["intent"];
    size?: VariantProps<typeof styleSet>["size"];
  } & WithChildren &
    WithOptionalClass = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const styleSet = createStyleSet({
    base: [
      // Layout
      "inline-flex w-fit items-center justify-center gap-1",
      // Typography
      "whitespace-nowrap",
      // Visual
      "overflow-hidden rounded-sm border",
      // Transitions
      "transition-[color,box-shadow]",
      // Focus states
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      // Invalid states
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      "dark:aria-invalid:ring-destructive/40",
      // SVG children
      "[&>svg]:pointer-events-none [&>svg]:size-3"
    ],
    variants: {
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-sm",
        md: "px-2.5 py-0.5 text-base",
        lg: "px-3 py-0.5  text-lg"
      },
      intent: {
        primary: [
          "bg-primary text-primary-foreground",
          "border-transparent",
          "[a&]:hover:bg-primary/90"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border-transparent",
          "[a&]:hover:bg-secondary/90"
        ],
        destructive: [
          "bg-destructive text-white",
          "border-transparent",
          "dark:bg-destructive/70",
          "[a&]:hover:bg-destructive/90",
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
        ],
        outline: ["text-foreground", "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground"]
      }
    },
    defaultVariants: {
      size: "sm",
      intent: "primary"
    }
  });

  const style = styleSet(
    {
      intent: built.intent,
      size: built.size
    },
    built.class
  );
</script>

<span class={style}>
  {@render built.children?.()}
</span>
