<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Toggle as TogglePrimitive } from "bits-ui";
  import { toggleVariants, type ToggleSize, type ToggleVariant } from "./types";

  let {
    ref = $bindable(null),
    pressed = $bindable(false),
    class: className,
    size = "default",
    variant = "default",
    ...restProps
  }: TogglePrimitive.RootProps & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  } = $props();
</script>

<TogglePrimitive.Root
  bind:ref
  bind:pressed
  data-slot="toggle"
  class={cn(toggleVariants({ variant, size }), className)}
  {...restProps} />
