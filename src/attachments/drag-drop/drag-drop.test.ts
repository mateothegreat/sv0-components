import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { draggable } from "./draggable.svelte";
import { droppable } from "./droppable.svelte";
import { dragDropState } from "./state.svelte";

describe("drag and drop integration", () => {
  let dragElement: HTMLElement;
  let dropElement: HTMLElement;
  let draggableCleanup: () => void;
  let droppableCleanup: () => void;

  beforeEach(() => {
    dragElement = document.createElement("div");
    dropElement = document.createElement("div");
    document.body.appendChild(dragElement);
    document.body.appendChild(dropElement);
  });

  afterEach(() => {
    if (draggableCleanup) draggableCleanup();
    if (droppableCleanup) droppableCleanup();
    document.body.removeChild(dragElement);
    document.body.removeChild(dropElement);
  });

  it("should transfer data from draggable to droppable", () => {
    const testData = { id: "test-item", name: "Test Item" };
    let dragStartData: unknown = null;
    let dropReceivedData: unknown = null;

    draggableCleanup = draggable({
      data: testData,
      handlers: {
        start: (data) => {
          dragStartData = data;
        }
      }
    })(dragElement);

    droppableCleanup = droppable({
      handlers: {
        drop: (data) => {
          dropReceivedData = data;
        }
      }
    })(dropElement);

    // Simulate drag start
    const dragStartEvent = new DragEvent("dragstart", { bubbles: true });
    dragElement.dispatchEvent(dragStartEvent);

    expect(dragStartData).toEqual(testData);
    expect(dragElement.dataset.dragging).toBe("true");

    // Simulate dragover (required for drop to work)
    const dragOverEvent = new DragEvent("dragover", { bubbles: true, cancelable: true });
    dropElement.dispatchEvent(dragOverEvent);

    expect(dragOverEvent.defaultPrevented).toBe(true);

    // Simulate drop
    const dropEvent = new DragEvent("drop", { bubbles: true, cancelable: true });
    dropElement.dispatchEvent(dropEvent);

    expect(dropEvent.defaultPrevented).toBe(true);
    expect(dropReceivedData).toEqual(testData);
    expect(dropElement.dataset.over).toBe("false");

    // Simulate drag end
    const dragEndEvent = new DragEvent("dragend", { bubbles: true });
    dragElement.dispatchEvent(dragEndEvent);

    expect(dragElement.dataset.dragging).toBe("false");
  });

  it("should handle multiple draggables correctly", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };
    let droppedData: unknown = null;

    const dragElement2 = document.createElement("div");
    document.body.appendChild(dragElement2);

    const cleanup1 = draggable({
      data: data1,
      handlers: {}
    })(dragElement);

    const cleanup2 = draggable({
      data: data2,
      handlers: {}
    })(dragElement2);

    droppableCleanup = droppable({
      handlers: {
        drop: (data) => {
          droppedData = data;
        }
      }
    })(dropElement);

    // Drag the second element
    dragElement2.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Dragover on drop zone
    dropElement.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true }));

    // Drop
    dropElement.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true }));

    // Should have data2, not data1
    expect(droppedData).toEqual(data2);

    cleanup1();
    cleanup2();
    document.body.removeChild(dragElement2);
  });

  it("should set visual states correctly during drag", () => {
    const testData = { id: "test" };

    draggableCleanup = draggable({
      data: testData,
      handlers: {}
    })(dragElement);

    droppableCleanup = droppable({
      handlers: {}
    })(dropElement);

    // Before drag
    expect(dragElement.dataset.dragging).toBeUndefined();
    expect(dropElement.dataset.over).toBeUndefined();

    // Start dragging
    dragElement.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    expect(dragElement.dataset.dragging).toBe("true");

    // Enter drop zone
    dropElement.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
    expect(dropElement.dataset.over).toBe("true");

    // Leave drop zone
    dropElement.dispatchEvent(new DragEvent("dragleave", { bubbles: true }));
    expect(dropElement.dataset.over).toBe("false");

    // End drag
    dragElement.dispatchEvent(new DragEvent("dragend", { bubbles: true }));
    expect(dragElement.dataset.dragging).toBe("false");
  });

  it("should call all lifecycle handlers in correct order", () => {
    const callOrder: string[] = [];
    const testData = { id: "test" };

    draggableCleanup = draggable({
      data: testData,
      handlers: {
        start: () => callOrder.push("drag-start"),
        drag: () => callOrder.push("drag"),
        end: () => callOrder.push("drag-end")
      }
    })(dragElement);

    droppableCleanup = droppable({
      handlers: {
        enter: () => callOrder.push("drop-enter"),
        over: () => callOrder.push("drop-over"),
        leave: () => callOrder.push("drop-leave"),
        drop: () => callOrder.push("drop-drop")
      }
    })(dropElement);

    dragElement.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    dragElement.dispatchEvent(new DragEvent("drag", { bubbles: true }));
    dropElement.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
    dropElement.dispatchEvent(new DragEvent("dragover", { bubbles: true }));
    dropElement.dispatchEvent(new DragEvent("drop", { bubbles: true }));
    dragElement.dispatchEvent(new DragEvent("dragend", { bubbles: true }));

    expect(callOrder).toEqual([
      "drag-start",
      "drag",
      "drop-enter",
      "drop-over",
      "drop-drop",
      "drag-end"
    ]);
  });

  it("should properly clean up global state", () => {
    const testData = { id: "test" };

    draggableCleanup = draggable({
      data: testData,
      handlers: {}
    })(dragElement);

    dragElement.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    expect(dragDropState.data).toEqual(testData);

    const newData = { id: "new-test" };
    const newDragElement = document.createElement("div");
    document.body.appendChild(newDragElement);

    const newCleanup = draggable({
      data: newData,
      handlers: {}
    })(newDragElement);

    newDragElement.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    expect(dragDropState.data).toEqual(newData);

    newCleanup();
    document.body.removeChild(newDragElement);
  });
});
