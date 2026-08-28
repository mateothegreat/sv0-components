<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ComponentProps } from "svelte";
  import { Separator } from "@sv0/components/display/separator";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="sidebar-separator"
  data-sidebar="separator"
  class={cn("bg-sidebar-border", className)}
  {...restProps} />
