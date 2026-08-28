import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { Select } from "./index.js";
import TestWrapper from "./test-wrapper.svelte";

describe("Select Component", () => {
	describe("Root", () => {
		it("should render with children", () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			expect(screen.getByRole("combobox")).toBeInTheDocument();
		});

		it("should initialize with default value", () => {
			render(TestWrapper, {
				props: {
					testCase: "with-value",
					value: "apple",
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toHaveTextContent("apple");
		});

		it("should render hidden input when name prop is provided", () => {
			const { container } = render(TestWrapper, {
				props: {
					testCase: "with-name",
					name: "fruit",
					value: "apple",
				},
			});

			const hiddenInput = container.querySelector('input[type="hidden"][name="fruit"]');
			expect(hiddenInput).toBeInTheDocument();
			expect(hiddenInput).toHaveValue("apple");
		});

		it("should support multiple selection", () => {
			render(TestWrapper, {
				props: {
					testCase: "multiple",
					multiple: true,
					value: ["apple", "banana"],
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toHaveTextContent("2 selected");
		});
	});

	describe("Trigger", () => {
		it("should open dropdown when clicked", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toHaveAttribute("aria-expanded", "false");

			await fireEvent.click(trigger);

			expect(trigger).toHaveAttribute("aria-expanded", "true");
			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});

		it("should open dropdown with Enter key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.keyDown(trigger, { key: "Enter" });

			expect(trigger).toHaveAttribute("aria-expanded", "true");
		});

		it("should open dropdown with Space key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.keyDown(trigger, { key: " " });

			expect(trigger).toHaveAttribute("aria-expanded", "true");
		});

		it("should open dropdown with ArrowDown key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.keyDown(trigger, { key: "ArrowDown" });

			expect(trigger).toHaveAttribute("aria-expanded", "true");
		});

		it("should close dropdown with Escape key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);
			expect(trigger).toHaveAttribute("aria-expanded", "true");

			await fireEvent.keyDown(trigger, { key: "Escape" });
			expect(trigger).toHaveAttribute("aria-expanded", "false");
		});

		it("should be disabled when disabled prop is true", () => {
			render(TestWrapper, {
				props: {
					testCase: "disabled",
					disabled: true,
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toBeDisabled();
		});

		it("should display placeholder when no value selected", () => {
			render(TestWrapper, {
				props: {
					testCase: "with-placeholder",
					placeholder: "Select a fruit",
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toHaveTextContent("Select a fruit");
		});
	});

	describe("Content", () => {
		it("should render when open", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toBeInTheDocument();
			expect(listbox).toHaveAttribute("data-state", "open");
		});

		it("should not render when closed", () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		});

		it("should close when clicking outside", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);
			expect(screen.getByRole("listbox")).toBeInTheDocument();

			await fireEvent.mouseDown(document.body);
			await waitFor(() => {
				expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
			});
		});

		it("should close with Escape key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const listbox = screen.getByRole("listbox");
			await fireEvent.keyDown(listbox, { key: "Escape" });

			await waitFor(() => {
				expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
			});
		});
	});

	describe("Item", () => {
		it("should select item when clicked", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "with-callback",
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			await fireEvent.click(appleItem);

			expect(onValueChange).toHaveBeenCalledWith("apple");
		});

		it("should select item with Enter key", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "with-callback",
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			appleItem.focus();
			await fireEvent.keyDown(appleItem, { key: "Enter" });

			expect(onValueChange).toHaveBeenCalledWith("apple");
		});

		it("should select item with Space key", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "with-callback",
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			appleItem.focus();
			await fireEvent.keyDown(appleItem, { key: " " });

			expect(onValueChange).toHaveBeenCalledWith("apple");
		});

		it("should have aria-selected when selected", async () => {
			render(TestWrapper, {
				props: {
					testCase: "with-value",
					value: "apple",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			expect(appleItem).toHaveAttribute("aria-selected", "true");
		});

		it("should be disabled when disabled prop is true", async () => {
			render(TestWrapper, {
				props: {
					testCase: "with-disabled-item",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const disabledItem = screen.getByRole("option", { name: /disabled/i });
			expect(disabledItem).toHaveAttribute("aria-disabled", "true");
			expect(disabledItem).toHaveAttribute("data-disabled");
		});

		it("should not select disabled item", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "with-disabled-item",
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const disabledItem = screen.getByRole("option", { name: /disabled/i });
			await fireEvent.click(disabledItem);

			expect(onValueChange).not.toHaveBeenCalled();
		});

		it("should navigate with arrow keys", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const items = screen.getAllByRole("option");
			items[0]?.focus();

			await fireEvent.keyDown(items[0]!, { key: "ArrowDown" });
			expect(document.activeElement).toBe(items[1]);

			await fireEvent.keyDown(items[1]!, { key: "ArrowUp" });
			expect(document.activeElement).toBe(items[0]);
		});

		it("should jump to first item with Home key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const items = screen.getAllByRole("option");
			items[2]?.focus();

			await fireEvent.keyDown(items[2]!, { key: "Home" });
			expect(document.activeElement).toBe(items[0]);
		});

		it("should jump to last item with End key", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const items = screen.getAllByRole("option");
			items[0]?.focus();

			await fireEvent.keyDown(items[0]!, { key: "End" });
			expect(document.activeElement).toBe(items[items.length - 1]);
		});
	});

	describe("Multiple Selection", () => {
		it("should toggle multiple items", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "multiple",
					multiple: true,
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			await fireEvent.click(appleItem);
			expect(onValueChange).toHaveBeenCalledWith(["apple"]);

			const bananaItem = screen.getByRole("option", { name: /banana/i });
			await fireEvent.click(bananaItem);
			expect(onValueChange).toHaveBeenCalledWith(["apple", "banana"]);
		});

		it("should deselect item when clicked again", async () => {
			const onValueChange = vi.fn();
			render(TestWrapper, {
				props: {
					testCase: "multiple",
					multiple: true,
					value: ["apple"],
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			await fireEvent.click(appleItem);

			expect(onValueChange).toHaveBeenCalledWith([]);
		});

		it("should deselect item with different object reference (deep equality)", async () => {
			const onValueChange = vi.fn();

			// Simulate external value update with different object references
			// but same content (like in imperative-demo.svelte:230)
			const initialValue = [{ id: 1, name: "apple" }];
			const externalValue = [{ id: 1, name: "apple" }]; // Different reference, same content

			render(TestWrapper, {
				props: {
					testCase: "multiple-objects",
					multiple: true,
					value: externalValue,
					onValueChange,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			await fireEvent.click(appleItem);

			// Should remove the item, not add a duplicate
			expect(onValueChange).toHaveBeenCalledWith([]);
		});

		it("should not close dropdown after selection in multiple mode", async () => {
			render(TestWrapper, {
				props: {
					testCase: "multiple",
					multiple: true,
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			await fireEvent.click(appleItem);

			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
	});

	describe("Group and Label", () => {
		it("should render group with label", async () => {
			render(TestWrapper, {
				props: {
					testCase: "with-groups",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const group = screen.getByRole("group");
			expect(group).toBeInTheDocument();
			expect(group).toHaveAttribute("aria-labelledby");
		});
	});

	describe("Form Integration", () => {
		it("should include value in form data", () => {
			const { container } = render(TestWrapper, {
				props: {
					testCase: "with-name",
					name: "fruit",
					value: "apple",
				},
			});

			const hiddenInput = container.querySelector(
				'input[type="hidden"][name="fruit"]'
			) as HTMLInputElement;
			expect(hiddenInput?.value).toBe("apple");
		});

		it("should include multiple values in form data", () => {
			const { container } = render(TestWrapper, {
				props: {
					testCase: "multiple-with-name",
					name: "fruits",
					multiple: true,
					value: ["apple", "banana"],
				},
			});

			const hiddenInputs = container.querySelectorAll('input[type="hidden"][name="fruits"]');
			expect(hiddenInputs).toHaveLength(2);
			expect(hiddenInputs[0]).toHaveValue("apple");
			expect(hiddenInputs[1]).toHaveValue("banana");
		});

		it("should respect required attribute", () => {
			const { container } = render(TestWrapper, {
				props: {
					testCase: "with-name",
					name: "fruit",
					required: true,
				},
			});

			const hiddenInput = container.querySelector('input[type="hidden"][name="fruit"]');
			expect(hiddenInput).toHaveAttribute("required");
		});

		it("should respect disabled attribute", () => {
			const { container } = render(TestWrapper, {
				props: {
					testCase: "disabled",
					name: "fruit",
					disabled: true,
				},
			});

			const hiddenInput = container.querySelector('input[type="hidden"][name="fruit"]');
			expect(hiddenInput).toHaveAttribute("disabled");
		});
	});

	describe("Accessibility", () => {
		it("should have correct ARIA attributes on trigger", () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			expect(trigger).toHaveAttribute("aria-expanded", "false");
			expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
		});

		it("should have correct ARIA attributes on content", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("role", "listbox");
		});

		it("should have correct ARIA attributes on items", async () => {
			render(TestWrapper, {
				props: {
					testCase: "with-value",
					value: "apple",
				},
			});

			const trigger = screen.getByRole("combobox");
			await fireEvent.click(trigger);

			const appleItem = screen.getByRole("option", { name: /apple/i });
			expect(appleItem).toHaveAttribute("role", "option");
			expect(appleItem).toHaveAttribute("aria-selected", "true");
		});

		it("should support keyboard navigation", async () => {
			render(TestWrapper, {
				props: {
					testCase: "basic",
				},
			});

			const trigger = screen.getByRole("combobox");

			// Open with keyboard
			await fireEvent.keyDown(trigger, { key: "Enter" });
			expect(screen.getByRole("listbox")).toBeInTheDocument();

			// Navigate with arrows
			const items = screen.getAllByRole("option");
			items[0]?.focus();
			await fireEvent.keyDown(items[0]!, { key: "ArrowDown" });
			expect(document.activeElement).toBe(items[1]);

			// Select with keyboard
			await fireEvent.keyDown(items[1]!, { key: "Enter" });
			await waitFor(() => {
				expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
			});
		});
	});
});
