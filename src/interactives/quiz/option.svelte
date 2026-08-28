<script lang="ts">
  import { CheckIcon, X } from "@lucide/svelte";
  import {
    Question,
    QuestionState,
    type OptionPropsType,
    type OptionValue
  } from "@sv0/components/interactives/quiz/types";
  import { usePropsBuilder } from "@sv0/components/utils/props";

  let {
    question,
    option,
    ...rest
  }: {
    question: Question;
    option: OptionPropsType<OptionValue>;
  } = $props();

  const built = usePropsBuilder(rest).withClassMerge(`
    group
    // Base styles:
      w-full rounded-lg p-4 
      
      border-2 border-border
      bg-muted/10 
    // Button element itself:
      [&[data-answered=false][data-disabled=false]]:hover:border-indigo-600 // Only allow hover border if not disabled.
      data-[disabled=true]:cursor-not-allowed // Disable cursor if disabled.
      data-[disabled=true]:opacity-50 // Opacity if disabled.
    // Option selected + correct/incorrect state:
      [&[data-selected=true][data-answered=false][data-correct=false]]:bg-indigo-900/40 // Background color if incorrect.
      [&[data-selected=true][data-answered=false][data-correct=false]]:border-indigo-500 // Border color if correct.
      [&[data-selected=true][data-answered=true][data-correct=false]]:bg-red-900/40 // Background color if incorrect.
      [&[data-selected=true][data-answered=true][data-correct=false]]:border-red-500 // Border color if correct.
      [&[data-selected=true][data-answered=true][data-correct=true]]:bg-green-900/40 // Background color if correct.
      [&[data-selected=true][data-answered=true][data-correct=true]]:border-green-500 // Border color if correct.
    // Option selected state:
      data-[disabled=true]:[&>div>div]:opacity-50 // Opacity if disabled.
      data-[selected=true]:[&>div>div]:bg-indigo-500 // Background color if selected.
      data-[selected=true]:[&>div>div]:border-indigo-200 // Border color if selected.
    // Checkmark circle element:
      [&>div>div]:border-muted // Default circle/checkmark border color.
  `);

  let disabled = $state(false);
</script>

<button
  {disabled}
  class={built.class}
  data-selected={option.selected}
  data-answered={question.state !== QuestionState.Unanswered}
  data-correct={question.state !== QuestionState.Unanswered && option.selected && option.correct}
  data-disabled={disabled}
  onclick={() => {
    if (question.state !== QuestionState.Unanswered) {
      return;
    }
    question.toggleOption(option);
  }}>
  <div class="flex items-center gap-3">
    <!-- checkmark -->
    <div
      class="
        flex size-5 items-center
        justify-center rounded-full border-2
        group-[&[data-selected=true][data-answered=true][data-correct=false]]:border-red-500
        group-[&[data-selected=true][data-answered=true][data-correct=false]]:bg-red-600/50
        group-[&[data-selected=true][data-answered=true][data-correct=true]]:bg-green-600/50
    ">
      {#if question.state !== QuestionState.Unanswered && option.selected}
        {#if option.correct}
          <CheckIcon class="size-3 text-green-300" />
        {:else}
          <X class="size-3 text-red-300" />
        {/if}
      {/if}
    </div>
    <!-- value text -->
    <label>{option.value}</label>
  </div>
</button>
