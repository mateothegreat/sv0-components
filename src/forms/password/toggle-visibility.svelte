<script lang="ts">
  import EyeIcon from "~icons/lucide/eye";
  import EyeOffIcon from "~icons/lucide/eye-off";
  import { usePropsBuilder, type WithOptionalClass } from "@sv0/components/utils/props";
  import { usePassword } from "./state.svelte";
  import type { PasswordToggleVisibilityProps } from "./types";

  let {
    ref = $bindable(null),
    class: className,
    ...rest
  }: WithOptionalClass & PasswordToggleVisibilityProps = $props();

  const built = usePropsBuilder(rest).withClassMerge([
    "hover:bg-transparent data-[state=on]:bg-transparent"
  ]);

  const ctx = usePassword();
</script>

<button
  aria-label={ctx.state.hidden ? "Show password" : "Hide password"}
  onclick={() => {
    ctx.state.hidden = !ctx.state.hidden;
  }}
  class={built.class}
  tabindex={-1}>
  {#if ctx.state.hidden}
    <EyeIcon class="stroke-muted-foreground size-5" />
  {:else}
    <EyeOffIcon class="stroke-muted-foreground size-5" />
  {/if}
</button>
