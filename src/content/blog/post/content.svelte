<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<article class={cn("flex-1", className)}>
  {@render children()}
</article>
