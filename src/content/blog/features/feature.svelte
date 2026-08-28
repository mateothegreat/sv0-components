<script lang="ts">
  import type { FeatureProps } from "@sv0/components/content/blog/features/types";
  import { Tooltip } from "@sv0/components/display/tooltip";

  let { text, tooltip, icon, children, class: className }: FeatureProps = $props();
</script>

<div class={className}>
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger class="">
        <div class="flex items-center gap-1.25">
          {#if children}
            {@render children({ text, tooltip, icon })}
          {:else}
            <p>{text}</p>
          {/if}
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {tooltip}
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
</div>
