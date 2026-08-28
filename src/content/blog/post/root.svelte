<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let {
    children,
    class: className
  }: {
    children: Snippet;
    sidenav?: Snippet;
    class?: string;
  } = $props();
</script>

<div class={cn("flex justify-between gap-4", className)}>
  {@render children()}
</div>
