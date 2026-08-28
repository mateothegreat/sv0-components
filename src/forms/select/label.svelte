<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { twMerge } from "tailwind-merge";
  import { base, label } from "./styleset";
  import type { SelectLabelProps } from "./types";

  let { ...rest }: SelectLabelProps = $props();

  const built = usePropsBuilder(rest).withClassMerge();
</script>

<div
  role="presentation"
  class={twMerge(
    base.variants.select("items"),
    label(
      {
        size: built.size,
        weight: built.weight
      },
      built.class
    )
  )}
  {...rest}>
  {#if built.children}
    {@render built.children?.()}
  {:else}
    {built.label}
  {/if}
</div>
