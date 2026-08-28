<script lang="ts">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";

  const { ...rest }: WithChildren = $props();
  const built = usePropsBuilder(rest).withClassMerge("flex items-center gap-2 text-sm");
</script>

<div class={built.class} {...rest}>
  {@render built.children?.()}
</div>
