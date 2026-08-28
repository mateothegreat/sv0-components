<script lang="ts">
  import { Quiz } from "@sv0/components/interactives/quiz";
  import {
    usePropsBuilder,
    type Renderable,
    type WithOptionalChildren
  } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import { CONTEXT_KEY, type Instance } from "./context.svelte";

  const {
    ...rest
  }: {
    question: number;
    title?: Renderable;
    description?: Renderable;
  } & WithOptionalChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge();
  const context = getContext<Instance>(CONTEXT_KEY);
  const question = $derived(context.config.current)!;
</script>

<div class={built.class}>
  <div class="space-y-2">
    {#each question.options as option}
      <Quiz.Option {question} {option} />
    {/each}
  </div>
</div>
