<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { cn, type WithoutChild } from "@sv0/components/utils/shadcn";
  import { Accordion as AccordionPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps["level"];
  } = $props();
</script>

<AccordionPrimitive.Header {level} class="hover:data-[state=closed]:bg-muted/25 flex px-2.5">
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={cn(
      [
        // Layout
        "flex flex-1 items-start justify-between gap-4",
        // Spacing & Typography
        "py-4 text-left text-sm font-medium",
        // Styling
        "rounded-md",
        // Focus & Interaction States
        "focus-visible:border-ring focus-visible:ring-ring/50 transition-all outline-none focus-visible:ring-[3px]",
        // Disabled State
        "disabled:pointer-events-none disabled:opacity-50",
        // Dynamic State
        "[&[data-state=open]>svg]:rotate-180"
      ],
      className
    )}
    {...restProps}>
    {@render children?.()}
    <ChevronDownIcon
      class="
        text-muted-foreground pointer-events-none size-4
        shrink-0
        translate-y-0.5
        transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
