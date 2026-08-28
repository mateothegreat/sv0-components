import { tick } from "svelte";
import type { Attachment } from "svelte/attachments";

export class UseAutoScroll {
  #bottom = $state(true);
  #mo?: MutationObserver;
  #ro?: ResizeObserver;
  #handler: (e: Event) => void;
  #keyHandler: (e: KeyboardEvent) => void;
  #el: HTMLElement;
  #listeners: (keyof HTMLElementEventMap)[] = [
    "scroll",
    "wheel",
    "touchstart",
    "mousedown",
    "keydown"
  ];

  constructor(private debounceMs = 50) {
    this.#handler = this.#debounce(() => this.#scroll(), this.debounceMs);
    this.#keyHandler = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Spacebar"].includes(
          e.key
        ) ||
        (e.key === " " && !e.ctrlKey)
      ) {
        this.#scroll();
      }
    };
  }

  #setup(el: HTMLElement) {
    if (!el) throw new Error("no element provided to UseAutoScroll");
    this.#el = el.parentElement;

    this.#listeners.forEach((event) => {
      this.#el.addEventListener(event, this.#handler, { passive: true });
    });
  }

  setRef = async (el: HTMLElement) => {
    this.#setup(el);

    this.#el.scrollTop = this.#el.scrollHeight;

    this.#mo = new MutationObserver(async () => {
      if (!this.#bottom) return;
      await tick();
      requestAnimationFrame(() => {
        this.#el.scrollTo({ top: this.#el.scrollHeight, behavior: "smooth" });
      });
    });
    this.#mo.observe(this.#el, { childList: true, subtree: true });

    this.#ro = new ResizeObserver(() => {
      if (this.#bottom) {
        this.#el.scrollTo({ top: this.#el.scrollHeight, behavior: "smooth" });
      }
    });
    this.#ro.observe(this.#el);
  };

  destroy = () => {
    this.#mo?.disconnect();
    this.#ro?.disconnect();
    this.#listeners.forEach((event) => {
      this.#el.removeEventListener(event, this.#handler);
    });
  };

  get state(): "scrolling" | "bottom" | "top" {
    return this.#bottom ? "bottom" : this.#el.scrollTop === 0 ? "top" : "scrolling";
  }

  /**
   * Determine if the user has manually taken scroll control away from programmatic scrolling and
   * gone manual.
   *
   * This is required for auto-scroll UX, so we do not override the user's intent.
   *
   * We do this by checking if the user has scrolled to the bottom of the element.
   */
  #scroll() {
    if (!this.#el) return;
    this.#bottom = this.#el.scrollHeight - (this.#el.scrollTop + this.#el.clientHeight + 1) < 10;
    console.log("ssdfupdateBottom", this.#bottom);
  }

  scrollBottom() {
    console.log("scrollBottom", this.#el.scrollHeight);
    this.#el.scrollTo({ top: this.#el.scrollHeight, behavior: "smooth" });
  }

  #debounce<T extends (...args: any[]) => void>(fn: T, wait: number): T {
    let t: number;
    return ((...args: any[]) => {
      clearTimeout(t);
      t = window.setTimeout(() => fn(...args), wait);
    }) as T;
  }
}

export const autoScroll = (instance?: UseAutoScroll): Attachment<HTMLElement> => {
  return (node: HTMLElement) => {
    if (!instance) {
      instance = new UseAutoScroll();
    }
    instance.setRef(node);
    return () => {
      instance?.destroy();
    };
  };
};
