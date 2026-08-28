<script lang="ts">
  import { Badge } from "@sv0/components/display/badge";
  import { usePropsBuilder } from "@sv0/components/utils/props";

  type Props = {
    tags: string[];
  };

  let { ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("mb-4");
</script>

{#if built.tags.length > 0}
  <div class={built.class} role="group" aria-label="Post tags">
    {#each built.tags as tag (tag)}
      <Badge variant="outline" class="text-xs" aria-label={`Tag: ${tag}`}>
        {tag}
      </Badge>
    {/each}
  </div>
{/if}
