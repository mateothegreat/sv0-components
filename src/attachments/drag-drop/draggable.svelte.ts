import type { Attachment } from "svelte/attachments";
import { dragDropState } from "./state.svelte";

export type DraggableHandlers<T = unknown> = {
  start?: (data: T, e?: DragEvent) => void;
  drag?: (data: T, e?: DragEvent) => void;
  end?: (data: T, e?: DragEvent) => void;
};

export type DraggableOptions<T = unknown> = {
  handlers: DraggableHandlers<T>;
  data?: T;
};

export type DraggableState = {
  dragging: boolean;
};

export function draggable<T = unknown>(options?: DraggableOptions<T>): Attachment {
  return (element: Element) => {
    const el = element as HTMLElement;
    el.draggable = true;

    const state = $state<DraggableState>({
      dragging: false
    });

    const apply = (key: string, value: boolean) => {
      state[key as keyof DraggableState] = value;
      el.dataset[key] = value.toString();
    };

    /**
     * Handle the drag process starting.
     *
     * @param e - The drag event.
     */
    const handleDragStart = (e: DragEvent): void => {
      // Set the data in the global state when drag starts
      dragDropState.setData(options?.data);
      apply("dragging", true);
      if (options?.handlers?.start) {
        options.handlers.start(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Handle the drag process.
     *
     * @param e - The drag event.
     */
    const handleDrag = (e: DragEvent): void => {
      if (options?.handlers?.drag) {
        options.handlers.drag(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Handle the drag process ending.
     *
     * @param e - The drag event.
     */
    const handleDragEnd = (e: DragEvent): void => {
      apply("dragging", false);
      if (options?.handlers?.end) {
        options.handlers.end(dragDropState.getData<T>(), e);
      }
    };

    /**
     * Add event listeners.
     */
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("drag", handleDrag);
    el.addEventListener("dragend", handleDragEnd);

    /**
     * Cleanup the event listeners when the component is destroyed.
     */
    return () => {
      el.removeEventListener("dragstart", handleDragStart);
      el.removeEventListener("drag", handleDrag);
      el.removeEventListener("dragend", handleDragEnd);
    };
  };
}
