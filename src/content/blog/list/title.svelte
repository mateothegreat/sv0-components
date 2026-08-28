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

<h1
  class={cn(
    "text-foreground font-medium tracking-tight sm:text-lg md:text-xl lg:text-2xl",
    className
  )}
  {...restProps}>
  {@render children?.()}
</h1>
