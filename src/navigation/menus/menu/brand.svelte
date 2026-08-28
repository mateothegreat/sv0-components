<script lang="ts">
  import type { NavigationMenuProps } from "./types.js";

  interface Props {
    brand: NavigationMenuProps["brand"];
  }

  let { brand }: Props = $props();
</script>

<a href={brand.href} class="flex items-center gap-2">
  {#if brand.logo}
    <img src={brand.logo} class="max-h-8 dark:invert" alt="{brand.name} Logo" />
  {/if}
  <span class="text-lg font-semibold tracking-tighter">{brand.name}</span>
</a>
