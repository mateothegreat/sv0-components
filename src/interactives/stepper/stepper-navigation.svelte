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

<nav
  class="relative mx-auto flex max-w-xs flex-col gap-8 lg:mx-0"
  aria-label="Process steps">
  <div
    class="bg-muted absolute left-6 top-6 w-0.5"
    style="height: calc(100% - 12px); top: 6px;"
    aria-hidden="true">
  </div>

  {#each steps as step, index}
    <button
      onclick={() => goToStep(index)}
      class={clsx(
        "group relative flex items-start gap-4 text-left transition-all duration-300",
        "focus-visible:ring-ring rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        currentStep() === index ? "opacity-100" : "opacity-60 hover:opacity-80"
      )}
      aria-current={currentStep() === index ? "step" : undefined}>
      <div
        class={clsx(
          "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
          "transition-colors duration-300",
          currentStep() === index
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted bg-background group-hover:border-primary/70"
        )}
        aria-hidden="true">
        <span class="text-lg font-medium">{step.id}</span>
      </div>

      <div class="pt-1.5">
        <h3
          class={clsx(
            "text-lg font-semibold transition-colors duration-300",
            currentStep() === index ? "text-foreground" : "text-muted-foreground"
          )}>
          {step.title}
        </h3>
        <p class="text-muted-foreground mt-1 line-clamp-2 text-sm">{step.subtitle}</p>
      </div>
    </button>
  {/each}
</nav>