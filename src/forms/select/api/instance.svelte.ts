import { mount } from "svelte";
import type { SelectState } from "../state.svelte";
import type { SelectValue } from "../types";
import ImperativeRoot from "./_root.svelte";
import type { SelectConfig } from "./types";

/**
 * Reactive state proxy that wraps the select value and enables two-way binding between
 * the programmatically mounted component and the caller.
 */
export class StateProxy<T> {
  #value = $state<SelectValue<T>>(undefined);
  #ref = $state<HTMLElement>();

  constructor(initialValue: SelectValue<T>, initialRef: HTMLElement) {
    this.#value = initialValue;
    this.#ref = initialRef;
  }

  get value(): SelectValue<T> {
    return this.#value;
  }

  set value(newValue: SelectValue<T>) {
    this.#value = newValue;
  }

  get ref(): HTMLElement | undefined {
    return this.#ref;
  }

  set ref(newValue: HTMLElement) {
    this.#ref = newValue;
  }
}

export class SelectInstance<T> {
  readonly config: SelectConfig<T>;
  readonly #proxy: StateProxy<T>;

  ctx?: SelectState<SelectValue<T>> = $state();
  component?: ReturnType<typeof mount>;

  constructor(config: SelectConfig<T>, proxy: StateProxy<T>) {
    this.config = config;
    this.#proxy = proxy;
  }

  /**
   * Gets the current select value.
   */
  get value(): SelectValue<T> {
    return this.#proxy.value;
  }

  /**
   * Sets the select value.
   */
  set value(newValue: SelectValue<T>) {
    this.#proxy.value = newValue;
  }
}

export type CreateSelectInstanceArgs<T> = {
  target: HTMLElement;
  config: SelectConfig<T>;
  value?: SelectValue<T>;
};

/**
 * Creates a new select component instance programmatically resulting in a
 * `<Select.Root/>` and all dependent children components mounted to the target element.
 *
 * @param args - The arguments for creating the select instance.
 *
 * @returns The select instance reference.
 */
export const createSelectInstance = <T>(
  args: CreateSelectInstanceArgs<T>
): SelectInstance<T> | undefined => {
  const proxy = new StateProxy<T>(args.value, args.target);
  const instance = new SelectInstance<T>(args.config, proxy);

  const ref = mount(ImperativeRoot<T, SelectConfig<T>>, {
    target: args.target,
    props: {
      config: args.config,
      proxy: proxy,
      instance
    }
  });

  instance.component = ref;

  return instance;
};
