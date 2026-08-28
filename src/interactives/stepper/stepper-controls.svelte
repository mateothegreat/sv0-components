<script lang="ts">
  import { getContext } from "svelte";

  const { goToPrevStep, goToNextStep } = getContext<{
    steps: unknown[];
    currentStep: () => number;
    goToStep: (index: number) => void;
    goToPrevStep: () => void;
    goToNextStep: () => void;
  }>('stepper');
</script>

<div class="absolute bottom-6 right-6 flex gap-3">
  <button
    onclick={goToPrevStep}
    class="bg-muted hover:bg-muted/80 rounded-full p-3 shadow-sm transition-colors"
    aria-label="Previous step">
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="m18 15-6-6-6 6" />
    </svg>
  </button>
  <button
    onclick={goToNextStep}
    class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-sm transition-colors"
    aria-label="Next step">
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
</div>