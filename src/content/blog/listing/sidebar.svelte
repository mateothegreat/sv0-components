<script lang="ts">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";

  type Props = {} & WithChildren;

  const { ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("mb-4");
</script>

<div class={built.class}>
  {@render built.children?.()}
</div>
