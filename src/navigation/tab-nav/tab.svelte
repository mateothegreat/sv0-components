<script lang="ts">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import { getContext } from "svelte";
  import { TAB_CONTEXT_KEY, type TabContext } from "./context.svelte";

  // Step 1: Get the raw context with a generic "any"
  const raw = getContext<TabContext<any>>(TAB_CONTEXT_KEY);

  // Step 2: Infer T from the raw context type
  type T = typeof raw extends TabContext<infer U> ? U : never;

  // Step 3: Now you can use both the value and the type
  const context = raw as TabContext<T>;

  let {
    // We collect the rest of the props so we can pass them straight through to the dom elements.
    ...rest
  }: {
    // Define the props we expect to be passed to the component so type safety kicks in.
    value: T;
    // Define the props we expect to be passed to the component so type safety kicks in.
    class?: string;
  } &
    // This unions with the above shape + allows us to type the children prop automagically.
    WithChildren = $props();

  // Parse the props we really care about safely using the props builder method.
  const built = usePropsBuilder({ ...rest })
    // Merge the class attribute with our default class names (uses clsx under the hood)
    // and expose the className as a prop thats safe to use in the template (vs. `class`).
    .withClassMerge("bg-background shadow-card");

  // We use the derived to create a reactive property that will update when the value changes.
  const isSelected = $derived(context?.selected === built.value);

  // Fires when the button is clicked to update the context.
  const handleClick = () => context?.setSelected(built.value);
</script>

<div class={built.class} {...rest}>
  <div
    class="shadow-mini-inset bg-tab-nav-background text-foreground/50 w-full text-sm leading-[0.01em] font-semibold">
    <button
      class="h-8 rounded-[4px] px-4 py-2 transition-all "
      class:shadow-mini={isSelected}
      class:rounded-lg={isSelected}
      class:text-foreground={isSelected}
      class:dark:bg-tab-nav-accent={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onclick={handleClick}
      type="button"
      aria-selected={isSelected}>
      {#if built.children}
        {@render built.children()}
      {/if}
    </button>
  </div>
</div>
