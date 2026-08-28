import type { Snippet } from "svelte";

export type WithOptionalChildren<T> = T & { children?: Snippet };
export type WithRequiredChildren<T> = T & { children: Snippet };
export type WithClass<T> = T & { class: string };
export type ParentComponentBase<T = unknown> = WithClass<WithOptionalChildren<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
