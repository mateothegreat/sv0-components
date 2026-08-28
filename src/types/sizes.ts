/**
 * @file
 *
 *   This module defines the `Size` type, which represents the allowed sizing options for components.
 *
 *   You use this type to enforce consistent sizing props across your component library, ensuring that
 *   only valid size values ("sm", "md", "lg") are accepted. This approach helps prevent runtime
 *   errors and improves type safety when building reusable UI components.
 */

/**
 * Represents the allowed sizing options for components.
 *
 * You use this type to restrict the `size` prop or variable to one of the allowed string literals.
 * This helps you catch errors at compile time and maintain a consistent set of size values.
 *
 * @category Types
 */
export const Size = {
  SM: "sm",
  MD: "md",
  LG: "lg"
} as const;

export type Size = (typeof Size)[keyof typeof Size];
