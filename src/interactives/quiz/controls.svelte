<script lang="ts">
  import { Button } from "@sv0/components/interactives/buttons/button";
  import {
    usePropsBuilder,
    type WithOptionalChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import { CONTEXT_KEY, type Instance } from "./context.svelte";
  import { QuestionState } from "./types";

  const {
    ...rest
  }: {
    submit?: string;
    next?: string;
    previous?: string;
    complete?: string;
  } & WithOptionalChildren &
    WithOptionalClass = $props();

  const built = usePropsBuilder(rest).withClassMerge(
    "flex justify-between bg-muted/25 rounded-lg p-3"
  );
  const context = getContext<Instance>(CONTEXT_KEY);
</script>

<div class={built.class}>
  <div class="flex flex-1 items-center">
    {#if context.config.navigation.previous && context.config.index > 0}
      <Button variant="outline" onclick={() => context.config.previous()}>
        {#if built.previous}
          {built.previous}
        {:else}
          Previous Question
        {/if}
      </Button>
    {/if}
  </div>

  <div class="flex items-center text-slate-400">
    Question {context.config.index + 1} / {context.config.questions.length}
  </div>

  <div class="flex flex-1 items-center justify-end">
    {#if context.config.current?.state === QuestionState.Unanswered}
      <Button
        size="lg"
        onclick={() => context.config.current?.answer()}
        disabled={context.config.current?.selected?.length === 0}
        variant="secondary"
        class="bg-blue-700 font-bold text-white select-none hover:bg-blue-800">
        {#if context.config.last}
          {built.submit}
        {:else if built.submit}
          {built.submit}
        {:else}
          Submit Answerd
        {/if}
      </Button>
    {:else if context.config.last}
      <Button
        size="lg"
        onclick={() => context.config.complete()}
        variant="default"
        class="font-bold select-none">
        {#if built.complete}
          {built.complete}
        {:else}
          Complete Quiz
        {/if}
      </Button>
    {:else}
      <Button
        size="lg"
        onclick={() => context.config.next()}
        disabled={context.config.current?.selected?.length === 0}
        class="bg-green-700 font-bold text-white select-none hover:bg-green-800">
        {#if context.config.last}
          {built.complete}
        {:else if built.next}
          {built.next}
        {:else}
          Next Question
        {/if}
      </Button>
    {/if}
  </div>
</div>
