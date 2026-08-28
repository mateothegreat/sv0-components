<script lang="ts">
  import type {
    StepContentSnippet,
    StepperProps
  } from "@sv0/components/interactives/stepper/types";
  import clsx from "clsx";
  import { onDestroy, type Snippet } from "svelte";

  let {
    steps,
    activeStep = 0,
    autoAdvance = true,
    autoAdvanceInterval = 5000,
    pauseOnHover = true,
    showNavigation = true,
    showMobileIndicators = true,
    class: className,
    onStepChange,
    children
  }: StepperProps & {
    children?: Snippet<[StepContentSnippet]>;
  } = $props();

  let currentStep = $state(activeStep);
  let isPaused = $state(false);
  let intervalId: number | undefined = $state();

  $effect(() => {
    currentStep = activeStep;
  });

  $effect(() => {
    onStepChange?.(currentStep);
  });

  const startAutoAdvance = () => {
    if (autoAdvance && !isPaused && steps.length > 1) {
      intervalId = window.setInterval(() => {
        currentStep = (currentStep + 1) % steps.length;
      }, autoAdvanceInterval);
    }
  };

  const stopAutoAdvance = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  $effect(() => {
    if (autoAdvance && !isPaused) {
      startAutoAdvance();
    } else {
      stopAutoAdvance();
    }

    return () => {
      stopAutoAdvance();
    };
  });

  const pauseAnimation = () => {
    if (pauseOnHover) {
      isPaused = true;
    }
  };

  const resumeAnimation = () => {
    if (pauseOnHover) {
      isPaused = false;
    }
  };

  const goToStep = (index: number) => {
    currentStep = index;
    if (autoAdvance) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 1000);
    }
  };

  const goToPrevStep = () => {
    currentStep = (currentStep - 1 + steps.length) % steps.length;
    if (autoAdvance) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 1000);
    }
  };

  const goToNextStep = () => {
    currentStep = (currentStep + 1) % steps.length;
    if (autoAdvance) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 1000);
    }
  };

  onDestroy(() => {
    stopAutoAdvance();
  });
</script>

<section
  class={clsx("bg-background py-20", className)}
  aria-labelledby="stepper-title"
  onmouseenter={pauseAnimation}
  onmouseleave={resumeAnimation}
  onfocus={pauseAnimation}
  onblur={resumeAnimation}>
  <div class="container px-4 md:px-6">
    {#snippet stepperData()}
      {@const stepperContext = {
        steps,
        currentStep,
        showNavigation,
        showMobileIndicators,
        goToStep,
        goToPrevStep,
        goToNextStep,
        children
      }}
      {stepperContext}
    {/snippet}

    {@render children?.(stepperData())}
  </div>
</section>
