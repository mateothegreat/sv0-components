<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { providePassword } from "./state.svelte";
  import type { PasswordRootProps } from "./types";

  let {
    ref = $bindable(null),
    hidden = $bindable(true),
    minScore = 3,
    children,
    ...rest
  }: PasswordRootProps = $props();

  const built = usePropsBuilder(rest).withClassMerge("flex flex-col gap-2");

  const ctx = providePassword(minScore);

  // Sync bindable props with context state
  $effect(() => {
    ctx.state.hidden = hidden;
  });

  $effect(() => {
    hidden = ctx.state.hidden;
  });
</script>

<div bind:this={ref} class={built.class} {...built.rest()}>
  {@render children?.()}
</div>
