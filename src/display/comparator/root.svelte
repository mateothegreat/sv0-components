<script lang="ts">
  import type { Types } from "@sv0/components/display/comparator";
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import type { Context } from "./types/context";

  const {
    ...rest
  }: {
    context: Context;
    size: Types.Size;
  } & WithChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge(
    "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
  );
</script>

<div class={built.class} {...rest}>
  {@render built.children?.()}
</div>
