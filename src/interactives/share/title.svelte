<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children
  }: {
    children: Snippet;
  } = $props();
</script>

<div class="space-y-1">
  {@render children?.()}
</div>
