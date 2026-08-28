# Select Component API Summary

## Overview

The Select component provides two complementary APIs for building dropdown
selection interfaces:

1. **Declarative API** - Traditional Svelte component composition
2. **Imperative API** - Configuration-based programmatic creation

## Quick Comparison

| Feature            | Declarative              | Imperative                      |
| ------------------ | ------------------------ | ------------------------------- |
| **Syntax**         | Template/Markup          | Configuration Object            |
| **Use Case**       | Static structures        | Dynamic structures              |
| **Flexibility**    | High (custom snippets)   | Medium (predefined patterns)    |
| **Type Safety**    | Full                     | Full                            |
| **Learning Curve** | Familiar to Svelte users | Familiar to config-driven users |
| **Best For**       | One-off selects          | Reusable configurations         |

## Declarative API

### Basic Example

```svelte
<script lang="ts">
  import { Select } from "@sv0/components/forms/select";

  let value = $state<string>();
</script>

<Select.Root bind:value>
  <Select.Trigger>Select a fruit</Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>
```

### Components

- `Select.Root` - Container and state management
- `Select.Trigger` - Button that opens/closes dropdown
- `Select.Content` - Dropdown container
- `Select.Item` - Selectable option
- `Select.Group` - Groups related items
- `Select.Label` - Non-interactive label
- `Select.Separator` - Visual divider

### When to Use

- Static select structures
- Custom rendering with complex snippets
- Fine-grained control over each component
- Small, one-off implementations

## Imperative API

### Basic Example

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
        { type: "item", value: "banana", label: "Banana" }
      ]
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

### Key Types

- `SelectConfig<T>` - Root configuration
- `SelectTriggerConfig<T>` - Trigger button configuration
- `SelectContentConfig<T>` - Dropdown content configuration
- `SelectContentNode<T>` - Union of all node types
- `SelectItemNode<T>` - Item configuration
- `SelectGroupNode<T>` - Group configuration
- `SelectLabelNode` - Label configuration
- `SelectSeparatorNode` - Separator configuration

### When to Use

- Dynamic structures from backend data
- Shared/reusable configurations
- Programmatic generation
- Data-driven UIs

## Choosing Between APIs

### Use Declarative When:

```svelte
<!-- Static structure with custom rendering -->
<Select.Root bind:value>
  <Select.Trigger>
    {#snippet children(value)}
      {#if value}
        <CustomIcon icon={value.icon} />
        <span>{value.label}</span>
      {:else}
        Select an option
      {/if}
    {/snippet}
  </Select.Trigger>
  <Select.Content>
    <Select.Item value={item1}>
      <ComplexCustomComponent {...item1} />
    </Select.Item>
  </Select.Content>
</Select.Root>
```

### Use Imperative When:

```svelte
<script lang="ts">
  // Configuration from backend.
  const categories = await fetch("/api/categories").then((r) => r.json());

  const config: SelectConfig<string> = {
    trigger: {},
    content: {
      children: categories.flatMap((cat) => [
        {
          type: "group",
          label: cat.name,
          children: cat.items.map((item) => ({
            type: "item",
            value: item.id,
            label: item.label
          }))
        },
        { type: "separator" }
      ])
    }
  };
</script>

<ImperativeSelect bind:value {config} />
```

## Mixing Both APIs

You can use the `SelectRenderer` component within a declarative Select:

```svelte
<script lang="ts">
  import { Select, SelectRenderer } from "@sv0/components/forms/select";
  import type { SelectContentNode } from "@sv0/components/forms/select/api.svelte";

  // Build nodes programmatically.
  const nodes: SelectContentNode<string>[] = buildNodesFromData(data);
</script>

<Select.Root bind:value>
  <!-- Custom trigger with declarative syntax -->
  <Select.Trigger>
    {#snippet children(value)}
      <CustomTrigger {value} />
    {/snippet}
  </Select.Trigger>

  <!-- Content from configuration -->
  <Select.Content>
    <SelectRenderer {nodes} />
  </Select.Content>
</Select.Root>
```

## Common Patterns

### Backend-Driven Select (Imperative)

```typescript
// api.ts
export async function fetchSelectOptions() {
  const response = await fetch("/api/options");
  const data = await response.json();

  return {
    trigger: {},
    content: {
      children: data.map((item) => ({
        type: "item" as const,
        value: item.id,
        label: item.name
      }))
    }
  } satisfies SelectConfig<string>;
}
```

```svelte
<!-- component.svelte -->
<script lang="ts">
  const config = await fetchSelectOptions();
  let value = $state<string>();
</script>

<ImperativeSelect bind:value {config} />
```

### Custom Rendering (Declarative)

```svelte
<Select.Root bind:value>
  <Select.Trigger>
    {#snippet children(value)}
      {#if value}
        <Avatar src={value.avatar} />
        <span>{value.name}</span>
      {:else}
        Select a user
      {/if}
    {/snippet}
  </Select.Trigger>
  <Select.Content>
    {#each users as user}
      <Select.Item value={user}>
        {#snippet children({ selected })}
          <Avatar src={user.avatar} />
          <span>{user.name}</span>
          {#if selected}<CheckIcon />{/if}
        {/snippet}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
```

### Hybrid Approach

```svelte
<script lang="ts">
  // Use imperative for structure, declarative for custom rendering.
  const structure = buildSelectStructure(data);
</script>

<Select.Root bind:value>
  <Select.Trigger>
    <CustomTrigger {value} />
  </Select.Trigger>
  <Select.Content>
    <SelectRenderer nodes={structure} />
    <!-- Add custom items at the end -->
    <Select.Separator />
    <Select.Item value="custom">
      <SpecialCustomItem />
    </Select.Item>
  </Select.Content>
</Select.Root>
```

## Performance Considerations

### Declarative API

- **Pros:** Svelte compiler optimizations, fine-grained reactivity
- **Cons:** More DOM nodes for complex structures

### Imperative API

- **Pros:** Lazy rendering, easier to virtualize for large lists
- **Cons:** Additional abstraction layer, slightly more overhead

Both APIs perform well for typical use cases (< 1000 items). For very large
lists, consider implementing virtualization or filtering.

## Migration Guide

### From Declarative to Imperative

Before:

```svelte
<Select.Root bind:value>
  <Select.Trigger>Select</Select.Trigger>
  <Select.Content>
    <Select.Group label="Fruits">
      <Select.Item value="apple">Apple</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>
```

After:

```svelte
<ImperativeSelect
  bind:value
  config={{
    trigger: {},
    content: {
      children: [
        {
          type: "group",
          label: "Fruits",
          children: [{ type: "item", value: "apple", label: "Apple" }]
        }
      ]
    }
  }} />
```

### From Imperative to Declarative

Before:

```svelte
<ImperativeSelect bind:value {config} />
```

After:

```svelte
<Select.Root bind:value>
  <Select.Trigger>{config.trigger.children}</Select.Trigger>
  <Select.Content>
    <SelectRenderer nodes={config.content.children} />
  </Select.Content>
</Select.Root>
```

## Best Practices

1. **Use Declarative for UI-heavy selects** with custom rendering
2. **Use Imperative for data-driven selects** from backend APIs
3. **Mix both** when you need structural flexibility with custom rendering
4. **Type your configurations** for compile-time safety
5. **Extract configs** into separate files for reusability
6. **Test with both APIs** to ensure feature parity
