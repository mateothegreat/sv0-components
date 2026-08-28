<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { twMerge } from "tailwind-merge";
  import { base, separator } from "./styleset";
  import type { SelectSeparatorProps } from "./types";

  let { ...rest }: SelectSeparatorProps = $props();

  const built = usePropsBuilder(rest).withClassMerge();
</script>

<div
  role="separator"
  aria-orientation={built.orientation}
  class={twMerge(
    base.variants.select("items"),
    separator(
      {
        orientation: built.orientation
      },
      built.class
    )
  )}
  {...rest}>
</div>
