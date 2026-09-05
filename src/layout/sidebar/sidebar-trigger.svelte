<script lang="ts">
  import PanelLeftIcon from "~icons/lucide/panel-left";
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ComponentProps } from "svelte";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { useSidebar } from "@sv0/components/layout/sidebar/context.svelte";

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: ComponentProps<typeof Button> & {
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const sidebar = useSidebar();
</script>

<Button
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  variant="ghost"
  size="icon"
  class={cn("bg-sidebar-button size-7", className)}
  type="button"
  onclick={(e) => {
    onclick?.(e);
    sidebar.toggle();
  }}
  {...restProps}>
  <PanelLeftIcon />
  <span class="sr-only">Toggle Sidebar</span>
</Button>
