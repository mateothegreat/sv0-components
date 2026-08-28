<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("flex flex-col gap-2.5", className)}>
  {@render children()}
</div>
