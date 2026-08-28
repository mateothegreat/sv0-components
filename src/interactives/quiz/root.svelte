<script lang="ts">
  import { Config, type ConfigProps } from "@sv0/components/interactives/quiz/types";
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { setContext } from "svelte";
  import { CONTEXT_KEY } from "./context.svelte";

  const {
    ...rest
  }: {
    config: ConfigProps;
  } & WithChildren &
    WithOptionalClass = $props();

  const built = usePropsBuilder(rest)
    .withInstantiate("config", (v) => Config.fromProps(v))
    .withClassMerge("space-y-4");

  setContext(CONTEXT_KEY, { config: built.config });

  // let currentQuestionIndex = $state(0);
  // let answers = $state<Record<string, any>>({});
  // let quizState = $state<"active" | "completed" | "review">("active");
  // let showHint = $state(false);
  // let showFeedback = $state(false);
  // let selectedAnswer = $state<any>(null);
  // let startTime = $state(Date.now());
  // let attempts = $state(1);

  // const currentQuestion = $derived(built.config.questions[currentQuestionIndex]);

  // const handleAnswerSelect = (answer: any) => {
  //   selectedAnswer = answer;
  //   answers[currentQuestion.id] = answer;
  // };

  // const handleNextQuestion = () => {
  //   if (showFeedback) {
  //     showFeedback = false;
  //     selectedAnswer = null;
  //     showHint = false;

  //     if (currentQuestionIndex < built.config.questions.length - 1) {
  //       currentQuestionIndex += 1;
  //     } else {
  //       handleQuizComplete();
  //     }
  //   } else {
  //     showFeedback = true;
  //   }
  // };

  // const handlePreviousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     currentQuestionIndex -= 1;
  //     showFeedback = false;
  //     selectedAnswer = answers[built.config.questions[currentQuestionIndex - 1].id] || null;
  //     showHint = false;
  //   }
  // };

  // const handleQuizComplete = () => {
  //   const correctAnswers = built.config.questions.reduce((count, question) => {
  //     return answers[question.id] === question.options?.find((o) => o.correct)?.value
  //       ? count + 1
  //       : count;
  //   }, 0);

  //   const score = Math.round((correctAnswers / built.config.questions.length) * 100);
  //   const timeSpent = Math.round((Date.now() - startTime) / 1000);
  //   const passed = score >= built.config.grade.min;

  //   const result: Result = {
  //     score,
  //     totalQuestions: built.config.questions.length,
  //     correctAnswers,
  //     timeSpent,
  //     passed,
  //     answers
  //   };

  //   quizState = "completed";
  //   onComplete?.(result);
  // };

  // const handleRetake = () => {
  //   if (attempts < built.config.grade.attempts) {
  //     currentQuestionIndex = 0;
  //     answers = {};
  //     quizState = "active";
  //     showHint = false;
  //     showFeedback = false;
  //     selectedAnswer = null;
  //     attempts += 1;
  //     startTime = Date.now();
  //   }
  //   onRetake?.();
  // };

  // const isAnswerCorrect = (questionId: string, answer: any) => {
  //   const question = built.config.questions.find((q) => q.id === questionId);
  //   return question?.options?.find((o) => o.correct)?.value === answer;
  // };
</script>

<div class={built.class}>
  {@render built.children()}
  <!-- {#if quizState === "active"} -->
  <!-- <Card.Content class="space-y-6">
      <Quiz.Question
        question={currentQuestion}
        {selectedAnswer}
        {showFeedback}
        {showHint}
        onAnswerSelect={handleAnswerSelect}
        onHintToggle={() => (showHint = !showHint)} />
      <Quiz.Controls
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        {showFeedback}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === built.config.questions.length - 1}
        isAnswerSelected={selectedAnswer !== null} />
    </Card.Content> -->
  <!-- {:else if quizState === "completed"} -->
  <!-- <Quiz.Completed
      config={built.config}
      {answers}
      {attempts}
      onRetake={handleRetake}
      onReview={() => (quizState = "review")} /> -->
  <!-- {:else if quizState === "review"} -->
  <!-- <Quiz.Review
      config={built.config}
      {answers}
      onBack={() => (quizState = "completed")}
      {isAnswerCorrect} /> -->
  <!-- {/if} -->
</div>
