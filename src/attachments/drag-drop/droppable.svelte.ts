import type { Attachment } from "svelte/attachments";
import { dragDropState } from "./state.svelte";

/**
 * Callbacks that the droppable attachment supports.
 */
export type DroppableHandlers<T = unknown> = {
  /**
   * Called when something enters the drop zone element.
   *
   * @param data - The data that was dropped.
   * @param e - The raw drag event that triggered the callback.
   */
  enter?: (data: T, e?: DragEvent) => void;

  /**
   * Called when something leaves the drop zone element.
   *
   * @param data - The data that was dropped.
   * @param e - The raw drag event that triggered the callback.
   */
  leave?: (data: T, e?: DragEvent) => void;

  /**
   * Called when something overlaps the drop zone element.
   *
   * @param data - The data that was dropped.
   * @param e - The raw drag event that triggered the callback.
   */
  over?: (data: T, e?: DragEvent) => void;

  /**
   * Called when something is dropped on the drop zone element.
   *
   * @param data - The data that was dropped.
   * @param e - The raw drag event that triggered the callback.
   */
  drop?: (data: T, e?: DragEvent) => void;
};

/**
 * Options for applying the droppable attachment.
 *
 * The data property is optional, but if provided, it will be of type T. This provides
 * type safety when receiving the data from the handlers.
 */
// export type DroppableOptions<T = void> =
//   | {
//       data: T;
//       handlers?: DroppableHandlers<T>;
//     }
//   | {
//       handlers?: DroppableHandlers<T>;
//     };
export type DroppableOptions<T = void> = {
  handlers: DroppableHandlers<T>;
};

export type DroppableState = {
  over: boolean;
};

export function droppable<T = unknown>(options?: DroppableOptions<T>): Attachment {
  return (element: Element) => {
    const el = element as HTMLElement;

    const state = $state<DroppableState>({
      over: false
    });

    const apply = (key: string, value: boolean) => {
      state[key as keyof DroppableState] = value;
      el.dataset[key] = value.toString();
    };

    /**
     * Handle the drag process resulting in the element entering the drop zone element.
     *
     * @param e - The drag event.
     */
    const handleDragEnter = (e: DragEvent): void => {
      e.preventDefault();
      apply("over", true);
      if (options?.handlers?.enter) {
        options.handlers.enter(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Handle the drag process resulting in the element leaving the drop zone element.
     *
     * @param e - The drag event.
     */
    const handleDragLeave = (e: DragEvent): void => {
      // Only set to false if we're actually leaving the drop zone, not entering a child
      const relatedTarget = e.relatedTarget as Node | null;
      if (relatedTarget && el.contains(relatedTarget)) {
        // We're entering a child element, don't change state
        return;
      }

      apply("over", false);
      if (options?.handlers?.leave) {
        options.handlers.leave(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Handle the drag process resulting in the element overlapping the drop zone element.
     *
     * @param e - The drag event.
     */
    const handleDragOver = (e: DragEvent): void => {
      e.preventDefault();
      if (options?.handlers?.over) {
        options.handlers.over(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Handle the drag process resulting in the element being dropped on the drop zone
     * element.
     *
     * @param e - The drag event.
     */
    const handleDrop = (e: DragEvent): void => {
      e.preventDefault();
      apply("over", false);
      if (options?.handlers?.drop) {
        options.handlers.drop(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Add event listeners.
     */
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("drop", handleDrop);

    /**
     * Cleanup the event listeners when the component is destroyed.
     */
    return () => {
      el.removeEventListener("dragenter", handleDragEnter);
      el.removeEventListener("dragleave", handleDragLeave);
      el.removeEventListener("dragover", handleDragOver);
      el.removeEventListener("drop", handleDrop);
    };
  };
}
