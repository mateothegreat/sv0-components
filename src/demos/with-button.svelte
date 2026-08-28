<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { usePropsBuilder, type WithOptionalChildren } from "@sv0/components/utils/props";

  let {
    ref = $bindable(),
    waiting = $bindable(),
    disabled = $bindable(),
    ...rest
  }: {
    ref?: HTMLElement;
    waiting?: boolean;
    disabled?: boolean;
    onclick?: () => void;
  } & WithOptionalChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge("flex-1 space-y-4");
</script>

<div class="flex flex-1 items-start gap-2.5">
  <div bind:this={ref} class="min-w-0 flex-1"></div>
  {#if !ref}
    <Demo.Waiting />
  {:else}
    <Button
      {disabled}
      intent="outline"
      effect="press"
      onclick={() => {
        if (built.onclick) {
          built.onclick();
        }
      }}>
      Reset
    </Button>
  {/if}
  {@render built.children?.()}
</div>
