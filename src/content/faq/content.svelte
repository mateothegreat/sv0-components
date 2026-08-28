<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import type { FAQContentProps } from "./types";

  let { content, images = [], tags = [], expanded, ...rest }: FAQContentProps = $props();

  const built = usePropsBuilder(rest).withClassMerge("relative overflow-hidden");

  const containerStyle = $derived(expanded ? "height: auto; opacity: 1" : "height: 0; opacity: 0");
</script>

{#if expanded}
  <div class={built.class} style={containerStyle} {...rest}>
    <div class="space-y-8 pb-8">
      {#if images && images.length > 0}
        <div class="flex flex-wrap gap-4">
          {#each images as image}
            <div
              class="group/image relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 transition-transform duration-300 hover:scale-[1.02] sm:h-[80px] sm:w-[120px] dark:bg-neutral-800">
              <div
                class="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100 transition-opacity duration-300 group-hover/image:opacity-80 dark:from-neutral-700 dark:to-neutral-800">
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <div class="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div class="max-w-xl space-y-4">
          {#if typeof content === "string"}
            <div class="space-y-4">
              {#each content.split("\n\n") as paragraph}
                {#if paragraph.startsWith("# ")}
                  <h4 class="text-xl font-medium" style="opacity: 1; transform: none">
                    {paragraph.slice(2)}
                  </h4>
                {:else}
                  <p class="text-neutral-600 dark:text-neutral-400" style="opacity: 1">
                    {paragraph}
                  </p>
                {/if}
              {/each}
            </div>
          {:else}
            {@render content()}
          {/if}
        </div>

        {#if tags && tags.length > 0}
          <div class="flex flex-wrap content-start gap-2" style="opacity: 1; transform: none">
            {#each tags as tag}
              <span
                class="rounded-full bg-neutral-100 px-4 py-2 text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10">
                {tag}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
