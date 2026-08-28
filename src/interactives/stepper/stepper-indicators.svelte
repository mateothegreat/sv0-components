<script lang="ts">
  import clsx from "clsx";
  import { getContext } from "svelte";
  import type { Step } from "./types.js";

  const { steps, currentStep, goToStep } = getContext<{
    steps: Step[];
    currentStep: () => number;
    goToStep: (index: number) => void;
    goToPrevStep: () => void;
    goToNextStep: () => void;
  }>('stepper');
</script>

<div class="mt-6 flex justify-center gap-2 lg:hidden">
  {#each steps as _, index}
    <button
      onclick={() => goToStep(index)}
      class={clsx(
        "h-2.5 w-2.5 rounded-full transition-colors",
        currentStep() === index ? "bg-primary" : "bg-muted hover:bg-primary/50"
      )}
      aria-label="Go to step {index + 1}"
      aria-current={currentStep() === index ? "step" : undefined}></button>
  {/each}
</div>