<script lang="ts">
  import { CircleCheck, CircleQuestionMark, CircleX, ThumbsDown, ThumbsUp } from "@lucide/svelte";
  import { usePropsBuilder, type WithOptionalChildren } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import { CONTEXT_KEY, type Instance } from "./context.svelte";
  import { QuestionState } from "./types";
  ("./types");

  const {
    ...rest
  }: {
    next?: string;
    previous?: string;
  } & WithOptionalChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge("flex justify-between");
  const context = getContext<Instance>(CONTEXT_KEY);
</script>

{#snippet explanation()}
  {@const correct = context.config.current!.options.filter((o) => o.correct && o.selected)}
  {#if correct.length > 0}
    <div class="ml-8 space-y-1">
      <p class="font-medium">What was answered <strong>correctly</strong>:</p>
      <ul class="ml-2 list-none space-y-2">
        {#each correct as option}
          <li>
            <div class="flex items-center gap-1">
              <ThumbsUp class="h-4 w-4 text-green-500" />
              {option.explanations?.correct}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  {@const incorrect = context.config.current!.options.filter((o) => o.selected && !o.correct)}
  {#if incorrect.length > 0}
    <div class="ml-8 space-y-1">
      <p class="font-medium">What was answered <strong>incorrectly</strong>:</p>
      <ul class="ml-2 list-none space-y-2">
        {#each incorrect as option}
          <li>
            <div class="flex items-center gap-1">
              <ThumbsDown class="h-4 w-4 text-red-500" />
              {option.explanations?.incorrect}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  {@const missed = context.config.current!.options.filter((o) => o.correct && !o.selected)}
  {#if missed.length > 0}
    <div class="ml-8 space-y-1">
      <p class="font-medium">Correct answers that were <strong>missed</strong>:</p>
      <ul class="ml-2 list-none space-y-2">
        {#each missed as option}
          <li>
            <div class="flex items-center gap-1">
              <CircleQuestionMark class="h-4 w-4 text-slate-500" />
              {option.explanations?.correct}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
{/snippet}

{#if context.config.current?.state === QuestionState.Correct}
  <div class="space-y-1 rounded-lg border-2 border-green-600 bg-green-900 p-3 dark:bg-green-900/50">
    <div class="flex items-center gap-2">
      <!-- Circle check icon for correct answer -->
      <CircleCheck class="h-6 w-6" />
      <p class="text-md mt-1 font-bold text-green-800 dark:text-slate-300">
        You answered correctly!
      </p>
    </div>
    {@render explanation()}
  </div>
{:else if context.config.current?.state === QuestionState.Incorrect}
  <div class="space-y-1 rounded-lg border-2 border-red-600 bg-red-900/50 p-3 dark:bg-red-800/45">
    <div class="flex items-center gap-2">
      <!-- Circle check icon for correct answer -->
      <CircleX class="h-6 w-6" />
      <p class="text-md mt-1 font-bold text-red-800 dark:text-slate-300">
        You answered incorrectly!
      </p>
    </div>
    {@render explanation()}
  </div>
{/if}
<!-- 
  {#if showFeedback}
    <div class="bg-muted rounded-lg p-4">
      <div class="flex items-start gap-2">
        {#if selectedAnswer === question.correctAnswer}
          <CheckCircle2 class="text-green-600" />
        {:else}
          <XCircle class="text-red-600" />
        {/if}
        <div>
          <p class="mb-1 font-medium">
            {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
          </p>
          <p class="text-muted-foreground text-sm">
            {question.explanation}
          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if question.hint && !showFeedback}
    <div class="flex justify-center">
      <Button variant="outline" size="sm" onclick={onHintToggle} class="text-xs">
        <Lightbulb class="mr-1 h-3 w-3" />
        {showHint ? "Hide Hint" : "Show Hint"}
      </Button>
    </div>
  {/if}

  {#if showHint && question.hint}
    <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
      <div class="flex items-start gap-2">
        <HelpCircle class="mt-0.5 h-4 w-4 text-blue-600" />
        <p class="text-sm text-blue-800">{question.hint}</p>
      </div>
    </div>
  {/if} -->
