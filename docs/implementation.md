# Implementation Instructions

For all components, you are required to follow the following instructions.

If you cannot for any reason follow these instructions precisely, you must
notify the user of the reason and propose an alternative solution before
proceeding.

## Component Props

```html
<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { styleSet } from "./styleset";
  import type { CustomStyles } from "./types";

  let {
    ...rest
  }: {
    prop1?: string;
    prop2?: boolean;
    disabled?: boolean;
  } & WithChildren &
    WithOptionalClass &
    CustomStyles &
    HTMLButtonAttributes = $props();

  const built = usePropsBuilder(rest);
</script>
```

## Componenet Styling

### StyleSet

All styling is done using the `@sv0/stylesets` library to allow for dynamic
styling of components using themes and variants.

### Creating a StyleSet

Create a file in the same directory as the component with the name `styleset.ts`
and create a `createStyleSet` instance with the following structure:

```ts
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
    "transition-all"
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
```

### Using a StyleSet

The StyleSet can now be used in components and you can build it by calling the
`styleSet` function to compile the styles into a single string of tailwind
classes with the following structure:

```ts
<script lang="ts">
  import {
    usePropsBuilder,
    type WithOptionalChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";

  const {
    ...rest
  }: {
    prop1?: string;
    prop2?: boolean;
    disabled?: boolean;
  } & WithOptionalClass &
    WithOptionalChildren &
    VariantProps<typeof styleSet> = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const style = styleSet(
    {
      size: built.size,
      intent: built.intent
    },
    built.class
  );
</script>

<div class={style}>
  {#if built.children}
    {@render built.children()}
  {/if}
</div>
```

### Types

Create a file in the same directory as the component with the name `types.ts`
and export a type that is a `VariantProps` of the `StyleSet` you created in the
previous step.

```ts
import type { VariantProps } from "@sv0/stylesets";
import type { styleSet } from "./styleset";

export type ButtonStyles = VariantProps<typeof styleSet>;
```
