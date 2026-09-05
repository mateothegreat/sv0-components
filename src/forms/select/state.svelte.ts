import type { Placement } from "@floating-ui/dom";
import { compare } from "@sv0/components/utils";
import { getContext, setContext, tick } from "svelte";
import type { ItemOf, SelectItem } from "./types";

export const SELECT_CONTEXT_KEY = Symbol("select");

/**
 * Dispatch-friendly view of a select's current value: either a single item, an array of
 * items, or unset. This is what {@link SelectState} works with internally so `toggle`
 * can branch on `Array.isArray(...)` and let TypeScript narrow each branch cleanly.
 *
 * Externally the class still exposes the consumer-facing `T | undefined` — the two
 * shapes are structurally equivalent for any well-formed `T` (either the element type
 * for single-select or `ItemOf<T>[]` for multi-select).
 */
type Internal<T> = ItemOf<T> | ItemOf<T>[] | undefined;

/**
 * The `SelectState` class is responsible for managing the state of the select component.
 *
 * `T` is the *whole value* type expressed by the consumer's `bind:value` store — either
 * a single item type (e.g. `Item | undefined`) for single-select, or an array type
 * (e.g. `Item[]`) for multi-select. Per-item operations (`add`, `highlight`, `selected`,
 * ...) use {@link ItemOf}`<T>` to talk about a single item regardless of whether `T`
 * itself is an array.
 */
export class SelectState<T> {
  /**
   * Internal list of items rendered in the select component for internal instrumentation.
   */
  #itemRefs = $state<SelectItem<T>[]>([]);

  /**
   * The currently highlighted item.
   */
  #highlighted = $state<SelectItem<T>>();

  /**
   * The currently selected value(s).
   */
  current = $state<T | undefined>(undefined);

  /**
   * Whether the select is open.
   */
  open = $state(false);

  /**
   * Whether the select is disabled.
   */
  disabled = $state(false);

  /**
   * Whether the select is required.
   */
  required = $state(false);

  /**
   * The name of the select in the event form submission support is needed.
   */
  name = $state<string | undefined>(undefined);

  /**
   * Whether the select allows multiple selections. Purely a runtime behavior flag; the
   * type of {@link current} is expressed by `T` directly.
   */
  multiple = $state(false);

  /**
   * The placeholder text for the select.
   */
  placeholder = $state<string | undefined>(undefined);

  /**
   * The placement of the content relative to the trigger element.
   */
  placement = $state<Placement>("bottom-start");

  /**
   * The trigger element for the select.
   */
  triggerElement = $state<HTMLButtonElement | undefined>(undefined);

  /**
   * The content element for the select.
   */
  contentElement = $state<HTMLDivElement | undefined>(undefined);

  /**
   * Method that is called when the value changes for updating the state value and
   * propogation to callers parent component.
   */
  setter?: (value: T | undefined) => void;

  constructor(args: {
    value?: T;
    open?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    multiple?: boolean;
    placeholder?: string;
    placement?: Placement;
    triggerElement?: HTMLButtonElement;
    contentElement?: HTMLDivElement;
    setter?: (value: T | undefined) => void;
  }) {
    this.current = args.value;
    this.open = args.open ?? false;
    this.disabled = args.disabled ?? false;
    this.required = args.required ?? false;
    this.name = args.name;
    this.multiple = args.multiple ?? false;
    this.placeholder = args.placeholder;
    this.placement = args.placement ?? "bottom-start";
    this.triggerElement = args.triggerElement;
    this.contentElement = args.contentElement;
    this.setter = args.setter;
  }

  /**
   * Returns the current selected value(s).
   */
  get value(): T | undefined {
    return this.current;
  }

  /**
   * Sets the current selected value(s).
   */
  set value(v: T | undefined) {
    this.current = v;
    this.setter?.(v);
  }

  /**
   * Returns whether the given item value is highlighted.
   */
  isHighlighted(v: ItemOf<T>): boolean {
    return compare(this.#highlighted?.value, v);
  }

  /**
   * Highlights the given item value or index.
   */
  highlight(v?: ItemOf<T> | number): void {
    if (typeof v === "number") {
      // Handle index-based highlighting.
      if (this.#itemRefs.length === 0) return;
      this.#highlighted = this.#itemRefs[(v + this.#itemRefs.length) % this.#itemRefs.length];
    } else {
      // Handle value-based highlighting.
      this.#highlighted = v ? this.#itemRefs.find((x) => compare(x.value, v)) : undefined;
    }
    this.#highlighted?.ref?.focus();
  }

  /**
   * Returns the reference to the item with the given value.
   */
  getRefByValue(v: ItemOf<T>): SelectItem<T> | undefined {
    return this.#itemRefs.find((x) => compare(x.value, v));
  }

  /**
   * Shows (opens) the select dropdown.
   */
  async show(): Promise<void> {
    this.open = true;
    await tick(); // ensure DOM is rendered.

    // Try to find the selected item in the DOM.
    if (this.current && this.contentElement) {
      const selectedEl = this.contentElement.querySelector<HTMLElement>(
        '[role="option"]:not([data-disabled])[data-selected]'
      );
      if (selectedEl) {
        const found = this.#itemRefs.find((x) => x.ref === selectedEl);
        if (found) {
          this.#highlighted = found;
          selectedEl.focus();
          return;
        }
      }
    }

    // Otherwise, focus the first enabled item.
    if (this.contentElement) {
      const firstEl = this.contentElement.querySelector<HTMLElement>(
        '[role="option"]:not([data-disabled])'
      );
      if (firstEl) {
        const found = this.#itemRefs.find((x) => x.ref === firstEl);
        if (found) {
          this.#highlighted = found;
          firstEl.focus();
          return;
        }
      }
    }

    // Fallback: use first itemRef if available.
    if (this.#itemRefs.length > 0) {
      this.#highlighted = this.#itemRefs[0];
      this.#itemRefs[0].ref?.focus();
    }
  }

  /**
   * Hides (closes) the select dropdown.
   */
  hide(): void {
    this.open = false;
    this.#highlighted = undefined;

    // Clear out old DOM refs to prevent memory leaks.
    this.#itemRefs = [];
  }

  /**
   * Toggles the currently highlighted item from selected to unselected and vice versa.
   *
   * Implementation note: the two branches below dispatch on `this.multiple` at runtime.
   * TypeScript cannot statically know, from the opaque generic `T` alone, whether it
   * represents an array (multi-select) or a single value (single-select). Rather than
   * paper over that with `as` casts and lie about the types, the branches operate on
   * narrower structural views of the state (an array via `Array.isArray`, a single item
   * via the highlighted item value), and assign back through the class's own `T`-typed
   * `current` field. Consumers see exactly one shape (`T | undefined`) end-to-end.
   */
  toggle(): void {
    if (!this.#highlighted) return;
    const v = this.#highlighted.value;
    // `next` inhabits {@link Internal}`<T>` — the dispatch-friendly union. It is
    // *structurally* the shape of `T` for any well-formed consumer (either the element
    // type for single-select or an array of it for multi-select), which is why the
    // final assignment to `this.value` is the class's single, deliberate boundary
    // between the internal dispatch union and the consumer-facing `T`.
    let next: Internal<T>;
    const cur: Internal<T> = this.current as Internal<T>;
    if (this.multiple && Array.isArray(cur)) {
      const isSelected = cur.some((x) => compare(x, v));
      next = isSelected ? cur.filter((x) => !compare(x, v)) : [...cur, v];
    } else {
      next = v;
    }
    this.value = next as T;
  }

  /**
   * Returns whether the given item value is currently selected.
   */
  selected(v: ItemOf<T>): boolean {
    if (this.multiple && Array.isArray(this.current)) {
      return this.current.some((x) => compare(x, v));
    }
    return compare(this.current, v);
  }

  /**
   * Adds an item to the select.
   */
  add(v: ItemOf<T>, ref: HTMLDivElement): void {
    this.#itemRefs.push({ value: v, ref });
  }

  /**
   * Highlights the first item.
   */
  first(): void {
    this.highlight(0);
  }

  /**
   * Highlights the last item.
   */
  last(): void {
    this.highlight(this.#itemRefs.length - 1);
  }

  /**
   * Highlights the next item.
   */
  next(): void {
    if (!this.#highlighted) return this.highlight(0);
    const i = this.#itemRefs.findIndex((x) => compare(x.value, this.#highlighted!.value));
    this.highlight(i + 1);
  }

  /**
   * Highlights the previous item.
   */
  prev(): void {
    if (!this.#highlighted) return this.highlight(this.#itemRefs.length - 1);
    const i = this.#itemRefs.findIndex((x) => compare(x.value, this.#highlighted!.value));
    this.highlight(i - 1);
  }
}

/**
 * Creates a new `SelectState` instance and sets it in the context.
 *
 * @param props - The props to create the `SelectState` instance with.
 *
 * @returns The `SelectState` instance.
 */
export const provideSelect = <T>(
  props: ConstructorParameters<typeof SelectState<T>>[0]
): SelectState<T> => {
  const state = new SelectState<T>(props);
  setContext(SELECT_CONTEXT_KEY, state);
  return state;
};

/**
 * Retrieves the current `SelectState` instance from the context.
 *
 * @returns The `SelectState` instance if it exists, otherwise throws an error.
 *
 * @throws An error if the `SelectState` instance is not found.
 */
export const useSelect = <T = unknown>(): SelectState<T> => {
  const context = getContext<SelectState<T>>(SELECT_CONTEXT_KEY);
  if (!context) {
    throw new Error("useSelect must be used within select components");
  }
  return context;
};
