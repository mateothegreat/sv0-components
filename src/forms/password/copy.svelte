<script lang="ts">
  import { Copy } from "@sv0/components/interactives/buttons/copy";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { usePassword } from "./state.svelte";

  let { hidden = $bindable(true), minScore = 3, ...rest } = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const ctx = usePassword();
</script>

<Copy {...rest} text={ctx.state.value} tabindex={-1} class={built.class} />
