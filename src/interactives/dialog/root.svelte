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
  data-state="open"
  class={cn(
    [
      "relative",
      "animate-in",
      "fade-in-0",
      "zoom-in-95",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=closed]:zoom-out-95",
      "overflow-hidden",
      "rounded-lg",
      "border",
      "duration-300"
    ],
    className
  )}
  {...restProps}>
  {@render children?.()}
</div>
