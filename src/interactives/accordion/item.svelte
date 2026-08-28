<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Accordion as AccordionPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
  bind:ref
  data-slot="accordion-item"
  class={cn("border-b-muted/35 border-b last:border-b-0", className)}
  {...restProps} />
