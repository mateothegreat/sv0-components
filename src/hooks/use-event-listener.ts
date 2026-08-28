/**
 * @file
 *
 *   This file provides type-safety by means of a Svelte hook that manages event listeners
 *   for various target types (window, document, HTMLElement, AbortSignal, etc.)
 *
 *   When you frequently need to add event listeners to DOM elements, the `window`, or the
 *   `document`, a naive implementation can lead to memory leaks if listeners are not
 *   cleaned up when a component is destroyed. Furthermore, proper idiomatic TypeScript
 *   usage demands that we're ensuring type safety at all costs. For the event object,
 *   this can be cumbersome, especially with dynamic targets like those from Svelte's
 *   `bind:this` directive.
 *
 *   By integrating with Svelte's `onMount` lifecycle function, we can automatically handle
 *   the setup and tear-down of event listeners, preventing memory leaks. TypeScript
 *   function overloads are used to provide type inference, to give you end-to-end type
 *   safety whether your target is known at compile-time or resolved at runtime.
 *
 *   ## Rationale
 *
 *   1. **Lifecycle-Aware:** We wrap the `addEventListener` and `removeEventListener` calls
 *        within Svelte's `onMount` life-cycle function, so that listeners are correctly
 *        **added** when the component mounts and **removed** when it unmounts.
 *   2. **Type-Safe Overloads:** We provide multiple function signatures (overloads). One
 *        handles cases where the event target is known (e.g., `window`), giving you exact
 *        types for the event object in your handler. Another handles nullable targets,
 *        providing a safe fallback for scenarios like `bind:this`.
 *   3. **Svelte `bind:this` Compatibility:** Designed to work seamlessly with Svelte's
 *        `bind:this` directive so you can pass a variable that will be populated by
 *        `bind:this` directly to the hook.
 *
 * @category Hooks
 */
import { onMount } from "svelte";

/**
 * Utility type that maps a target to its corresponding browser-provided event map.
 *
 * Use this conditional type to retrieve the correct set of event definitions for a given
 * event target. For instance, if you provide `Window` as the target `T`, this type
 * resolves to `WindowEventMap`, which contains all valid events for the `window` object
 * (like `resize` and `scroll`).
 *
 * This is the mechanism that powers strong type inference in the `useEventListener` hook,
 * that way we have both the event name and the event object in the handler correctly
 * typed.
 *
 * If the provided type `T` does not match one of the known event targets, this type
 * resolves to `never`, which is the final fallback.
 *
 * @category Hooks
 */
type EventMapFor<T> = T extends Window
  ? // Map the `Window` target to the `WindowEventMap` type.
    WindowEventMap
  : T extends Document
    ? // Map the `Document` target to the `DocumentEventMap` type.
      DocumentEventMap
    : T extends HTMLElement
      ? // Map the `HTMLElement` target to the `HTMLElementEventMap` type.
        HTMLElementEventMap
      : T extends AbortSignal
        ? // Map the `AbortSignal` target to the `AbortSignalEventMap` type.
          AbortSignalEventMap
        : // If the provided type `T` does not match one of the known event targets,
          // this type resolves to `never`, which is the final fallback.
          never;

/**
 * Attaches an event listener to a target in a life-cycle aware and type-safe manner.
 *
 * This hook simplifies event listener management in Svelte components to automatically
 * handle the life-cycle through mounting and unmounting and prevent easily missed (and
 * just as easily avoidable) memory leaks.
 *
 * We provide two primary overloads to handle different scenarios:
 *
 * 1. **Known Target:** When you provide a target that is known at compile time (like
 *    `window`, `document`, or a non-nullable `HTMLElement`), we provide full type
 *    inference for the event name and the `event` object passed to your handler.
 * 2. **Nullable Target:** When your target might be `null` at the time the hook is called (a
 *    common case when using Svelte's `bind:this`), we provide a safe fallback. The event
 *    types are more generic, but the hook still works correctly, attaching the listener
 *    once the target becomes available.
 *
 * @param target - Event target you are attaching the listener. This can be `window`,
 *   `document`, an `HTMLElement`, an `AbortSignal`, or `null`.
 * @param eventName - Name of the event you want to listen for (e.g., 'click', 'resize').
 * @param handler - Callback function to execute when the event occurs.
 * @param options - Optional configuration object for the event listener, matching the
 *   `addEventListener` options.
 *
 * @example
 *
 * ```svelte
 * <script lang="ts">
 *   import { useEventListener } from './use-event-listener';
 *
 *   // Example 1: Listening to a known global target like `window`.
 *   // The `event` object in the handler is correctly typed as `UIEvent`.
 *   useEventListener(window, "resize", (event) => {
 *     console.log("Window resized to:", window.innerWidth, event.type);
 *   });
 *
 *   // Example 2: Using Svelte's `bind:this` with a nullable target.
 *   let myButton: HTMLButtonElement | null = null;
 *
 *   // The hook safely handles `myButton` being `null` initially.
 *   // The `event` object is a generic `MouseEvent` which you can cast if needed.
 *   useEventListener(myButton, "click", (event) => {
 *     if (myButton) {
 *       myButton.textContent = 'Clicked!';
 *     }
 *     console.log("Button clicked:", event.button);
 *   });
 * </script>
 *
 * <button bind:this={myButton}>Click Me</button>
 * ```
 *
 * @example
 *
 * ```ts
 * // Example 3: Using an AbortSignal for cleanup.
 * const controller = new AbortController();
 *
 * // This listener will be invoked when `controller.abort()` is called.
 * // The `event` object here is correctly typed as `Event`.
 * useEventListener(controller.signal, 'abort', (event) => {
 *   console.log('peration was aborted!', event.type);
 * });
 *
 * // To trigger the event:
 * // controller.abort();
 * ```
 *
 * @overload Overload #1: When the target's type is statically known and not null, this
 *   overload provides type inference for both the event name and the event object within
 *   the handler.
 */
export function useEventListener<
  T extends Window | Document | HTMLElement | AbortSignal,
  K extends keyof EventMapFor<T>
>(
  target: T,
  eventName: K,
  handler: (event: EventMapFor<T>[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * @overload Overload #2: When the target can be `null` (e.g., when using Svelte's
 *   `bind:this`) this overload provides a safe fallback. It accepts a `null` target and
 *   uses a generic `Event` type for the handler, preventing type errors while maintaining
 *   runtime correctness.
 */
export function useEventListener(
  target: null,
  eventName: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * @overload Overload #3: This is the implementation signature that powers the hook. You
 *   do not call this signature directly; TypeScript's overload resolution selects one of
 *   the public signatures above based on the arguments you provide.
 */
export function useEventListener(
  target: any,
  eventName: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
): void {
  onMount(() => {
    /**
     * Check if the target exists before adding a listener for `bind:this` scenarios where
     * the target is `null` before the component mounts.
     */
    if (!target) {
      return;
    }

    /**
     * Now we cast the handler to a generic `EventListener` type (as `addEventListener`
     * expects this) to ensure the `event` object passed to the handler is typed.
     */
    target.addEventListener(eventName, handler as EventListener, options);

    /**
     * This function runs when the component is destroyed given the `onMount` function
     * returns a cleanup function, we tap into this.
     */
    return () => target.removeEventListener(eventName, handler as EventListener, options);
  });
}
