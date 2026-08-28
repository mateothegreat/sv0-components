<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Drawer as DrawerPrimitive } from "vaul-svelte";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
  bind:ref
  data-slot="drawer-description"
  class={cn("text-muted-foreground text-sm", className)}
  {...restProps} />
