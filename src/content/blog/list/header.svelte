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

<div class={cn("text-muted-foreground mb-1 flex text-xs tracking-tight", className)} {...restProps}>
  {@render children?.()}
</div>
