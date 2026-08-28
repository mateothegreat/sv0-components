import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { sortable } from "./sortable.svelte";
import { dragDropState } from "./state.svelte";
import type { DropPosition } from "./sortable.svelte";

describe("sortable", () => {
  let element1: HTMLElement;
  let element2: HTMLElement;
  let cleanup1: () => void;
  let cleanup2: () => void;

  beforeEach(() => {
    element1 = document.createElement("div");
    element2 = document.createElement("div");
    document.body.appendChild(element1);
    document.body.appendChild(element2);
  });

  afterEach(() => {
    if (cleanup1) cleanup1();
    if (cleanup2) cleanup2();
    document.body.removeChild(element1);
    document.body.removeChild(element2);
  });

  it("should make elements draggable by default", () => {
    const data = { id: "item-1" };
    cleanup1 = sortable({ data })(element1);

    expect(element1.draggable).toBe(true);
  });

  it("should set dragging state when drag starts", () => {
    const data = { id: "item-1" };
    let dragStartCalled = false;

    cleanup1 = sortable({
      data,
      handlers: {
        dragStart: () => {
          dragStartCalled = true;
        }
      }
    })(element1);

    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    expect(dragStartCalled).toBe(true);
    expect(element1.dataset.dragging).toBe("true");
    expect(dragDropState.getData()).toEqual(data);
  });

  it("should clear dragging state when drag ends", () => {
    const data = { id: "item-1" };
    let dragEndCalled = false;

    cleanup1 = sortable({
      data,
      handlers: {
        dragEnd: () => {
          dragEndCalled = true;
        }
      }
    })(element1);

    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    expect(element1.dataset.dragging).toBe("true");

    element1.dispatchEvent(new DragEvent("dragend", { bubbles: true }));

    expect(dragEndCalled).toBe(true);
    expect(element1.dataset.dragging).toBe("false");
  });

  it("should detect drop position based on mouse coordinates", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };
    let detectedPosition: DropPosition | null = null;

    // Set up element2 with a known position
    element2.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 100,
        width: 100,
        x: 0,
        y: 100,
        toJSON: () => ({})
      }) as DOMRect;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({
      data: data2,
      handlers: {
        over: (draggedData, position) => {
          detectedPosition = position;
        }
      }
    })(element2);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Test "before" position (mouse Y = 120, which is above midpoint of 150)
    element2.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        clientY: 120
      })
    );
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 120
      })
    );

    expect(detectedPosition).toBe("before");

    // Test "after" position (mouse Y = 180, which is below midpoint of 150)
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 180
      })
    );

    expect(detectedPosition).toBe("after");
  });

  it("should call drop handler with position information", () => {
    const data1 = { id: "item-1", name: "Item 1" };
    const data2 = { id: "item-2", name: "Item 2" };
    let dropCalled = false;
    let receivedDraggedData: unknown = null;
    let receivedPosition: DropPosition | null = null;
    let receivedTargetData: unknown = null;

    // Set up element2 with a known position
    element2.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 100,
        width: 100,
        x: 0,
        y: 100,
        toJSON: () => ({})
      }) as DOMRect;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({
      data: data2,
      handlers: {
        drop: (draggedData, position, targetData) => {
          dropCalled = true;
          receivedDraggedData = draggedData;
          receivedPosition = position;
          receivedTargetData = targetData;
        }
      }
    })(element2);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Drag over (before position)
    element2.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true,
        clientY: 120
      })
    );

    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        cancelable: true,
        clientY: 120
      })
    );

    // Drop
    element2.dispatchEvent(
      new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        clientY: 120
      })
    );

    expect(dropCalled).toBe(true);
    expect(receivedDraggedData).toEqual(data1);
    expect(receivedPosition).toBe("before");
    expect(receivedTargetData).toEqual(data2);
  });

  it("should prevent dropping element on itself", () => {
    const data = { id: "item-1" };
    let dropCalled = false;

    cleanup1 = sortable({
      data,
      handlers: {
        drop: () => {
          dropCalled = true;
        }
      }
    })(element1);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Try to drop on itself
    element1.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true
      })
    );

    element1.dispatchEvent(
      new DragEvent("drop", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(dropCalled).toBe(false);
  });

  it("should set visual states correctly", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };

    element2.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 100,
        width: 100,
        x: 0,
        y: 100,
        toJSON: () => ({})
      }) as DOMRect;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({ data: data2 })(element2);

    // Initial state
    expect(element1.dataset.dragging).toBeUndefined();
    expect(element2.dataset.over).toBeUndefined();
    expect(element2.dataset.position).toBeUndefined();

    // Start dragging
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    expect(element1.dataset.dragging).toBe("true");

    // Enter target
    element2.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        clientY: 120
      })
    );
    expect(element2.dataset.over).toBe("true");
    expect(element2.dataset.position).toBe("before");

    // Change position
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 180
      })
    );
    expect(element2.dataset.position).toBe("after");

    // Drop
    element2.dispatchEvent(
      new DragEvent("drop", {
        bubbles: true,
        clientY: 180
      })
    );
    expect(element2.dataset.over).toBe("false");
    expect(element2.dataset.position).toBeUndefined();

    // End drag
    element1.dispatchEvent(new DragEvent("dragend", { bubbles: true }));
    expect(element1.dataset.dragging).toBe("false");
  });

  it("should handle dragleave correctly", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };
    let leaveCalled = false;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({
      data: data2,
      handlers: {
        leave: () => {
          leaveCalled = true;
        }
      }
    })(element2);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Enter target
    element2.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true
      })
    );
    expect(element2.dataset.over).toBe("true");

    // Leave target
    element2.dispatchEvent(
      new DragEvent("dragleave", {
        bubbles: true
      })
    );

    expect(leaveCalled).toBe(true);
    expect(element2.dataset.over).toBe("false");
    expect(element2.dataset.position).toBeUndefined();
  });

  it("should support disabling draggable", () => {
    const data = { id: "item-1" };

    cleanup1 = sortable({
      data,
      draggable: false
    })(element1);

    expect(element1.draggable).toBe(false);
  });

  it("should support disabling droppable", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };
    let dropCalled = false;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({
      data: data2,
      droppable: false,
      handlers: {
        drop: () => {
          dropCalled = true;
        }
      }
    })(element2);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Try to drop on element2 (which is not droppable)
    element2.dispatchEvent(
      new DragEvent("drop", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(dropCalled).toBe(false);
  });

  it("should update position indicator during dragover", () => {
    const data1 = { id: "item-1" };
    const data2 = { id: "item-2" };
    const positions: DropPosition[] = [];

    element2.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 100,
        width: 100,
        x: 0,
        y: 100,
        toJSON: () => ({})
      }) as DOMRect;

    cleanup1 = sortable({ data: data1 })(element1);
    cleanup2 = sortable({
      data: data2,
      handlers: {
        over: (draggedData, position) => {
          positions.push(position);
        }
      }
    })(element2);

    // Start drag
    element1.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));

    // Enter at top
    element2.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        clientY: 110
      })
    );

    // Move to middle-top (still before)
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 130
      })
    );

    // Move to middle-bottom (now after)
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 160
      })
    );

    // Move to bottom
    element2.dispatchEvent(
      new DragEvent("dragover", {
        bubbles: true,
        clientY: 190
      })
    );

    // Should have called over handler multiple times with position updates
    expect(positions.length).toBeGreaterThan(0);
    expect(positions).toContain("before");
    expect(positions).toContain("after");
  });
});
