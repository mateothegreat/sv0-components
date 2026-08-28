/**
 * @file This module provides a set of utilities for generating and managing random colors.
 */

//

/**
 * Defines the curated palette of colors used for random generation.
 *
 * @category Actions
 */
export const colors: string[] = [
  "slate-500",
  "indigo-500",
  "purple-500",
  "pink-500",
  "fuchsia-500",
  "violet-500"
];

/**
 * Randomizes the order of elements in an array using the Fisher-Yates (aka Knuth) shuffle
 * algorithm.
 *
 * This function is a "pure" function, meaning it does not modify the original array you pass to it.
 * Instead, it creates a shallow copy of the array and shuffles the copy, returning the newly
 * shuffled array. This is a best practice as it avoids side effects and makes the function's
 * behavior predictable.
 *
 * This utility is used to ensure that our color selection in `nextColor` is as random as possible.
 *
 * @template T - The type of elements in the array.
 *
 * @param arr The array you want to shuffle.
 *
 * @returns A new array containing the same elements as the input array, but in a random order.
 *
 * @example
 *
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffle(numbers);
 * console.log(shuffledNumbers); // e.g., [3, 1, 5, 2, 4]
 * console.log(numbers); // [1, 2, 3, 4, 5] - The original is unchanged.
 * ```
 *
 * @example
 *
 * ```ts
 * const names = ["Alice", "Bob", "Charlie"];
 * const shuffledNames = shuffle(names);
 * console.log(shuffledNames); // e.g., ["Bob", "Charlie", "Alice"]
 * ```
 *
 * @category Actions
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Selects and returns a single random color class name from the predefined `colors` palette.
 *
 * To ensure a high degree of randomness, this function first shuffles the entire `colors` array and
 * then picks a random element from the newly shuffled array. This approach helps prevent immediate
 * repetition and provides a more organic-feeling color sequence. This is a best practice as it
 * avoids side effects and makes the function's behavior predictable.
 *
 * @returns A single, randomly selected color class name from the `colors` array.
 *
 * @example
 *
 * ```ts
 * const randomColorClass = nextColor();
 * console.log(randomColorClass); // e.g., "purple-500"
 * ```
 *
 * @example
 *
 * ```ts
 * // You can use it to dynamically set an element's class in a template.
 * const className = `bg-${nextColor()}`; // "bg-pink-500"
 * ```
 *
 * @category Actions
 */
export const nextColor = (inputColors?: string[]): string => {
  const colorsToUse = inputColors ?? colors;
  return shuffle(colorsToUse)[Math.floor(Math.random() * colorsToUse.length)];
};

/**
 * Creates a reactive color state that automatically cycles through the color palette at random
 * intervals.
 *
 * This function is a composable or "hook" designed for reactive frameworks like Svelte. It
 * encapsulates the logic for creating a state variable (`binding`), starting a timed loop to update
 * it, and stopping the loop. This is extremely useful for creating dynamic UI effects without
 * cluttering your component logic.
 *
 * ## Core Concepts
 *
 * 1. **Color Palette:** A curated list of Tailwind CSS color class names serves as the foundation for
 *    all color generation.
 * 2. **Randomization:** A robust shuffle algorithm ensures that the color selection is unpredictable,
 *    preventing repetitive patterns.
 * 3. **Reactivity:** The `useRandomColor` hook leverages runes (`$state`) to provide a seamless,
 *    reactive experience. You get a state binding that automatically updates your UI whenever the
 *    color changes.
 * 4. **Lifecycle Control:** You have full control over the color-changing behavior. You can start the
 *    cycle with customizable delay parameters and stop it at any time, which is crucial for
 *    managing component lifecycles and preventing memory leaks. The returned `binding` is a rune
 *    state object, which you can use directly in your component's template. The `schedule` method
 *    kicks off the color cycling, and it's essential to call the `stop` method when your component
 *    is destroyed to prevent memory leaks from orphaned `setTimeout` calls.
 *
 * @param colors - An optional array of color class names to use. If not provided, the default
 *   {colors} array will be used.
 *
 * @returns An object containing the reactive state, a function to start the cycle, and a function
 *   to stop it.
 *
 * @example
 *
 * ```svelte
 * <!-- In a Svelte component -->
 * <script>
 *   import { useRandomColor } from './color-utils';
 *   import { onMount, onDestroy } from 'svelte';
 *
 *   const { binding, schedule, stop } = useRandomColor();
 *
 *   onMount(() => {
 *     // Start cycling colors with a delay between 500ms and 1500ms.
 *     schedule(500, 1500);
 *
 *     // It's crucial to clean up the timer when the component is removed.
 *     return () => stop();
 *   });
 * </script>
 *
 * <div class="p-4 rounded-lg transition-colors duration-500 bg-{binding.value}">
 *   My background color changes automatically!
 * </div>
 * ```
 *
 * @example
 *
 * ```ts
 * // Using it outside of a Svelte component lifecycle (e.g., in a vanilla TS file).
 * const { binding, schedule, stop } = useRandomColor();
 *
 * // The initial value is set.
 * console.log(binding.value); // e.g., "indigo-500"
 *
 * // Start the cycle.
 * schedule();
 *
 * // After a few seconds, the value will have changed.
 * setTimeout(() => {
 *   console.log(binding.value); // e.g., "rose-500"
 *   // Stop the cycle after 5 seconds to prevent it from running indefinitely.
 *   stop();
 * }, 5000);
 * ```
 *
 * @category Actions
 */
export const useRandomColor = (
  colors?: string[]
): {
  binding: { value: string };
  schedule: (minDelay?: number, maxDelay?: number) => { value: string };
  stop: () => void;
} => {
  // Create a new `$state` rune to store the color value.
  const binding = $state({ value: nextColor(colors) });

  let timeout: ReturnType<typeof setTimeout>;

  const scheduleNext = (minDelay = 250, maxDelay = 2000) => {
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    timeout = setTimeout(() => {
      binding.value = nextColor(colors);
      scheduleNext(minDelay, maxDelay);
    }, delay);
  };

  return {
    binding, // Return the whole state object so you can access the value from the rune directly.
    schedule: (minDelay = 250, maxDelay = 2000) => {
      scheduleNext(minDelay, maxDelay);
      return binding;
    },
    stop: () => clearTimeout(timeout)
  };
};
