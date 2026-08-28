<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { createStyleSet } from "@sv0/stylesets";
  import { Meter } from "bits-ui";
  import { usePassword } from "./state.svelte";
  import type { PasswordStrengthProps } from "./types";

  let { ...rest }: PasswordStrengthProps = $props();

  const built = usePropsBuilder(rest);
  const ctx = usePassword();

  const barStyleSet = createStyleSet({
    base: "h-full transition-all duration-500",
    variants: {
      score: {
        0: "bg-red-500",
        1: "bg-pink-500",
        2: "bg-yellow-500",
        3: "bg-yellow-500",
        4: "bg-lime-500"
      }
    },
    defaultVariants: {
      score: 0
    }
  });

  const barStyle = $derived(barStyleSet({ score: ctx.strength() }));

  const barWidth = $derived.by(() => {
    const score = ctx.state.tainted && ctx.strength() < 1 ? 1 : ctx.strength();
    return `${(score / 4) * 100}%`;
  });
</script>

<Meter.Root
  value={ctx.strength()}
  class="bg-accent relative h-[6px] w-full gap-1 overflow-hidden rounded-full"
  min={0}
  max={4}
  {...built.rest()}>
  <div class={barStyle} style="width: {barWidth};"></div>
  <!-- This creates the gaps between the bars. -->
  <div class="absolute top-0 left-0 z-10 flex h-[6px] w-full place-items-center gap-1">
    {#each Array.from({ length: 4 }) as _, i (i)}
      <div class="ring-background h-[6px] w-1/4 rounded-full ring-3"></div>
    {/each}
  </div>
</Meter.Root>
