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

<div bind:this={ref} data-slot="card-content" class={cn("px-3 py-4", className)} {...restProps}>
  {@render children?.()}
</div>
