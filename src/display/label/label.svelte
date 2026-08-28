<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { styleSet } from "./styleset";
  import type { LabelStyles } from "./types";

  let { ...rest }: WithChildren & WithOptionalClass & LabelStyles & HTMLLabelAttributes = $props();

  const built = usePropsBuilder(rest);

  const style = styleSet({}, built.class);
</script>

<label class={style} {...built.rest()}>
  {@render built.children?.()}
</label>
