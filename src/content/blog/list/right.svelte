<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    class: className,
    ...restProps
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<div class="flex h-full w-full flex-col items-end justify-end">
  {@render children?.()}
</div>
