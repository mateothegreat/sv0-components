<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let {
    class: className,
    children,
    ...restProps
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<div
  data-slot="dialog-header"
  class={cn(
    "border-b-border relative flex items-start justify-between gap-2 border-b p-2.5",
    className
  )}
  {...restProps}>
  {@render children?.()}
</div>
