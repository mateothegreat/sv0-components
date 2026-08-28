<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Menubar as MenubarPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: MenubarPrimitive.SeparatorProps = $props();
</script>

<MenubarPrimitive.Separator
  bind:ref
  data-slot="menubar-separator"
  class={cn("bg-border -mx-1 my-1 h-px", className)}
  {...restProps} />
