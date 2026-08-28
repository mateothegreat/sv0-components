<script lang="ts">
  import type { Types } from "@sv0/components/blog";
  import { Tooltip } from "@sv0/components/display/tooltip";
  import { cn } from "@sv0/components/utils/shadcn";
  import type { Snippet } from "svelte";

  let {
    icon,
    class: className,
    features
  }: {
    class?: string;
    icon?: Snippet<[Types.Feature]>;
    features: Types.Feature[];
  } = $props();
</script>

<div class={cn("space-y-2.5", className)}>
  {#each features as feature}
    <div class={className}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger class="">
            <div class="flex items-center gap-1.25">
              {#if icon}
                {@render icon(feature)}
              {:else}
                <p>{feature.description}</p>
              {/if}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {feature.title}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  {/each}
</div>
