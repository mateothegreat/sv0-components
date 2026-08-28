import { describe, expect, test, vi } from "vitest";
import { useEventListener } from "./use-event-listener";

describe("useEventListener", () => {
  test("should attach an event listener to a target", () => {
    const target = document.createElement("div");
    const eventName = "click";
    const handler = vi.fn();

    useEventListener(target, eventName, handler);

    target.dispatchEvent(new Event(eventName));

    expect(handler).toHaveBeenCalled();
  });
});
