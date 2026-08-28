import type { Attachment } from "svelte/attachments";
import type { PreventScrollOptions } from "./types";

export function preventScroll(options: PreventScrollOptions = {}): Attachment {
  return (el: Element) => {
    const keys = options.keydown?.keys || [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "PageDown",
      "PageUp",
      "Home",
      "End",
      " "
    ];
    const {
      target,
      handler = (e: Event): void => e.preventDefault(),
      handlerKey = (e: KeyboardEvent): void => {
        if (keys.includes(e.key)) e.preventDefault();
      },
      wheel: { enable: wheelEnable = true, target: wheelEl = el } = {},
      touchmove: { enable: touchEnable = true, target: touchEl = el } = {},
      keydown: { enable: keyEnable = true, target: keyEl = document } = {}
    } = options;

    const wheelTarget = target || wheelEl;
    const touchTarget = target || touchEl;
    const keyTarget = target || keyEl;

    if (wheelEnable) {
      wheelTarget.addEventListener("wheel", handler, { passive: false });
    }
    if (touchEnable) {
      touchTarget.addEventListener("touchmove", handler, { passive: false });
    }
    if (keyEnable) {
      keyTarget.addEventListener("keydown", handlerKey as EventListener);
    }

    return () => {
      if (wheelEnable) wheelTarget.removeEventListener("wheel", handler);
      if (touchEnable) touchTarget.removeEventListener("touchmove", handler);
      if (keyEnable) {
        keyTarget.removeEventListener("keydown", handlerKey as EventListener);
      }
    };
  };
}
