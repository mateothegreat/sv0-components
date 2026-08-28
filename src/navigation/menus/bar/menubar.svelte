<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Menubar as MenubarPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: MenubarPrimitive.RootProps = $props();
</script>

<MenubarPrimitive.Root
  bind:ref
  data-slot="menubar"
  class={cn("bg-background flex h-9 items-center gap-1 rounded-sm border p-1 shadow-xs", className)}
  {...restProps} />
