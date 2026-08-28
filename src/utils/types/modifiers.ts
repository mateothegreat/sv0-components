import type { HTMLAttributes } from "svelte/elements";

export type WithElementAttrs<T extends HTMLElement = HTMLElement> = Omit<
  HTMLAttributes<T>,
  "children"
>;
