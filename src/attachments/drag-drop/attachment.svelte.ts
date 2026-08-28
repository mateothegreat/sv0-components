import type { Attachment } from "svelte/attachments";
import type { DragDropOptions, DragDropState } from "./types";

export function dragDrop<T = unknown>(options: DragDropOptions<T> = {}): Attachment {
  return (el: Element) => {
    const htmlEl = el as HTMLElement;

    const {
      draggable = true,
      droppable = true,
      data,
      effectAllowed = "move",
      dropEffect = "move",
      dataFormat = "text/plain",
      start,
      end,
      over,
      enter,
      leave,
      drop
    } = options;

    /**
     * State for this attachment.
     */
    const state = $state<DragDropState<T>>({
      dragging: false,
      overhead: false,
      data
    });

    const updateDataAttrs = () => {
      htmlEl.dataset.dragging = state.dragging.toString();
      htmlEl.dataset.enter = state.overhead.toString();
    };

    /**
     * Set the draggable attribute on the element.
     */
    if (draggable) {
      htmlEl.draggable = true;
    }

    /**
     * Handle the drag process starting.
     *
     * @param e - The drag event.
     */
    const handleDragStart = (e: DragEvent): void => {
      if (!draggable || !e.dataTransfer) return;

      state.dragging = true;
      e.dataTransfer.effectAllowed = effectAllowed;

      // Set data if provided
      if (data !== undefined) {
        e.dataTransfer.setData(dataFormat, JSON.stringify(data));
        state.data = data;
      }

      start?.(state, e);
      updateDataAttrs();
    };

    /**
     * Handle the drag process ending.
     *
     * @param e - The drag event.
     */
    const handleDragEnd = (e: DragEvent): void => {
      state.dragging = false;
      end?.(state, e);
      updateDataAttrs();
    };

    /**
     * Handle when something is dragged over the element.
     *
     * @param e - The drag event.
     */
    const handleDragOver = (e: DragEvent): void => {
      if (!droppable || !e.dataTransfer) return;

      e.preventDefault();
      e.dataTransfer.dropEffect = dropEffect;
      over?.(state, e);
      updateDataAttrs();
    };

    /**
     * Handle when something enters the element.
     *
     * @param e - The drag event.
     */
    const handleDragEnter = (e: DragEvent): void => {
      if (!droppable) return;

      state.overhead = true;
      enter?.(state, e);
      updateDataAttrs();
    };

    /**
     * Handle when something leaves the element.
     *
     * @param e - The drag event.
     */
    const handleDragLeave = (e: DragEvent): void => {
      if (!droppable) return;

      // Only set to false if we're leaving the actual element, not a child
      if (e.target === htmlEl) {
        state.overhead = false;
      }
      leave?.(state, e);
      updateDataAttrs();
    };

    /**
     * Handle when something is dropped on the element.
     *
     * @param e - The drag event.
     */
    const handleDrop = (e: DragEvent): void => {
      if (!droppable || !e.dataTransfer) return;

      e.preventDefault();
      state.overhead = false;

      // Parse dropped data
      try {
        const rawData = e.dataTransfer.getData(dataFormat);
        if (rawData) {
          state.data = JSON.parse(rawData);
        }
      } catch {
        // If JSON parsing fails, use raw data
        state.data = e.dataTransfer.getData(dataFormat);
      }

      drop?.(state, e);
      updateDataAttrs();
    };

    /**
     * Add all of the event listeners.
     */
    if (draggable) {
      htmlEl.addEventListener("dragstart", handleDragStart);
      htmlEl.addEventListener("dragend", handleDragEnd);
    }

    if (droppable) {
      htmlEl.addEventListener("dragover", handleDragOver);
      htmlEl.addEventListener("dragenter", handleDragEnter);
      htmlEl.addEventListener("dragleave", handleDragLeave);
      htmlEl.addEventListener("drop", handleDrop);
    }

    /**
     * Cleanup all of the event listeners when the component is destroyed.
     */
    return () => {
      if (draggable) {
        htmlEl.removeEventListener("dragstart", handleDragStart);
        htmlEl.removeEventListener("dragend", handleDragEnd);
      }
      if (droppable) {
        htmlEl.removeEventListener("dragover", handleDragOver);
        htmlEl.removeEventListener("dragenter", handleDragEnter);
        htmlEl.removeEventListener("dragleave", handleDragLeave);
        htmlEl.removeEventListener("drop", handleDrop);
      }
    };
  };
}
