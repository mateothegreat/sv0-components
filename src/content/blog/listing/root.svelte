<script lang="ts">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";

  const { ...rest }: WithChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge(
    "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
  );
</script>

<div class={built.class}>
  {@render built.children?.()}
</div>
