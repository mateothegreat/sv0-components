<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } = $props();
</script>

<div data-slot="dialog-trigger" {...restProps}>
  {@render children?.()}
</div>
