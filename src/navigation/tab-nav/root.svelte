<script lang="ts" generics="T">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import { getComponentContext } from "./context.svelte";

  type Props = {
    selected?: T;
    class?: string;
    onclick?: () => void;
  } & WithChildren;

  let { selected = $bindable<T>(), class: className, ...rest }: Props = $props();

  const built = usePropsBuilder({ class: className, ...rest }).withClassMerge(
    "flex items-center text-sm"
  );

  // Create context for child components
  const context = getComponentContext<T>(selected);

  $effect(() => {
    selected = context.context.selected as T;
  });
</script>

<div class={built.class} {...rest}>
  {#if built.children}
    {@render built.children()}
  {/if}
</div>
