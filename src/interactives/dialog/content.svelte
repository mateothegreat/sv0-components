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

<div data-slot="dialog-description" class={cn("p-2.5", className)} {...restProps}>
  {@render children?.()}
</div>
