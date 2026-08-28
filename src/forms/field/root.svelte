<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import type { HTMLFieldsetAttributes } from "svelte/elements";
  import { styleSet } from "./styleset";
  import type { LabelStyles } from "./types";

  let {
    ...rest
  }: {
    disabled?: boolean;
  } & WithChildren &
    WithOptionalClass &
    LabelStyles &
    HTMLFieldsetAttributes = $props();

  const built = usePropsBuilder(rest);

  const style = styleSet(
    {
      orientation: built.orientation,
      size: built.size,
      disabled: built.disabled
    },
    built.class
  );

  console.log(style);
</script>

<div class={style}>
  {@render built.children?.()}
</div>
