<script lang="ts">
  import type { Types } from "@sv0/components/blog";
  import { scrollToElement } from "@sv0/components/utils/scroll";
  import { cn } from "@sv0/components/utils/shadcn";

  let {
    tableOfContents,
    class: className
  }: { tableOfContents: Types.TableOfContentsItem[]; class?: string } = $props();
</script>

<nav class={cn("space-y-3", className)}>
  <h3 class="text-foreground text-sm font-semibold">On this page</h3>
  <ul class="space-y-2 text-sm">
    {#each tableOfContents as item}
      <li class="pl-{(item.level - 1) * 4}">
        <button
          onclick={() => scrollToElement(item.id)}
          class="text-muted-foreground hover:text-foreground block text-left transition-colors duration-200">
          {item.title}
        </button>
      </li>
    {/each}
  </ul>
</nav>
