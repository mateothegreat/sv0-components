<script lang="ts">
  import { Select } from "@sv0/components/forms/select";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { twMerge } from "tailwind-merge";
  import { group } from "./styleset";
  import type { SelectGroupProps } from "./types";

  let { ...rest }: SelectGroupProps = $props();

  const built = usePropsBuilder(rest).withClassMerge();
  const groupId = `select-group-${Math.random().toString(36).slice(2, 11)}`;
</script>

<div
  role="group"
  aria-labelledby={built.label ? `${groupId}-label` : undefined}
  {...rest}
  class={twMerge(
    group.variants.select({
      container: "default"
    })
  )}>
  {#if built.label}
    <Select.Label label={built.label} />
  {/if}
  <div>
    {@render built.children?.()}
  </div>
</div>
