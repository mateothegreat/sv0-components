<script lang="ts">
  import { Demo, type Variant } from "@sv0/components/demos";
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import type { Snippet } from "svelte";

  type Props = {
    title: string | Snippet;
    description?: string;
    variants?: Variant[];
  } & WithChildren &
    WithOptionalClass;

  const { ...rest }: Props = $props();
  const built = usePropsBuilder(rest).withClassMerge(
    "rounded-lg border border-slate-700 p-2.5 dark:bg-black"
  );
</script>

<div
  class="space-y-2 rounded-lg border-[2px] border-indigo-900 p-4 shadow-md shadow-indigo-900/50 dark:bg-zinc-900/55">
  <div class="mb-1 flex items-center justify-between">
    <div class="flex-1">
      {#if typeof built.title === "function"}
        {@render built.title?.()}
      {:else}
        <h4>
          {built.title}
        </h4>
      {/if}
    </div>
    {#if built.variants}
      <Demo.Variants variants={built.variants} />
    {/if}
  </div>
  {#if built.description}
    <p class="text-muted-foreground max-w-[600px]">{built.description}</p>
  {/if}
  <div class={built.class}>
    {@render built.children?.()}
  </div>
</div>
