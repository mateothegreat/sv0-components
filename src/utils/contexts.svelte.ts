/**
 * Provides a typed context using a unique symbol with helper functions to set, get, and check for
 * the context.
 *
 * @param description Optional debug label for DevTools/logging.
 *
 * @returns An object with the context key, set, get, and has functions.
 *
 * @example
 *
 * ```ts
 * const context = createManagedContext<FileTreeInstance>("file-tree-instance");
 * context.set(new FileTreeInstance({ items: [] }));
 * context.get();
 * context.has();
 * ```
 *
 * @category Utilities
 */
// export const createManagedContext = <T>(description?: string) => {
//   // const key = Symbol(description);
//   const key = description;
//   return {
//     key,
//     set: (value: T) => setContext(key, value),
//     get: () => getContext<T>(key),
//     has: () => hasContext(key)
//   } as const;
// };

import { getContext, setContext } from "svelte";

export type ManagedContext<T> = {
  key: symbol;
  context: T;
};

// export type ManagedContext<T> = {
//   get: (key: string) => T;
//   set: (value: T) => void;
// };

export type CreateManagedContextArgs<T> = {
  key?: symbol | string;
  value: T;
};

const isManagedContextArgs = <T>(x: unknown): x is CreateManagedContextArgs<T> => {
  return !!x && typeof x === "object" && "value" in x;
};

export const createManagedContext = <T>(
  args: CreateManagedContextArgs<T> | T
): ManagedContext<T> => {
  let key: symbol;
  let value: T;

  if (isManagedContextArgs<T>(args)) {
    key = typeof args.key === "string" ? Symbol(args.key) : (args.key ?? Symbol("managed-context"));
    value = args.value;
  } else {
    key = Symbol("managed-context");
    value = args;
  }

  const _value = $state<T>(value);

  setContext(key, _value);

  return { key, context: _value };
};

export const getManagedContext = <T>(key: symbol) => {
  const context = getContext(key);
  if (context) {
    return context;
  }
  throw new Error(`context with key ${key.toString()} not found`);
};

// export function setTabContext<T>(context: TabContext<T>) {
//   setContext(TAB_CONTEXT_KEY, context);
// }

// export function getTabContext<T>(): TabContext<T> {
//   return getContext(TAB_CONTEXT_KEY);
// }
