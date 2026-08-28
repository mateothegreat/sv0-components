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

<p class={cn("md:text-md text-muted-foreground text-sm lg:text-base", className)} {...restProps}>
  {@render children?.()}
</p>
