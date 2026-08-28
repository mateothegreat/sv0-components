<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import type { PopoverContext } from "./types";
  const {
    ...rest
  }: {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
  } & WithOptionalClass &
    WithChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge();
  const context = getContext<PopoverContext>("popover");
</script>

<div
  onclick={context.toggle}
  aria-haspopup="dialog"
  aria-expanded={context.state === "open"}
  onkeydown={(e) => e.key === "Escape" && context.close()}>
  {@render built.children?.()}
</div>
