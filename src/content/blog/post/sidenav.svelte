<script lang="ts">
  import { ArrowUp } from "@lucide/svelte";
  import { scrollToTop } from "@sv0/components/utils/scroll";
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<aside class={cn("sticky top-8 h-fit min-w-fit space-y-4", className)}>
  {@render children()}
  <button
    onclick={scrollToTop}
    class="text-muted-foreground/75 hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-200">
    <ArrowUp class="h-4 w-4" />
    Back to top
  </button>
</aside>
