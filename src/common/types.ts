export const Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  CUSTOM: "custom"
} as const;

export type Size = (typeof Size)[keyof typeof Size];
