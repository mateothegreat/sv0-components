# Select Component

A simplified, idiomatic Svelte 5 select component with full accessibility support and feature parity with bits-ui and shadcn-svelte.

## Features

- ✅ **Svelte 5 Runes Only**: Built with `$state`, `$props`, `$derived`, and `$effect`
- ✅ **Single & Multiple Selection**: Support for both selection modes
- ✅ **Full Keyboard Navigation**: Arrow keys, Home/End, Enter/Space, Escape
- ✅ **Accessible**: Complete ARIA support following WAI-ARIA patterns
- ✅ **Form Integration**: Hidden inputs for form submission
- ✅ **Floating UI Positioning**: Smart dropdown positioning with @floating-ui/dom
- ✅ **Groups & Labels**: Organize options with groups
- ✅ **Disabled States**: Support for disabled trigger and items
- ✅ **TypeScript**: Fully typed with no `any` types
- ✅ **Simple & Maintainable**: ~500 lines vs 1500+ in bits-ui

## Installation

```bash
# The component is located at:
# src/forms/select/new/
```

## Basic Usage

### Single Select

```svelte
<script lang="ts">
  import { Select } from "@sv0/components/forms/select/new";

  let value = $state("");
</script>

<Select.Root bind:value placeholder="Select a fruit">
  <Select.Trigger class="...">
    {value || "Select a fruit"}
  </Select.Trigger>

  <Select.Content class="...">
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
    <Select.Item value="orange">Orange</Select.Item>
  </Select.Content>
</Select.Root>
```

### Multiple Select

```svelte
<script lang="ts">
  import { Select } from "@sv0/components/forms/select/new";

  let values = $state<string[]>([]);
</script>

<Select.Root bind:value={values} multiple>
  <Select.Trigger class="...">
    {values.length > 0 ? `${values.length} selected` : "Select fruits"}
  </Select.Trigger>

  <Select.Content class="...">
    <Select.Item value="apple">
      {#snippet children({ selected })}
        {selected ? "✓" : "○"} Apple
      {/snippet}
    </Select.Item>
    <Select.Item value="banana">
      {#snippet children({ selected })}
        {selected ? "✓" : "○"} Banana
      {/snippet}
    </Select.Item>
  </Select.Content>
</Select.Root>
```

### With Groups

```svelte
<Select.Root bind:value>
  <Select.Trigger>Select a fruit</Select.Trigger>

  <Select.Content>
    <Select.Group label="Citrus">
      <Select.Item value="orange">Orange</Select.Item>
      <Select.Item value="lemon">Lemon</Select.Item>
    </Select.Group>

    <Select.Separator />

    <Select.Group label="Berries">
      <Select.Item value="strawberry">Strawberry</Select.Item>
      <Select.Item value="blueberry">Blueberry</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>
```

### With Form Integration

```svelte
<form>
  <Select.Root
    bind:value
    name="fruit"
    required
  >
    <Select.Trigger>Select a fruit</Select.Trigger>
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.Content>
  </Select.Root>

  <button type="submit">Submit</button>
</form>
```

## API Reference

### Select.Root

The root component that manages state and provides context.

**Props:**

- `value` - The selected value(s). Bindable. Type: `string | string[]`
- `onValueChange` - Callback when value changes. Type: `(value: string | string[]) => void`
- `open` - Whether the dropdown is open. Bindable. Type: `boolean`
- `onOpenChange` - Callback when open state changes. Type: `(open: boolean) => void`
- `disabled` - Whether the select is disabled. Default: `false`
- `required` - Whether the select is required for form submission. Default: `false`
- `name` - Name for form submission
- `multiple` - Whether to allow multiple selections. Default: `false`
- `placeholder` - Placeholder text when no value selected

### Select.Trigger

The button that opens/closes the dropdown.

**Props:**

- `class` - CSS class
- `children` - Snippet that receives `{ value, open }`
- All standard button attributes

### Select.Content

The dropdown container.

**Props:**

- `class` - CSS class
- `sideOffset` - Offset from trigger. Default: `4`
- `align` - Alignment relative to trigger. Type: `"start" | "center" | "end"`. Default: `"center"`
- `side` - Side to display content. Type: `"top" | "bottom" | "left" | "right"`. Default: `"bottom"`
- All standard div attributes

### Select.Item

A selectable option.

**Props:**

- `value` - The value of this item. Required.
- `label` - Display label (defaults to value)
- `disabled` - Whether this item is disabled. Default: `false`
- `class` - CSS class
- `children` - Snippet that receives `{ selected, highlighted }`
- All standard div attributes

### Select.Group

Container for grouping items.

**Props:**

- `label` - Optional label for the group
- `class` - CSS class
- All standard div attributes

### Select.Label

A label for a group.

**Props:**

- `class` - CSS class
- All standard div attributes

### Select.Separator

A visual separator between items or groups.

**Props:**

- `class` - CSS class
- All standard div attributes

## Keyboard Navigation

- **Enter/Space/ArrowDown/ArrowUp**: Open dropdown
- **Escape**: Close dropdown
- **ArrowDown**: Navigate to next item
- **ArrowUp**: Navigate to previous item
- **Home**: Jump to first item
- **End**: Jump to last item
- **Enter/Space**: Select highlighted item
- **Tab**: Close dropdown and move focus

## Accessibility

The component follows WAI-ARIA best practices:

- `role="combobox"` on trigger
- `role="listbox"` on content
- `role="option"` on items
- `role="group"` on groups
- `aria-expanded` to indicate dropdown state
- `aria-selected` to indicate selected items
- `aria-disabled` to indicate disabled state
- `aria-activedescendant` for keyboard navigation
- Proper focus management

## Comparison with bits-ui

| Feature | bits-ui | This Implementation |
|---------|---------|-------------------|
| Lines of Code | 1500+ | ~500 |
| Svelte Version | 5 | 5 |
| Runes Only | ✅ | ✅ |
| Class-based State | ✅ | ❌ (Context API) |
| Single/Multiple | ✅ | ✅ |
| Keyboard Nav | ✅ | ✅ (Simplified) |
| Typeahead | ✅ | ❌ |
| Scroll Buttons | ✅ | ❌ |
| Combobox Mode | ✅ | ❌ |
| Form Integration | ✅ | ✅ |
| Accessibility | ✅ | ✅ |

This implementation focuses on the most common use cases while maintaining full accessibility and a clean, maintainable codebase.

## Testing

Run the tests:

```bash
npm test src/forms/select/new/select.test.ts
```

The component has comprehensive test coverage including:
- Single and multiple selection
- Keyboard navigation
- Accessibility
- Form integration
- Disabled states
- Groups and labels

## Demo

See `demo.svelte` for interactive examples.

## License

Same as parent project.
