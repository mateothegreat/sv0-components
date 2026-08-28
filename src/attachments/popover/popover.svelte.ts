/**
 * @file
 *
 *   This module provides a popover attachment utility for Svelte 5 that positions floating content
 *   relative to a reference element with precise positioning control.
 *
 *   This attachment utility leverages Floating UI to provide robust positioning logic that handles
 *   viewport boundaries, collision detection, and automatic repositioning. You can position popover
 *   content above, below, to the left, or to the right of any reference element with fine-grained
 *   alignment control.
 *
 *   ## Core Concepts
 *
 *   1. **Reference-based Positioning:** Positions content relative to a specific DOM element rather than
 *        absolute coordinates.
 *   2. **Collision Detection:** Automatically repositions content when it would overflow the viewport.
 *   3. **Alignment Control:** Supports start, center, and end alignment for each positioning side.
 *   4. **Dynamic Updates:** Automatically updates position when the reference element moves or resizes.
 *
 * @category Attachments
 */

import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type Placement,
  type Strategy
} from "@floating-ui/dom";

/**
 * Defines the positioning side for the popover content relative to the reference element.
 *
 * @category Types
 */
export type PopoverSide = "top" | "right" | "bottom" | "left";

/**
 * Defines the alignment of the popover content along the chosen side.
 *
 * @category Types
 */
export type PopoverAlign = "start" | "center" | "end";

/**
 * Configuration options for the popover attachment utility.
 *
 * @category Types
 */
export interface PopoverAttachmentOptions {
  /**
   * The reference element that the popover will be positioned relative to. This element serves as
   * the anchor point for all positioning calculations.
   */
  reference: HTMLElement;

  /**
   * The side of the reference element where the popover should be positioned. Defaults to "bottom"
   * for the most common dropdown-style behavior.
   *
   * @default "bottom"
   */
  side?: PopoverSide;

  /**
   * The alignment of the popover content along the chosen side. "start" aligns to the beginning,
   * "center" centers the content, and "end" aligns to the end of the reference element.
   *
   * @default "center"
   */
  align?: PopoverAlign;

  /**
   * The distance in pixels between the popover content and the reference element. This creates
   * visual separation and prevents the content from directly touching the reference.
   *
   * @default 8
   */
  offset?: number;

  /**
   * The minimum distance in pixels that the popover should maintain from the viewport edges. This
   * prevents the content from being cut off or appearing too close to screen boundaries.
   *
   * @default 8
   */
  padding?: number;

  /**
   * The positioning strategy to use. "absolute" positions relative to the nearest positioned
   * ancestor, while "fixed" positions relative to the viewport. Use "fixed" for better performance
   * with scrolling containers.
   *
   * @default "absolute"
   */
  strategy?: Strategy;

  /**
   * Optional arrow element that will be positioned to point from the popover to the reference
   * element. The arrow will be automatically positioned and styled based on the popover placement.
   */
  arrow?: HTMLElement;

  /**
   * Whether to automatically reposition the popover when it would overflow the viewport. When
   * enabled, the popover will flip to the opposite side if there's more space available.
   *
   * @default true
   */
  autoFlip?: boolean;

  /**
   * Whether to shift the popover along its alignment axis to keep it within the viewport. This
   * prevents the popover from being cut off horizontally or vertically.
   *
   * @default true
   */
  autoShift?: boolean;
}

/**
 * Creates a popover attachment that positions floating content relative to a reference element with
 * automatic collision detection and repositioning.
 *
 * This function provides a robust positioning solution that handles common popover use cases
 * including dropdowns, tooltips, context menus, and modal dialogs. The positioning logic
 * automatically adapts to viewport constraints and provides smooth updates when the reference
 * element moves or resizes.
 *
 * @param node The floating element that will be positioned (the popover content).
 * @param options Configuration options for positioning and behavior.
 *
 * @returns An attachment object with update and destroy methods for managing the positioning.
 *
 * @example
 *
 * ```ts
 * // Basic usage with default bottom positioning
 * const triggerButton = document.getElementById('trigger');
 * const popoverContent = document.getElementById('popover');
 *
 * const attachment = popover(popoverContent, {
 *   reference: triggerButton
 * });
 * ```
 *
 * @example
 *
 * ```ts
 * // Advanced usage with custom positioning and arrow
 * const attachment = popover(popoverContent, {
 *   reference: triggerButton,
 *   side: 'top',
 *   align: 'start',
 *   offset: 12,
 *   padding: 16,
 *   arrow: arrowElement,
 *   strategy: 'fixed'
 * });
 * ```
 *
 * @example
 *
 * ```ts
 * // Usage in a Svelte component with reactive updates
 * let referenceElement: HTMLElement;
 * let popoverElement: HTMLElement;
 *
 * $effect(() => {
 *   if (referenceElement && popoverElement) {
 *     return popover(popoverElement, {
 *       reference: referenceElement,
 *       side: 'right',
 *       align: 'center'
 *     }).destroy;
 *   }
 * });
 * ```
 *
 * @category Attachments
 */
export function popover(node: HTMLElement, options: PopoverAttachmentOptions) {
  let cleanup: (() => void) | undefined;

  /**
   * Converts the simplified side/align format to Floating UI's placement format.
   *
   * @param side The positioning side.
   * @param align The alignment along that side.
   *
   * @returns The corresponding Floating UI placement string.
   */
  const getPlacement = (side: PopoverSide, align: PopoverAlign): Placement => {
    if (align === "center") {
      return side as Placement;
    }
    return `${side}-${align}` as Placement;
  };

  /**
   * Updates the popover position based on the current options and reference element. This function
   * handles all positioning calculations and applies the results to the node.
   */
  const updatePosition = async () => {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }

    const {
      reference,
      side = "bottom",
      align = "center",
      offset: offsetValue = 8,
      padding = 8,
      strategy = "absolute",
      arrow: arrowElement,
      autoFlip = true,
      autoShift = true
    } = options;

    if (!reference) {
      console.warn("Popover attachment: No reference element provided");
      return;
    }

    // Ensure the node has proper positioning styles and is initially positioned off-screen
    // until we have proper coordinates
    Object.assign(node.style, {
      position: strategy,
      left: "-9999px",
      top: "-9999px"
    });

    const placement = getPlacement(side, align);
    const middleware: Array<any> = [offset(offsetValue)];

    // Add collision detection middleware in the correct order
    if (autoFlip) {
      middleware.push(flip());
    }

    if (autoShift) {
      middleware.push(shift({ padding }));
    }

    // Add arrow positioning last if arrow element is provided
    if (arrowElement) {
      middleware.push(arrow({ element: arrowElement }));
    }

    // Perform initial positioning calculation
    const performPositioning = async () => {
      try {
        const result = await computePosition(reference, node, {
          placement,
          strategy,
          middleware
        });

        const { x, y, placement: finalPlacement, middlewareData } = result;

        // Apply positioning to the popover node
        Object.assign(node.style, {
          left: `${x}px`,
          top: `${y}px`,
          position: strategy
        });

        // Position the arrow if provided
        if (arrowElement && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          
          // Determine which side the arrow should point towards
          const [side] = finalPlacement.split("-");
          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
          }[side];

          if (staticSide) {
            // Reset all position properties first
            Object.assign(arrowElement.style, {
              left: "",
              top: "",
              right: "",
              bottom: "",
              position: "absolute"
            });

            // Set the appropriate position
            if (arrowX != null) {
              arrowElement.style.left = `${arrowX}px`;
            }
            if (arrowY != null) {
              arrowElement.style.top = `${arrowY}px`;
            }

            // Position the arrow outside the popover on the static side
            arrowElement.style[staticSide as keyof CSSStyleDeclaration] = "-4px";
          }
        }

        // Add data attribute for styling based on final placement
        node.setAttribute("data-placement", finalPlacement);
      } catch (error) {
        console.error("Popover positioning failed:", error);
      }
    };

    // Perform initial positioning
    await performPositioning();

    // Set up auto-update for ongoing positioning
    cleanup = autoUpdate(reference, node, performPositioning);
  };

  // Initial position update
  updatePosition();

  return {
    /**
     * Updates the popover attachment with new options. This allows you to dynamically change the
     * reference element, positioning, or other configuration without recreating the attachment.
     *
     * @param newOptions The updated configuration options.
     */
    update(newOptions: PopoverAttachmentOptions) {
      options = newOptions;
      updatePosition();
    },

    /**
     * Destroys the popover attachment and cleans up all event listeners and position updates. This
     * should be called when the popover is no longer needed to prevent memory leaks.
     */
    destroy() {
      cleanup?.();
      cleanup = undefined;
    }
  };
}
