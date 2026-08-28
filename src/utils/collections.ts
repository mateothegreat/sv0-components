/**
 * Include an item in a collection if a condition is true.
 *
 * @param condition - The condition to check.
 * @param item - The item to include in the collection.
 *
 * @returns The collection with the item included if the condition is true.
 *
 * @example
 *
 * ```ts
 * const collection = includeIf(true, { name: "taco" });
 * console.log(collection);
 * // Output: [{ name: "taco" }]
 * ```
 *
 * @category Utils
 */
export const includeIf = <T>(condition: boolean, items: T[]): T[] => {
  return condition ? items : [];
};

/**
 * Cycle through a collection of values and call a function with each value.
 *
 * @param values - The collection of values to cycle through.
 * @param fn - The function to call with each value.
 * @param delay - The delay between each value.
 *
 * @returns An object with start and stop methods.
 */
export const cycle = <T>(
  values: T[],
  fn: (value: T) => void,
  delay = 750
): {
  start: (iterations?: number) => void;
  stop: () => void;
} => {
  let timeout: number | undefined;
  let index = 0;
  let cycles = 0;

  const start = (iterations: number = 1) => {
    if (timeout != null) return; // prevent double start

    timeout = window.setInterval(() => {
      fn(values[index]);
      index++;

      if (index >= values.length) {
        index = 0;
        cycles++;

        // Stop if we've reached the requested number of iterations
        if (iterations > 0 && cycles >= iterations) {
          stop();
        }
      }
    }, delay);
  };

  const stop = () => {
    if (timeout != null) {
      clearInterval(timeout);
      timeout = undefined;
      index = 0;
      cycles = 0;
    }
  };

  return { start, stop };
};
