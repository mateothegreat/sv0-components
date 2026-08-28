<script lang="ts">
  import { cn, type WithElementRef } from "@sv0/components/utils/shadcn";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  class={cn(
    "bg-card text-card-foreground flex flex-col gap-2 overflow-hidden rounded-md border",
    className
  )}
  {...restProps}>
  {@render children?.()}
</div>
