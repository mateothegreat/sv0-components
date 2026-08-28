/**
 * @file
 *
 *   Provides utilities for generating random strings.
 *
 *   ## Provides
 *
 *   - **`randomString`:** Generates a random string of a given length.
 */

/**
 * Generates a random string of a given length.
 *
 * @param length - The length of the random string.
 *
 * @returns A random string.
 *
 * @example
 *
 * ```typescript
 * const randomString = randomString(10);
 * console.log(randomString); // "abcdefghij"
 * ```
 */
export const randomString = (length: number = 10) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
