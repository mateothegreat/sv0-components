<script lang="ts">
  import ArrowRight from "~icons/lucide/arrow-right";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import type { Snippet } from "svelte";

  type Props = {
    title: string | Snippet;
    subtitle: string | Snippet;
    showReadMoreButton: boolean;
    readMoreText: string;
    readMoreHref: string;
  } & WithChildren;

  let { ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("");
</script>

<div class={built.class}>
  <div class="flex justify-between">
    <h1 class="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
      {#if typeof built.title === "string"}
        {built.title}
      {:else}
        {@render built.title()}
      {/if}
    </h1>
    {#if built.showReadMoreButton}
      <Button variant="link" href={built.readMoreHref}>
        {built.readMoreText}
        <ArrowRight class="h-4 w-4 md:h-6 md:w-6" />
      </Button>
    {/if}
  </div>
  <div class="flex justify-start">
    <span class="text-muted-foreground mt-2 block text-sm md:text-base">
      {#if typeof built.subtitle === "string"}
        {built.subtitle}
      {:else}
        {@render built.subtitle()}
      {/if}
    </span>
  </div>
</div>
