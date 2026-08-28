<script lang="ts">
  import { usePropsBuilder, type WithClass } from "@sv0/components/utils/props";
  import { Slider } from "bits-ui";

  let {
    min = 0,
    max = 10,
    step = 1,
    steps,
    suffix,
    ...rest
  }: {
    min?: number;
    max?: number;
    step?: number;
    steps: number | number[];
    suffix?: string;
  } & WithClass<{ class?: string; id: number }> = $props();

  let value = $state(16);

  const built = usePropsBuilder(rest).withClassMerge(
    "border-muted/35 mt-7 mb-3 rounded border-2 md:max-w-[320px]"
  );
</script>

<div class={built.class}>
  <Slider.Root
    type="single"
    step={steps}
    bind:value
    class="relative flex  touch-none items-center select-none"
    trackPadding={3}>
    {#snippet children({ tickItems })}
      <span class="relative h-1 w-full cursor-pointer overflow-hidden rounded-full">
        <Slider.Range class="bg-accent absolute h-full" />
      </span>
      <Slider.Thumb
        index={0}
        class="
          border-border-input bg-background dark:bg-background
          data-active:border-dark-40 z-5
          block size-[17px] cursor-pointer rounded-full border shadow-sm transition-colors 
          focus-visible:ring-2 
          focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none 
          disabled:opacity-50 data-active:scale-[0.98]
        " />
      {#each tickItems as { index, value } (index)}
        <Slider.Tick {index} class=" bg-background  h-2 w-[2px]" />
        <Slider.TickLabel
          {index}
          class="text-muted-foreground/50 data-selected:text-foreground mb-5 text-sm leading-none font-medium">
          {value}
          {suffix}
        </Slider.TickLabel>
      {/each}
    {/snippet}
  </Slider.Root>
</div>
