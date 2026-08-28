<script lang="ts">
  import clsx from "clsx";
  import { getContext, type Snippet } from "svelte";
  import type { Step, StepContentSnippet } from "./types.js";

  let { children }: { children?: Snippet<[StepContentSnippet]> } = $props();

  const { steps, currentStep } = getContext<{
    steps: Step[];
    currentStep: () => number;
    goToStep: (index: number) => void;
    goToPrevStep: () => void;
    goToNextStep: () => void;
  }>('stepper');
</script>

<div class="bg-background relative min-h-[500px] overflow-hidden rounded-xl border p-6 shadow-sm">
  {#each steps as step, index}
    {#if children}
      <div
        class={clsx(
          "absolute inset-0 p-8 transition-all duration-500",
          currentStep() === index
            ? "translate-x-0 opacity-100"
            : currentStep() > index
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
        )}
        aria-hidden={currentStep() !== index}
        id="step-content-{step.id}">
        {@render children({ step, index, isActive: currentStep() === index })}
      </div>
    {:else}
      <div
        class={clsx(
          "absolute inset-0 grid gap-8 p-8 transition-all duration-500 md:grid-cols-2",
          currentStep() === index
            ? "translate-x-0 opacity-100"
            : currentStep() > index
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
        )}
        aria-hidden={currentStep() !== index}
        id="step-content-{step.id}">
        <div class="flex flex-col justify-center">
          <h4 class="mb-4 text-2xl font-semibold">{step.title}</h4>
          <p class="text-muted-foreground mb-6 leading-relaxed">{step.subtitle}</p>
          {#if step.description}
            <ul class="space-y-3">
              {#each step.description as item}
                <li class="flex items-start gap-3">
                  <span class="text-base">{item}</span>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
        {#if step.image}
          <div class="flex h-full items-center justify-center">
            <img
              src={step.image}
              alt={step.imageAlt}
              class="h-[80%] w-auto rounded-lg object-cover" />
          </div>
        {/if}
      </div>
    {/if}
  {/each}
</div>
