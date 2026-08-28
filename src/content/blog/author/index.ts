/**
 * @file
 *
 *   Blog Author Component Exports
 *
 *   Here we use the namespace pattern to merge the type members into the namespace, embracing the
 *   idiomatic nature of Svelte.
 */
import AuthorComponent from "./author.svelte";
import type { AuthorType as AuthorTypeDef } from "./types";

/**
 * Runtime object that holds all related components. This is what will exist in the compiled
 * JavaScript.
 */
export const Content = {
  Author: AuthorComponent
} as const;

/**
 * Declaration merging: we "reopen" the Content name as a namespace to attach types. These types are
 * erased at runtime but are available in the same dot-notation API as the runtime members.
 */
export declare namespace Content {
  export type AuthorType = AuthorTypeDef;
}
