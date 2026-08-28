# Imperative Select API

A programmatic API for creating Select components using configuration objects
instead of declarative templates.

## Overview

The Imperative Select API allows you to define complete Select component
hierarchies as plain JavaScript objects. This approach is particularly useful
when:

- Building dynamic UIs where the select structure comes from backend data
- Sharing select configurations across multiple locations
- Preferring a more functional programming style over template syntax
- Need to programmatically generate complex nested structures

## Core Concepts

### 1. Configuration-Based

Instead of writing:

```svelte
<Select.Root bind:value>
  <Select.Trigger>Select an option</Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>
```

You can write:

```svelte
<ImperativeSelect bind:value {config} />
```

Where `config` is a plain object defining the structure.

### 2. Recursive Rendering

The renderer automatically handles nested groups of arbitrary depth, processing
the configuration tree and instantiating the appropriate components.

### 3. Type Safety

Full TypeScript support with generic value types ensures compile-time safety for
your select configurations.

## API Reference

### SelectConfig<T>

The root configuration type for creating a Select component.

```typescript
type SelectConfig<T = unknown> = {
  // State Management
  value?: T;
  onValueChange?: (value: T) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Behavior
  disabled?: boolean;
  required?: boolean;
  name?: string;
  multiple?: boolean;
  placeholder?: string;

  // Styling
  width?: "fit" | "full" | "content";
  class?: string;

  // Structure
  trigger: SelectTriggerConfig<T>;
  content: SelectContentConfig<T>;
};
```

### SelectTriggerConfig<T>

Configuration for the trigger button.

```typescript
type SelectTriggerConfig<T = unknown> = {
  size?: "sm" | "default" | "lg";
  width?: "auto" | "full" | "content";
  intent?: "default" | "outline" | "ghost";
  class?: string;
  children?: Snippet<[T | undefined]> | string;
};
```

### SelectContentConfig<T>

Configuration for the dropdown content.

```typescript
type SelectContentConfig<T = unknown> = {
  offset?: number;
  placement?: Placement; // from @floating-ui/dom
  size?: "sm" | "default" | "lg";
  width?: "trigger" | "content" | "full";
  class?: string;
  children: SelectContentNode<T>[];
};
```

### SelectContentNode<T>

Union type representing any valid content node.

```typescript
type SelectContentNode<T = unknown> =
  | SelectItemNode<T>
  | SelectLabelNode
  | SelectSeparatorNode
  | SelectGroupNode<T>;
```

### SelectItemNode<T>

Configuration for a selectable item.

```typescript
type SelectItemNode<T = unknown> = {
  type: "item";
  value: T;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  class?: string;
  children?: Snippet<[{ selected: boolean; highlighted: boolean }]> | string;
};
```

### SelectGroupNode<T>

Configuration for a group containing nested items.

```typescript
type SelectGroupNode<T = unknown> = {
  type: "group";
  label?: string;
  spacing?: "none" | "sm" | "default" | "lg";
  padding?: "none" | "sm" | "default" | "lg";
  class?: string;
  children: SelectContentNode<T>[];
};
```

### SelectLabelNode

Configuration for a non-interactive label.

```typescript
type SelectLabelNode = {
  type: "label";
  label?: string;
  size?: "sm" | "default" | "lg";
  weight?: "normal" | "medium" | "semibold";
  class?: string;
  children?: Snippet<[]> | string;
};
```

### SelectSeparatorNode

Configuration for a visual separator.

```typescript
type SelectSeparatorNode = {
  type: "separator";
  orientation?: "horizontal" | "vertical";
  class?: string;
};
```

## Usage Examples

### Basic Single Select

```svelte
<script lang="ts">
  import { ImperativeSelect } from "@sv0/components/forms/select";
  import type { SelectConfig } from "@sv0/components/forms/select/api.svelte";

  let value = $state<string>();

  const config: SelectConfig<string> = {
    placeholder: "Select a fruit",
    trigger: {},
    content: {
      children: [
        { type: "item", value: "apple", label: "Apple" },
        { type: "item", value: "banana", label: "Banana" },
        { type: "item", value: "orange", label: "Orange" }
      ]
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

### Grouped Select

```svelte
<script lang="ts">
  const config: SelectConfig<string> = {
    trigger: {},
    content: {
      children: [
        {
          type: "group",
          label: "Fruits",
          children: [
            { type: "item", value: "apple", label: "🍎 Apple" },
            { type: "item", value: "banana", label: "🍌 Banana" }
          ]
        },
        { type: "separator" },
        {
          type: "group",
          label: "Vegetables",
          children: [
            { type: "item", value: "carrot", label: "🥕 Carrot" },
            { type: "item", value: "broccoli", label: "🥦 Broccoli" }
          ]
        }
      ]
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

### Multiple Selection

```svelte
<script lang="ts">
  let value = $state<string[] | string>([]);

  const config: SelectConfig<string[] | string> = {
    multiple: true,
    placeholder: "Select fruits",
    trigger: {},
    content: {
      children: [
        { type: "item", value: "apple", label: "🍎 Apple" },
        { type: "item", value: "banana", label: "🍌 Banana" },
        { type: "item", value: "orange", label: "🍊 Orange" }
      ]
    }
  };
</script>

<ImperativeSelect bind:value {config} />
<p>Selected: {Array.isArray(value) ? value.join(", ") : value}</p>
```

### Custom Value Types

```svelte
<script lang="ts">
  type Item = {
    id: number;
    name: string;
    category: string;
  };

  let value = $state<Item>();

  const items: Item[] = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" }
  ];

  const config: SelectConfig<Item> = {
    trigger: {},
    content: {
      children: items.map((item) => ({
        type: "item" as const,
        value: item,
        label: `${item.name} (${item.category})`
      }))
    }
  };
</script>

<ImperativeSelect bind:value {config} /><p>Selected: {value?.name}</p>
```

### Dynamic Configuration from Backend

```svelte
<script lang="ts">
  import { ImperativeSelect } from "@sv0/components/forms/select";
  import type {
    SelectConfig,
    SelectContentNode
  } from "@sv0/components/forms/select/api.svelte";

  type Category = {
    name: string;
    items: { id: string; label: string }[];
  };

  // Simulated backend data.
  const categories: Category[] = await fetchCategories();

  // Build configuration from backend data.
  const config: SelectConfig<string> = {
    trigger: {},
    content: {
      children: categories.flatMap((category, index) => {
        const nodes: SelectContentNode<string>[] = [
          {
            type: "group",
            label: category.name,
            children: category.items.map((item) => ({
              type: "item" as const,
              value: item.id,
              label: item.label
            }))
          }
        ];

        // Add separator between categories (but not after the last one).
        if (index < categories.length - 1) {
          nodes.push({ type: "separator" });
        }

        return nodes;
      })
    }
  };

  let value = $state<string>();
</script>

<ImperativeSelect bind:value {config} />
```

### With Custom Snippets

```svelte
<script lang="ts">
  import { ImperativeSelect } from "@sv0/components/forms/select";
  import type { SelectConfig } from "@sv0/components/forms/select/api.svelte";

  type Item = { value: string; label: string; icon: string };

  let value = $state<Item>();

  const items: Item[] = [
    { value: "apple", label: "Apple", icon: "🍎" },
    { value: "banana", label: "Banana", icon: "🍌" }
  ];

  const config: SelectConfig<Item> = {
    trigger: {
      children: (current) => {
        return current ? `${current.icon} ${current.label}` : "Select...";
      }
    },
    content: {
      children: items.map((item) => ({
        type: "item" as const,
        value: item,
        children: ({ selected }) => {
          return `${selected ? "✓" : "○"} ${item.icon} ${item.label}`;
        }
      }))
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

### Nested Groups

```svelte
<script lang="ts">
  const config: SelectConfig<string> = {
    trigger: {},
    content: {
      children: [
        {
          type: "group",
          label: "Fresh Produce",
          children: [
            {
              type: "group",
              label: "Fruits",
              spacing: "sm",
              children: [
                { type: "item", value: "apple", label: "Apple" },
                { type: "item", value: "banana", label: "Banana" }
              ]
            },
            {
              type: "group",
              label: "Vegetables",
              spacing: "sm",
              children: [
                { type: "item", value: "carrot", label: "Carrot" },
                { type: "item", value: "broccoli", label: "Broccoli" }
              ]
            }
          ]
        },
        { type: "separator" },
        {
          type: "group",
          label: "Frozen",
          children: [
            { type: "item", value: "frozen-peas", label: "Frozen Peas" }
          ]
        }
      ]
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

## Using the Renderer Directly

You can also use the `SelectRenderer` component directly within a standard
`Select.Root`:

```svelte
<script lang="ts">
  import { Select, SelectRenderer } from "@sv0/components/forms/select";
  import type { SelectContentNode } from "@sv0/components/forms/select/api.svelte";

  let value = $state<string>();

  const nodes: SelectContentNode<string>[] = [
    { type: "item", value: "apple", label: "Apple" },
    { type: "separator" },
    {
      type: "group",
      label: "Berries",
      children: [
        { type: "item", value: "strawberry", label: "Strawberry" },
        { type: "item", value: "blueberry", label: "Blueberry" }
      ]
    }
  ];
</script>

<Select.Root bind:value>
  <Select.Trigger>Select a fruit</Select.Trigger>
  <Select.Content>
    <SelectRenderer {nodes} />
  </Select.Content>
</Select.Root>
```

## Advantages

1. **Data-Driven:** Define UI structure as data, making it easy to serialize,
   share, and manipulate.
2. **Backend Integration:** Easily convert backend API responses into select
   configurations.
3. **Reusability:** Share configurations across multiple components or
   applications.
4. **Testability:** Test select structures without rendering components.
5. **Type Safety:** Full TypeScript support ensures correctness at compile time.

## When to Use

Use the imperative API when:

- Building dynamic forms where structure comes from backend data
- Creating reusable select configurations
- Generating complex nested structures programmatically
- Preferring configuration over templates

Use the declarative API when:

- The select structure is static and simple
- You need fine-grained control over rendering
- Custom snippets with complex logic are required
- Working with small, one-off select components
