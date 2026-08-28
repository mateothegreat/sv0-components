<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let {
    class: className,
    children,
    ...restProps
  }: {
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div class={cn("mt-3 flex flex-wrap items-center gap-2", className)} {...restProps}>
  {@render children?.()}
</div>
