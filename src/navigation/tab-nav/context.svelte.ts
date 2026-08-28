import { createManagedContext, type ManagedContext } from "@sv0/components/utils/contexts.svelte";

export const TAB_CONTEXT_KEY = Symbol("tab-nav");

export interface TabContext<T> {
  selected: T;
  setSelected: (value: T) => void;
}

let context: ManagedContext<TabContext<any>>;

export const getComponentContext = <T>(value?: T): ManagedContext<TabContext<T>> => {
  if (context) {
    return context as ManagedContext<TabContext<T>>;
  }

  context = createManagedContext<TabContext<T>>({
    key: TAB_CONTEXT_KEY,
    value: {
      selected: value as T,
      setSelected: (v: T) => {
        context!.context.selected = v;
      }
    }
  });

  return context;
};
