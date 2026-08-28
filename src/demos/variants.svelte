<script lang="ts">
  import type { Variant } from "@sv0/components/demos";
  import { Badge } from "@sv0/components/display/badge";
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import type { Snippet } from "svelte";

  type Props = {
    title: string | Snippet;
    description?: string;
  } & WithChildren;

  const {
    ...rest
  }: {
    variants: Variant[];
  } = $props();
  const built = usePropsBuilder(rest);
</script>

<div class="space-x-1.5">
  {#each rest.variants as variant}
    <Badge size="sm" intent="outline" class="font-medium text-sky-500">
      <span class="text-slate-500">{variant.name}:</span>
      {#if Array.isArray(variant.value)}
        {#each variant.value as value, index}
          <span class="text-sky-500">{value}</span>
          {#if index !== variant.value.length - 1}
            <span class="text-slate-600"> | </span>
          {/if}
        {/each}
      {:else}
        {variant.value}
      {/if}
    </Badge>
  {/each}
</div>
