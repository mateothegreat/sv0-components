import { autoUpdate, computePosition, flip, offset, shift, type Placement } from "@floating-ui/dom";

export interface FloatingAttachmentOptions {
  anchor: { x: number; y: number }; // virtual coords from mouse click
  placement?: Placement;
}

export function floating(node: HTMLElement, options: FloatingAttachmentOptions) {
  let cleanup: undefined | (() => void);

  const updatePosition = () => {
    // Virtual element representing the click position
    const virtualEl = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: options.anchor.x,
        y: options.anchor.y,
        top: options.anchor.y,
        left: options.anchor.x,
        right: options.anchor.x,
        bottom: options.anchor.y
      })
    };

    cleanup = autoUpdate(virtualEl, node, () => {
      computePosition(virtualEl, node, {
        placement: options.placement ?? "bottom-start",
        middleware: [
          offset(5), // gap
          flip(), // flip if needed
          shift({ padding: 8 }) // keep in viewport
        ]
      }).then(({ x, y }) => {
        Object.assign(node.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    });
  };

  updatePosition();

  return {
    update(newOptions: FloatingAttachmentOptions) {
      options = newOptions;
      cleanup?.();
      updatePosition();
    },
    destroy() {
      cleanup?.();
    }
  };
}
