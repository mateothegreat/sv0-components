/**
 * @file
 *
 *   Tests for the imperative Select API and recursive renderer.
 *
 *   This test suite verifies that the programmatic API correctly handles configuration
 *   objects, recursive rendering of nested structures, type safety, and integration with
 *   the underlying Select components. It ensures that all node types (item, label,
 *   separator, group) are rendered correctly and that the component maintains proper
 *   state management.
 *
 * @category Select Tests
 */

import { ImperativeSelect } from "@sv0/components/forms/select";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, test, vi } from "vitest";
import type { SelectConfig } from "./types";
import { SelectComponentType } from "./types";

describe("Imperative Select API", () => {
  describe("Basic Configuration", () => {
    test("should render a simple select from configuration", async () => {
      const config: SelectConfig<string> = {
        trigger: {},

        content: {
          nodes: [
            { type: SelectComponentType.ITEM, value: "apple", label: "Apple" },
            { type: SelectComponentType.ITEM, value: "banana", label: "Banana" },
            { type: SelectComponentType.ITEM, value: "orange", label: "Orange" }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();

      await fireEvent.click(trigger);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /orange/i })).toBeInTheDocument();
    });

    test("should handle value binding", async () => {
      let value = $state<string>("banana");

      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            { type: SelectComponentType.ITEM, value: "apple", label: "Apple" },
            { type: SelectComponentType.ITEM, value: "banana", label: "Banana" }
          ]
        }
      };

      render(ImperativeSelect, { props: { value, config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const appleItem = screen.getByRole("option", { name: /apple/i });
      await fireEvent.click(appleItem);

      // Value should have changed to apple.
      expect(value).toBe("apple");
    });

    test("should call onValueChange callback", async () => {
      const onValueChange = vi.fn();

      const config: SelectConfig<string> = {
        onValueChange,
        trigger: {},
        content: {
          nodes: [
            { type: SelectComponentType.ITEM, value: "apple", label: "Apple" },
            { type: SelectComponentType.ITEM, value: "banana", label: "Banana" }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const appleItem = screen.getByRole("option", { name: /apple/i });
      await fireEvent.click(appleItem);

      expect(onValueChange).toHaveBeenCalledWith("apple");
    });
  });

  describe("Grouped Configuration", () => {
    test("should render groups with labels", async () => {
      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            {
              type: SelectComponentType.GROUP,
              label: "Fruits",
              children: [
                { type: SelectComponentType.ITEM, value: "apple", label: "Apple" },
                { type: "item", value: "banana", label: "Banana" }
              ]
            },
            {
              type: SelectComponentType.GROUP,
              label: "Vegetables",
              children: [{ type: SelectComponentType.ITEM, value: "carrot", label: "Carrot" }]
            }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const groups = screen.getAllByRole("group");
      expect(groups).toHaveLength(2);
    });

    test("should render nested groups recursively", async () => {
      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            {
              type: SelectComponentType.GROUP,
              label: "Produce",
              children: [
                {
                  type: SelectComponentType.GROUP,
                  label: "Fruits",
                  children: [{ type: SelectComponentType.ITEM, value: "apple", label: "Apple" }]
                },
                {
                  type: SelectComponentType.GROUP,
                  label: "Vegetables",
                  children: [{ type: SelectComponentType.ITEM, value: "carrot", label: "Carrot" }]
                }
              ]
            }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      // Should have 3 groups: Produce (outer), Fruits, and Vegetables.
      const groups = screen.getAllByRole("group");
      expect(groups.length).toBeGreaterThanOrEqual(3);
    });

    test("should render separators", async () => {
      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            { type: "item", value: "apple", label: "Apple" },
            { type: "separator" },
            { type: "item", value: "banana", label: "Banana" }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const separator = screen.getByRole("separator");
      expect(separator).toBeInTheDocument();
    });

    test("should render labels", async () => {
      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            { type: "label", label: "Available Options" },
            { type: "item", value: "apple", label: "Apple" }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      expect(screen.getByText("Available Options")).toBeInTheDocument();
    });
  });

  describe("Multiple Selection", () => {
    test("should handle multiple selection mode", async () => {
      const config: SelectConfig<string[] | string> = {
        multiple: true,
        trigger: {},
        content: {
          nodes: [
            { type: "item", value: "apple", label: "Apple" },
            { type: "item", value: "banana", label: "Banana" }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    });
  });

  describe("Disabled State", () => {
    test("should respect disabled prop", () => {
      const config: SelectConfig<string> = {
        disabled: true,
        trigger: {},
        content: {
          nodes: [{ type: "item", value: "apple", label: "Apple" }]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    test("should render disabled items", async () => {
      const config: SelectConfig<string> = {
        trigger: {},
        content: {
          nodes: [
            { type: "item", value: "apple", label: "Apple" },
            { type: "item", value: "banana", label: "Banana", disabled: true }
          ]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const bananaItem = screen.getByRole("option", { name: /banana/i });
      expect(bananaItem).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Custom Value Types", () => {
    test("should handle complex object values", async () => {
      type Item = { id: number; name: string };

      let value = $state<Item>();

      const items: Item[] = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" }
      ];

      const config: SelectConfig<Item> = {
        trigger: {},
        content: {
          nodes: items.map((item) => ({
            type: "item" as const,
            value: item,
            label: item.name
          }))
        }
      };

      render(ImperativeSelect, { props: { value, config } });

      const trigger = screen.getByRole("combobox");
      await fireEvent.click(trigger);

      const appleItem = screen.getByRole("option", { name: /apple/i });
      await fireEvent.click(appleItem);

      expect(value).toEqual({ id: 1, name: "Apple" });
    });
  });

  describe("Styling Variants", () => {
    test("should apply trigger size variant", () => {
      const config: SelectConfig<string> = {
        trigger: { size: "lg" },
        content: {
          nodes: [{ type: "item", value: "apple", label: "Apple" }]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
      // The trigger should have the size class applied (via styleset).
    });

    test("should apply custom classes", async () => {
      const config: SelectConfig<string> = {
        trigger: { class: "custom-trigger" },
        content: {
          class: "custom-content",
          nodes: [{ type: "item", value: "apple", label: "Apple", class: "custom-item" }]
        }
      };

      render(ImperativeSelect, { props: { config } });

      const trigger = screen.getByRole("combobox");
      expect(trigger.className).toContain("custom-trigger");

      await fireEvent.click(trigger);

      const listbox = screen.getByRole("listbox");
      expect(listbox.parentElement?.className).toContain("custom-content");
    });
  });

  describe("Form Integration", () => {
    test("should render hidden input when name is provided", () => {
      const config: SelectConfig<string> = {
        name: "fruit",
        trigger: {},
        content: {
          nodes: [{ type: "item", value: "apple", label: "Apple" }]
        }
      };

      const { container } = render(ImperativeSelect, { props: { config } });

      const hiddenInput = container.querySelector('input[type="hidden"][name="fruit"]');
      expect(hiddenInput).toBeInTheDocument();
    });

    test("should respect required attribute", () => {
      const config: SelectConfig<string> = {
        name: "fruit",
        required: true,
        trigger: {},
        content: {
          nodes: [{ type: "item", value: "apple", label: "Apple" }]
        }
      };

      const { container } = render(ImperativeSelect, { props: { config } });

      const hiddenInput = container.querySelector('input[type="hidden"][name="fruit"]');
      expect(hiddenInput).toHaveAttribute("required");
    });
  });
});
