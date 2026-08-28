<script lang="ts">
  import { Checkbox } from "@sv0/components/forms/checkbox";
  import type { WithElementRef } from "@sv0/components/utils/shadcn";
  import type { HTMLAttributes } from "svelte/elements";
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav
  bind:this={ref}
  data-slot="breadcrumb"
  class={className}
  aria-label="breadcrumb"
  {...restProps}>
  {@render children?.()}
</nav>

<Checkbox />
