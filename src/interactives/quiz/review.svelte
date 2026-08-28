<script lang="ts">
  import { CircleCheck, CircleX } from "@lucide/svelte";
  import { Card } from "@sv0/components/display/card";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { Config } from "@sv0/components/interactives/quiz/types";

  let {
    config,
    answers,
    onBack,
    isAnswerCorrect
  }: {
    config: Config;
    answers: Record<string, any>;
    onBack: () => void;
    isAnswerCorrect: (questionId: string, answer: any) => boolean;
  } = $props();
</script>

<Card.Header>
  <Card.Title>Answer Review</Card.Title>
  <p class="text-muted-foreground">Review your answers and explanations</p>
</Card.Header>
<Card.Content class="space-y-6">
  {#each config.questions as question}
    <div class="rounded-lg border p-4">
      <div class="mb-3 flex items-start gap-3">
        {#if isAnswerCorrect(question.id, answers[question.id])}
          <CircleCheck class="mt-1 h-5 w-5 text-green-600" />
        {:else}
          <CircleX class="mt-1 h-5 w-5 text-red-600" />
        {/if}
        <div class="flex-1">
          <h4 class="mb-2 font-medium">
            Question {index + 1}: {question.description}
          </h4>
          <div class="text-muted-foreground mb-2 text-sm">
            Your answer: {answers[question.id]}
          </div>
          <div class="mb-2 text-sm text-green-600">
            Correct answer: {question.options?.find((o) => o.correct)?.value}
          </div>
          <div class="bg-muted rounded p-2 text-sm">
            {question.explanation}
          </div>
        </div>
      </div>
    </div>
  {/each}
  <Button onclick={onBack} class="w-full">Back to Results</Button>
</Card.Content>
