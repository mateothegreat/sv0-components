import type { Attachment } from "svelte/attachments";
import { dragDropState } from "./state.svelte";

export type DropPosition = "before" | "after";

export type SortableHandlers<T = unknown> = {
  /**
   * Called when drag starts on this element.
   */
  dragStart?: (data: T, e?: DragEvent) => void;

  /**
   * Called when drag ends on this element.
   */
  dragEnd?: (data: T, e?: DragEvent) => void;

  /**
   * Called when something is dropped on this element.
   * Provides the dragged data, drop position, and target data.
   */
  drop?: (draggedData: T, position: DropPosition, targetData: T, e?: DragEvent) => void;

  /**
   * Called when a dragged item is over this element.
   * Provides the drop position for visual feedback.
   */
  over?: (draggedData: T, position: DropPosition, targetData: T, e?: DragEvent) => void;

  /**
   * Called when a dragged item leaves this element.
   */
  leave?: (data: T, e?: DragEvent) => void;
};

export type SortableOptions<T = unknown> = {
  /**
   * The data associated with this sortable element.
   */
  data: T;

  /**
   * Event handlers for sortable interactions.
   */
  handlers?: SortableHandlers<T>;

  /**
   * Whether this element can be dragged.
   * @default true
   */
  draggable?: boolean;

  /**
   * Whether this element can accept drops.
   * @default true
   */
  droppable?: boolean;
};

export type SortableState = {
  dragging: boolean;
  over: boolean;
  position: DropPosition | null;
};

/**
 * Creates a sortable attachment that combines draggable and droppable
 * with position detection for reordering elements.
 */
export function sortable<T = unknown>(options: SortableOptions<T>): Attachment {
  return (element: Element) => {
    const el = element as HTMLElement;
    const { data, handlers, draggable = true, droppable = true } = options;

    const state = $state<SortableState>({
      dragging: false,
      over: false,
      position: null
    });

    const updateDataAttrs = () => {
      el.dataset.dragging = state.dragging.toString();
      el.dataset.over = state.over.toString();
      if (state.position) {
        el.dataset.position = state.position;
      } else {
        delete el.dataset.position;
      }
    };

    /**
     * Determine drop position based on mouse Y coordinate.
     */
    const getDropPosition = (e: DragEvent): DropPosition => {
      const rect = el.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      return e.clientY < midpoint ? "before" : "after";
    };

    // Define handlers outside of if blocks so they're accessible in cleanup
    const handleDragStart = (e: DragEvent): void => {
      dragDropState.setData(data);
      state.dragging = true;
      updateDataAttrs();
      handlers?.dragStart?.(data, e);
    };

    const handleDragEnd = (e: DragEvent): void => {
      state.dragging = false;
      updateDataAttrs();
      handlers?.dragEnd?.(data, e);
    };

    const handleDragEnter = (e: DragEvent): void => {
      e.preventDefault();
      const draggedData = dragDropState.getData<T>();

      // Don't allow dropping on itself
      if (draggedData === data) {
        return;
      }

      state.over = true;
      state.position = getDropPosition(e);
      updateDataAttrs();
    };

    const handleDragOver = (e: DragEvent): void => {
      e.preventDefault();
      const draggedData = dragDropState.getData<T>();

      // Don't allow dropping on itself
      if (draggedData === data) {
        return;
      }

      const position = getDropPosition(e);
      if (state.position !== position) {
        state.position = position;
        updateDataAttrs();
      }

      handlers?.over?.(draggedData, position, data, e);
    };

    const handleDragLeave = (e: DragEvent): void => {
      // Only clear state if we're actually leaving the element
      const relatedTarget = e.relatedTarget as Node | null;
      if (relatedTarget && el.contains(relatedTarget)) {
        return;
      }

      state.over = false;
      state.position = null;
      updateDataAttrs();

      const draggedData = dragDropState.getData<T>();
      handlers?.leave?.(draggedData, e);
    };

    const handleDrop = (e: DragEvent): void => {
      e.preventDefault();
      const draggedData = dragDropState.getData<T>();

      // Don't allow dropping on itself
      if (draggedData === data) {
        state.over = false;
        state.position = null;
        updateDataAttrs();
        return;
      }

      const position = state.position || getDropPosition(e);

      handlers?.drop?.(draggedData, position, data, e);

      state.over = false;
      state.position = null;
      updateDataAttrs();
    };

    // Draggable functionality
    if (draggable) {
      el.draggable = true;
      el.addEventListener("dragstart", handleDragStart);
      el.addEventListener("dragend", handleDragEnd);
    }

    // Droppable functionality
    if (droppable) {
      el.addEventListener("dragenter", handleDragEnter);
      el.addEventListener("dragover", handleDragOver);
      el.addEventListener("dragleave", handleDragLeave);
      el.addEventListener("drop", handleDrop);
    }

    // Cleanup
    return () => {
      if (draggable) {
        el.removeEventListener("dragstart", handleDragStart);
        el.removeEventListener("dragend", handleDragEnd);
      }
      if (droppable) {
        el.removeEventListener("dragenter", handleDragEnter);
        el.removeEventListener("dragover", handleDragOver);
        el.removeEventListener("dragleave", handleDragLeave);
        el.removeEventListener("drop", handleDrop);
      }
    };
  };
}
