import { createManagedContext, type ManagedContext } from "@sv0/components/utils/contexts.svelte";

export const TAB_CONTEXT_KEY = Symbol("tab-nav");

export interface TabContext<T> {
  selected: T;
  setSelected: (value: T) => void;
}

export const getComponentContext = <T>(value?: T): ManagedContext<TabContext<T>> => {
  const ctx = createManagedContext<TabContext<T>>({
    key: TAB_CONTEXT_KEY,
    value: {
      selected: value as T,
      setSelected: (v: T) => {
        ctx.context.selected = v;
      }
    }
  });
  return ctx;
};
