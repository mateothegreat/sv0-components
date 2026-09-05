<script lang="ts">
  import { autoUpdate, computePosition, flip, offset } from "@floating-ui/dom";
  import { usePropsBuilder, type WithOptionalClass } from "@sv0/components/utils/props";
  import { useSelect } from "./state.svelte";
  import { contentStyleSet } from "./styleset";
  import type { SelectContentProps, SelectContentStyles } from "./types";

  let { ...rest }: SelectContentProps & SelectContentStyles & WithOptionalClass = $props();

  /**
   * Gain access to the shared context for the select component.
   */
  const ctx = useSelect();

  /**
   * Build the props for the component by passing them through the props builder in
   * preparation for component rendering.
   */
  const built = usePropsBuilder(rest).withDefaults({
    placement: "bottom-start",
    offset: 5
  });

  /**
   * Reactive position + resolved side written by floating-ui and read by the template
   * so that Svelte's own `style` binding never wipes the computed `left`/`top`.
   */
  let pos = $state<{ x: number; y: number; side: string }>({ x: 0, y: 0, side: "bottom" });

  /**
   * Handle positioning with floating-ui to position the select dropdown relative to the
   * trigger.
   */
  let cleanup: (() => void) | null = null;
  $effect(() => {
    if (!ctx.open || !ctx.triggerElement || !ctx.contentElement) {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      return;
    }

    /**
     * Position the select dropdown relative to the trigger.
     */
    cleanup = autoUpdate(ctx.triggerElement, ctx.contentElement, async () => {
      if (!ctx.triggerElement || !ctx.contentElement) return;

      const { x, y, placement } = await computePosition(
        ctx.triggerElement,
        ctx.contentElement,
        {
          placement: built.placement,
          middleware: [offset(built.offset), flip({ fallbackAxisSideDirection: "end" })]
        }
      );

      pos = { x, y, side: placement.split("-")[0] };
    });

    return () => {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    };
  });

  /**
   * Handle keyboard navigation within content to detect when the user presses the Escape
   * or Tab keys to close the select dropdown.
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (!ctx.open) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        ctx.open = false;
        break;
      case "Tab":
        e.preventDefault();
        ctx.open = false;
        break;
    }
  };

  /**
   * Handler for when the content is open and the user clicks outside of it. When that
   * occurs, close the select dropdown.
   */
  const handleClickOutside = (e: MouseEvent): void => {
    if (!ctx.open) return;
    const target = e.target as Node;
    if (!ctx.contentElement?.contains(target) && !ctx.triggerElement?.contains(target)) {
      ctx.open = false;
    }
  };

  /**
   * Set up listener for when the content is open to close when the user clicks outside of
   * it.
   */
  $effect(() => {
    if (ctx.open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  const style = $derived(() => {
    return contentStyleSet(
      {
        size: built.size,
        width: built.width
      },
      built.class
    );
  });
</script>

{#if ctx.open}
  <div
    bind:this={ctx.contentElement}
    id="select-content"
    role="listbox"
    aria-multiselectable={ctx.multiple ? "true" : undefined}
    data-state="open"
    data-placement={built.placement}
    data-side={pos.side}
    tabindex={-1}
    onkeydown={handleKeyDown}
    {...rest}
    class={style()}
    style={`position: absolute; z-index: 50; left: ${pos.x}px; top: ${pos.y}px; min-width: ${ctx.triggerElement?.offsetWidth}px;`}>
    {@render built.children?.()}
  </div>
{/if}
