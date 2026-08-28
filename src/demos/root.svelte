<script lang="ts">
  import { Tag } from "@sv0/components/display/tag";
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";

  type Props = {
    title: string;
    description?: string;
    title2?: () => void;
    labels?: {
      label: string;
      class?: string;
    }[];
  } & WithChildren &
    WithOptionalClass;

  const { ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("w-full flex-1 ");
</script>

<div class={built.class}>
  <div class="w-fit">
    {#if built.labels}
      <div class="-mr-6 -mb-1 flex justify-end gap-2">
        {#each built.labels as label}
          <Tag variant="outline" class="rounded-md font-semibold tracking-wide {label.class}">
            {label.label}
          </Tag>
        {/each}
      </div>
    {/if}
    <h2>
      {built.title}
    </h2>
  </div>
  {#if built.description}
    <p class="text-muted-foreground text-md">{built.description}</p>
  {/if}
  <div class="mt-2 space-y-6 rounded-lg px-5 py-6 shadow-2xl shadow-slate-900 dark:bg-black">
    {@render built.children?.()}
  </div>
</div>
