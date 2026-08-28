<script lang="ts">
  import { Card } from "@sv0/components/display/card";
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

<Card.Root class={cn("border-none", className)} {...restProps}>
  <Card.Content class="flex flex-col">
    {@render children?.()}
  </Card.Content>
</Card.Root>
