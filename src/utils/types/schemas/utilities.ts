/**
 * A safe property accessor that returns `undefined` if the key is not present.
 */
export type Get<T, K> = K extends keyof T ? T[K] : undefined;

/**
 * Maximum depth decrement helper for recursion safety. Supported depths: 0..10
 */
export type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export type Dec<N extends number> = Prev[N];

/**
 * A safer function type for being non-recursive leaf.
 */
export type AnyFn = (...args: unknown[]) => unknown;

/**
 * Non-recursive (leaf) primitive types considered leaves for simplification. Note: avoids
 * `any` and broad `Function`.
 */
export type NonRecursiveType =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint
  | AnyFn
  | (new (...args: unknown[]) => unknown);
