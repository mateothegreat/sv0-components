export type Normalize<T> = T extends true
  ? "default"
  : T extends false
    ? "none"
    : Exclude<T, boolean>;

export type NormalizeProps<T> = {
  [K in keyof T]: Normalize<T[K]>;
};
