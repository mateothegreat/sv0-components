<script lang="ts" generics="T">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { onMount } from "svelte";
  import { useSelect } from "./state.svelte";
  import { trigger } from "./styleset";
  import type { SelectTriggerProps } from "./types";

  /**
   * For setting the reference to the trigger element used by other components of the
   * select such as the hiding and showing of the dropdown, items, etc in the context.
   */
  let ref: HTMLButtonElement | undefined = $state();

  /**
   * The context for the select component.
   */
  const ctx = useSelect<T>();

  /**
   * Destructure the props for this component for props building.
   */
  let { ...rest }: SelectTriggerProps<T> = $props();

  /**
   * Build the props by passing them through the props builder in preparation for
   * component rendering.
   */
  const built = usePropsBuilder(rest).withDefaults({
    size: "default",
    width: "full",
    intent: "default"
  });

  /**
   * Register trigger element with the context.
   */
  onMount(() => {
    ctx.triggerElement = ref;
  });

  /**
   * Handle click to toggle dropdown.
   *
   * @param e - The mouse event.
   */
  const handleClick = (e: MouseEvent): void => {
    if (ctx.disabled) return;
    e.preventDefault();
    if (ctx.open) {
      ctx.hide();
    } else {
      ctx.show();
    }
  };

  /**
   * Handle keyboard navigation.
   *
   * @param e - The keyboard event.
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (ctx.disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        ctx.open = true;
        break;
      case "Escape":
        e.preventDefault();
        ctx.open = false;
        break;
    }
  };

  /**
   * Handle blur to close dropdown when focus leaves.
   *
   * @param e - The focus event.
   */
  const handleBlur = (e: FocusEvent): void => {
    // Don't close if focusing an element within the parent element.
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && ctx.contentElement?.contains(relatedTarget)) {
      return;
    }

    // If the focus is not within the content, close the dropdown.
    if (!ctx.contentElement?.contains(document.activeElement)) {
      ctx.open = false;
    }
  };

  /**
   * Derived display value.
   */
  const displayValue = $derived(() => {
    const currentValue = ctx.value;
    if (Array.isArray(currentValue)) {
      return currentValue.length > 0 ? `${currentValue.length} selected` : ctx.placeholder;
    }
    return currentValue || ctx.placeholder;
  });
</script>

<button
  bind:this={ref}
  type="button"
  role="combobox"
  aria-expanded={ctx.open}
  aria-haspopup="listbox"
  aria-controls={ctx.open ? "select-content" : undefined}
  disabled={ctx.disabled}
  data-state={ctx.open ? "open" : "closed"}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  onblur={handleBlur}
  class={trigger(
    {
      size: built.size,
      width: built.width,
      intent: built.intent,
      state: ctx.open ? "open" : "closed"
    },
    built.class
  )}>
  {#if built.children}
    {@render built.children(ctx.value, ctx)}
  {:else}
    {displayValue()}
  {/if}
</button>
