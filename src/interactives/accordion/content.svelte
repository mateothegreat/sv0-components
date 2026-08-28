<script lang="ts">
  import { cn, type WithoutChild } from "@sv0/components/utils/shadcn";
  import { Accordion as AccordionPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class="
    data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down
    text-muted-foreground
    overflow-hidden px-2.5 text-sm"
  {...restProps}>
  <div class={cn(["pt-0 pb-4"], className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
