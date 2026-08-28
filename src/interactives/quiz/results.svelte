<script lang="ts">
  import type { Renderable } from "@sv0/components/utils/props";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import { CONTEXT_KEY, type Instance } from "./context.svelte";

  const {
    ...rest
  }: {
    title?: Renderable;
    description?: Renderable;
  } = $props();

  const built = usePropsBuilder(rest).withClassMerge("bg-muted/25 rounded-lg p-3");

  const context = getContext<Instance>(CONTEXT_KEY);
  const question = $derived(context.config.current)!;
</script>

<div class={built.class}>
  <div class="text-md font-medium">sdf</div>
</div>
