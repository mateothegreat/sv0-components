<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Drawer as DrawerPrimitive } from "vaul-svelte";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
  bind:ref
  data-slot="drawer-title"
  class={cn("text-foreground font-semibold", className)}
  {...restProps} />
