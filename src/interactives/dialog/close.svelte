<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } = $props();
</script>

<div
  data-slot="dialog-close"
  {...restProps}
  class="
    absolute
    top-3
    right-3
    opacity-50
    transition-opacity
    hover:opacity-100
    [&_svg:not([class*='size-'])]:size-4
  ">
  {@render children?.()}
</div>
