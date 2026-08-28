import type { Placement } from "@floating-ui/dom";
import { compare } from "@sv0/components/utils";
import { getContext, setContext, tick } from "svelte";
import type { SelectItem, SelectValue } from "./types";

export const SELECT_CONTEXT_KEY = Symbol("select");

/**
 * The SelectState class is responsible for managing the state of the select component.
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
  current = $state<SelectValue<T>>(undefined);

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
   * Whether the select allows multiple selections.
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
  setter?: (value: SelectValue<T>) => void;

  constructor(args: {
    value?: SelectValue<T>;
    open?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    multiple?: boolean;
    placeholder?: string;
    placement?: Placement;
    triggerElement?: HTMLButtonElement;
    contentElement?: HTMLDivElement;
    setter?: (value: SelectValue<T>) => void;
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
  get value(): SelectValue<T> {
    return this.current;
  }

  /**
   * Sets the current selected value(s).
   */
  set value(v: SelectValue<T>) {
    this.current = v;
    this.setter?.(v);
  }

  /**
   * Returns whether the given value is highlighted.
   */
  isHighlighted(v: SelectValue<T>): boolean {
    return compare(this.#highlighted?.value, v);
  }

  /**
   * Highlights the given value or index.
   */
  highlight(v?: SelectValue<T> | number): void {
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
  getRefByValue(v: SelectValue<T>): SelectItem<T> | undefined {
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
        this.#highlighted = this.#itemRefs.find((x) => x.ref === selectedEl) ?? {
          value: this.current as SelectValue<T>,
          ref: selectedEl as HTMLDivElement
        };
        selectedEl.focus();
        return;
      }
    }

    // Otherwise, focus the first enabled item.
    if (this.contentElement) {
      const firstEl = this.contentElement.querySelector<HTMLElement>(
        '[role="option"]:not([data-disabled])'
      );
      if (firstEl) {
        this.#highlighted = this.#itemRefs.find((x) => x.ref === firstEl) ?? {
          value: firstEl.dataset.value as SelectValue<T>,
          ref: firstEl as HTMLDivElement
        };
        firstEl.focus();
        return;
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
   */
  toggle(): void {
    if (!this.#highlighted) return;
    const v = this.#highlighted.value;

    if (this.multiple && Array.isArray(this.current)) {
      const arr = this.current as SelectValue<T>[];
      // Use deep equality comparison instead of reference equality
      const isSelected = arr.some((x) => compare(x, v));
      const newValue = isSelected ? arr.filter((x) => !compare(x, v)) : [...arr, v];
      this.current = newValue as SelectValue<T>;
      this.setter?.(newValue as SelectValue<T>);
    } else {
      this.current = v as SelectValue<T>;
      this.setter?.(v as SelectValue<T>);
    }
  }

  /**
   * Returns whether the given value is selected.
   */
  selected(v: T): boolean {
    return this.multiple
      ? Array.isArray(this.current) && this.current.some((x) => compare(x, v))
      : compare(this.current, v);
  }

  /**
   * Adds an item to the select.
   */
  add(v: T, ref: HTMLDivElement): void {
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
export const provideSelect = <T>(props: ConstructorParameters<typeof SelectState<T>>[0]) => {
  const state = new SelectState(props);
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
export const useSelect = <T = unknown>() => {
  const context = getContext<SelectState<T>>(SELECT_CONTEXT_KEY);
  if (!context) {
    throw new Error("useSelect must be used within select components");
  }
  return context;
};
