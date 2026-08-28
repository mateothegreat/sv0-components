<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ComponentProps } from "svelte";
  import { Input } from "@sv0/components/forms/input";

  let {
    ref = $bindable(null),
    value = $bindable(""),
    class: className,
    ...restProps
  }: ComponentProps<typeof Input> = $props();
</script>

<Input
  bind:ref
  bind:value
  data-slot="sidebar-input"
  data-sidebar="input"
  class={cn("bg-background h-8 w-full shadow-none", className)}
  {...restProps} />
