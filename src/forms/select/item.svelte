<script lang="ts">
  import { Check } from "@lucide/svelte";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { useSelect } from "./state.svelte";
  import { base, item } from "./styleset";
  import { type SelectItemProps } from "./types";

  let { ...rest }: SelectItemProps = $props();

  let ref: HTMLDivElement | undefined = $state();

  const ctx = useSelect();
  const built = usePropsBuilder(rest).withClassMerge();

  onMount(() => {
    ctx.add(built.value, ref!);
  });

  /**
   * Handle clicking on an item.
   *
   * @param e - The mouse event.
   */
  const handleClick = (e: MouseEvent): void => {
    if (built.disabled || ctx.disabled) return;
    e.preventDefault();

    ctx.toggle();

    // Focus trigger after selection in single-select mode.
    if (!ctx.multiple) {
      ctx.hide();
    }
  };

  /**
   * Handle keyboard navigation to detect if a selection was made.
   *
   * @param e - The keyboard event.
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (built.disabled || ctx.disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        ctx.toggle();
        if (!ctx.multiple) {
          ctx.triggerElement?.focus();
          ctx.hide();
        }
        break;
      case "ArrowDown": {
        e.preventDefault();
        ctx.next();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        ctx.prev();
        break;
      }
      case "Home": {
        e.preventDefault();
        ctx.first();
        break;
      }
      case "End": {
        e.preventDefault();
        ctx.last();
        break;
      }
    }
  };
</script>

<div
  bind:this={ref}
  role="option"
  aria-selected={ctx.selected(built.value)}
  aria-disabled={built.disabled || ctx.disabled}
  data-value={built.value}
  data-label={built.label}
  data-selected={ctx.selected(built.value) ? true : undefined}
  data-highlighted={ctx.isHighlighted(built.value) ? "" : undefined}
  data-disabled={built.disabled || ctx.disabled ? "" : undefined}
  tabindex={built.disabled || ctx.disabled ? -1 : 0}
  class={twMerge(
    base.variants.select("items"),
    item(
      {
        size: built.size
      },
      built.class
    )
  )}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  onfocus={() => ctx.highlight(built.value)}
  onmouseenter={() => ctx.highlight(built.value)}
  onmouseleave={() => ctx.highlight()}>
  {#if built.children}
    {@render built.children({
      selected: ctx.selected(built.value),
      highlighted: ctx.isHighlighted(built.value)
    })}
  {:else}
    {built.label}
  {/if}
  {#if ctx.selected(built.value)}
    <Check class="size-4" />
  {/if}
</div>
