import { describe, it, expect, beforeEach } from "vitest";
import { droppable } from "./droppable.svelte";
import { dragDropState } from "./state.svelte";

describe("droppable", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  it("should set data-over attribute to true on dragenter", () => {
    const cleanup = droppable({
      handlers: {
        enter: () => {}
      }
    })(element);

    const event = new DragEvent("dragenter", { bubbles: true });
    element.dispatchEvent(event);

    expect(element.dataset.over).toBe("true");

    cleanup();
  });

  it("should call enter handler on dragenter", () => {
    let enterCalled = false;
    const testData = { id: "test" };
    dragDropState.data = testData;

    const cleanup = droppable({
      handlers: {
        enter: (data) => {
          enterCalled = true;
          expect(data).toBe(testData);
        }
      }
    })(element);

    const event = new DragEvent("dragenter", { bubbles: true });
    element.dispatchEvent(event);

    expect(enterCalled).toBe(true);

    cleanup();
  });

  it("should call over handler on dragover", () => {
    let overCalled = false;
    const testData = { id: "test" };
    dragDropState.data = testData;

    const cleanup = droppable({
      handlers: {
        over: (data) => {
          overCalled = true;
          expect(data).toBe(testData);
        }
      }
    })(element);

    const event = new DragEvent("dragover", { bubbles: true });
    element.dispatchEvent(event);

    expect(overCalled).toBe(true);

    cleanup();
  });

  it("should call drop handler on drop", () => {
    let dropCalled = false;
    const testData = { id: "test" };
    dragDropState.data = testData;

    const cleanup = droppable({
      handlers: {
        drop: (data) => {
          dropCalled = true;
          expect(data).toBe(testData);
        }
      }
    })(element);

    const event = new DragEvent("drop", { bubbles: true });
    element.dispatchEvent(event);

    expect(dropCalled).toBe(true);
    expect(element.dataset.over).toBe("false");

    cleanup();
  });

  it("should set data-over to false on dragleave", () => {
    const cleanup = droppable({
      handlers: {
        leave: () => {}
      }
    })(element);

    // First enter
    element.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
    expect(element.dataset.over).toBe("true");

    // Then leave
    element.dispatchEvent(new DragEvent("dragleave", { bubbles: true }));
    expect(element.dataset.over).toBe("false");

    cleanup();
  });

  it("should prevent default on dragover", () => {
    const cleanup = droppable({
      handlers: {}
    })(element);

    const event = new DragEvent("dragover", { bubbles: true, cancelable: true });
    element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);

    cleanup();
  });

  it("should prevent default on drop", () => {
    const cleanup = droppable({
      handlers: {}
    })(element);

    const event = new DragEvent("drop", { bubbles: true, cancelable: true });
    element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);

    cleanup();
  });

  it("should cleanup event listeners properly", () => {
    let callCount = 0;
    const cleanup = droppable({
      handlers: {
        drop: () => {
          callCount++;
        }
      }
    })(element);

    element.dispatchEvent(new DragEvent("drop", { bubbles: true }));
    expect(callCount).toBe(1);

    cleanup();

    element.dispatchEvent(new DragEvent("drop", { bubbles: true }));
    expect(callCount).toBe(1); // Should not increase after cleanup
  });

  it("should not cancel over state when entering child element", () => {
    const childElement = document.createElement("div");
    element.appendChild(childElement);

    const cleanup = droppable({
      handlers: {}
    })(element);

    // Enter the drop zone
    element.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
    expect(element.dataset.over).toBe("true");

    // Simulate leaving parent and entering child
    const leaveEvent = new DragEvent("dragleave", {
      bubbles: true,
      relatedTarget: childElement
    });
    element.dispatchEvent(leaveEvent);

    // Should still be over
    expect(element.dataset.over).toBe("true");

    cleanup();
  });

  it("should cancel over state when actually leaving drop zone", () => {
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const cleanup = droppable({
      handlers: {}
    })(element);

    // Enter the drop zone
    element.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
    expect(element.dataset.over).toBe("true");

    // Simulate leaving to an outside element
    const leaveEvent = new DragEvent("dragleave", {
      bubbles: true,
      relatedTarget: outsideElement
    });
    element.dispatchEvent(leaveEvent);

    // Should not be over anymore
    expect(element.dataset.over).toBe("false");

    cleanup();
    document.body.removeChild(outsideElement);
  });
});
