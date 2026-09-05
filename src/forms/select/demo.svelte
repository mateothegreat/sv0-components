<script lang="ts">
  import { Apple, Banana, Cherry, ChevronDown } from "@lucide/svelte";
  import { Demo } from "@sv0/components/demos";
  import { Select } from "@sv0/components/forms/select";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import type { Component } from "svelte";
  import ImperativeDemo from "./api/demo.svelte";

  type Item = {
    label: string;
    value: string;
    color?: string;
    icon?: Component;
  };

  const fruits: Item[] = [
    { label: "Apple", value: "apple", icon: Apple, color: "text-green-500" },
    { label: "Banana", value: "banana", icon: Banana, color: "text-yellow-500" },
    { label: "Cherry", value: "cherry", icon: Cherry, color: "text-red-500" }
  ];

  const vegetables: Item[] = [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" }
  ];

  const berries: Item[] = [
    { label: "Strawberry", value: "strawberry" },
    { label: "Blueberry", value: "blueberry" }
  ];

  let single = $state<Item>();
  let textTrigger = $state<Item>();
  let multiple = $state<Item[]>([]);
  let action = $state<Item>();
  let smallValue = $state<string>();
  let largeValue = $state<string>();
  let disabledValue = $state<string>();
  let groupValue = $state<string>();
</script>

{#snippet item(value: Item)}
  <div class="flex items-center gap-2 text-slate-400">
    {#if value.icon}
      <value.icon class={value.color} />
    {/if}
    <span>{value.label}</span>
  </div>
{/snippet}

<div class="space-y-5">
  <ImperativeDemo />

  <Demo.Root
    title="Declarative Select Component"
    description="A flexible and accessible select component with support for single and multiple selection, custom styling, grouping, and various intents. Features rich content rendering with snippets, keyboard navigation, and portal-based dropdown positioning for perfect placement in any layout.">
    <Demo.Section
      title="Single Select with Custom Trigger"
      description="Create rich, interactive select triggers with full control over rendering. Use snippets to customize both the trigger content and individual items with icons, colors, and complex layouts. The trigger snippet receives the current value, allowing dynamic rendering based on selection state."
      class="flex gap-4">
      <Select.Root bind:value={single}>
        <Select.Trigger class="w-40">
          {#snippet children(value?: Item)}
            {#if value}
              {@render item(value)}
            {:else}
              <div class="flex items-center gap-2 text-slate-400">
                <Banana class="text-yellow-300" />
                <span>{value?.label || "Select a fruit.."}</span>
              </div>
            {/if}
            <ChevronDown class="text-slate-500" />
          {/snippet}
        </Select.Trigger>
        <Select.Content>
          <Select.Label label="Fruits" />
          {#each fruits as fruit}
            <Select.Item value={fruit}>{@render item(fruit)}</Select.Item>
          {/each}
          <Select.Label label="Declarative Items Group (no label)" />
          <Select.Group>
            <Select.Item value={{ label: "Foo Item", value: "foo" }}>Foo Item</Select.Item>
            <Select.Item value={{ label: "Bar Item", value: "bar" }}>Bar Item</Select.Item>
            <Select.Separator />
            <Select.Item value={{ label: "Baz Item", value: "baz" }}>Baz Item</Select.Item>
          </Select.Group>
          <Select.Group label="Berries Group (with label)">
            {#each berries as berry}
              <Select.Item value={berry}>{berry.label}</Select.Item>
            {/each}
          </Select.Group>
          <Select.Label label="Label Above Group" />
          <Select.Group>
            {#each vegetables as vegetable}
              <Select.Item value={vegetable}>{vegetable.label}</Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <div class="-mt-0.25">
        <Button
          intent="outline"
          onclick={() => {
            single = undefined;
          }}>Reset</Button>
      </div>
      <p class="mt-2 text-sm text-gray-600">
        Selected: {single?.label || "None"} (value: {single || "none"})
      </p>
    </Demo.Section>

    <Demo.Section
      title="Text-Only Trigger"
      description="Use simple text strings as trigger content for minimal, clean select controls. Perfect for inline forms and compact UIs where visual simplicity is key.">
      <Select.Root bind:value={textTrigger} placeholder="Select a fruit">
        <Select.Trigger>Do select something..</Select.Trigger>
        <Select.Content>
          {#each fruits as item}
            <Select.Item value={item}>{item.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">
        Selected: {textTrigger?.label || "None"} (value: {textTrigger || "none"})
      </p>
    </Demo.Section>

    <Demo.Section
      title="Small Size Variant"
      description="Compact select controls optimized for dense layouts and inline forms. The small size reduces padding and font size while maintaining accessibility and touch-friendly interaction areas.">
      <Select.Root bind:value={smallValue} placeholder="Select an option">
        <Select.Trigger size="sm" intent="outline">
          {#snippet children(value)}
            <span>{value || "Small select"}</span>
            <span class="ml-2">▼</span>
          {/snippet}
        </Select.Trigger>
        <Select.Content size="sm">
          <Select.Item value="option1" size="sm">Option 1</Select.Item>
          <Select.Item value="option2" size="sm">Option 2</Select.Item>
          <Select.Item value="option3" size="sm">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {smallValue || "None"}</p>
    </Demo.Section>

    <Demo.Section
      title="Large Size Variant"
      description="Spacious select controls with increased padding and larger text, ideal for prominent form fields, hero sections, or touch-first interfaces where larger tap targets improve usability.">
      <Select.Root bind:value={largeValue} placeholder="Select an option">
        <Select.Trigger size="lg" width="auto">
          {#snippet children(value)}
            <span>{value || "Large select"}</span>
            <span class="ml-2">▼</span>
          {/snippet}
        </Select.Trigger>
        <Select.Content size="lg">
          <Select.Item value="option1" size="lg">Option 1</Select.Item>
          <Select.Item value="option2" size="lg">Option 2</Select.Item>
          <Select.Item value="option3" size="lg">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {largeValue || "None"}</p>
    </Demo.Section>

    <Demo.Section
      title="Multiple Selection"
      description="Enable multi-select mode to allow users to choose multiple options simultaneously. The selected items are managed as an array, and you can customize the trigger to display selection count, badges, or any other visual indicator of multiple choices.">
      <Select.Root bind:value={multiple} multiple placeholder="Select fruits">
        <Select.Trigger>
          {#snippet children(value)}
            {#if Array.isArray(value) && value.length > 0}
              <span>{value.length} selected</span>
            {:else}
              <span>Select fruits</span>
            {/if}
            <span class="ml-2">▼</span>
          {/snippet}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">
            {#snippet children(selected)}
              <span class="mr-2">{selected ? "✓" : "○"}</span>
              🍎 Apple
            {/snippet}
          </Select.Item>
          <Select.Item value="banana">
            {#snippet children(selected)}
              <span class="mr-2">{selected ? "✓" : "○"}</span>
              🍌 Banana
            {/snippet}
          </Select.Item>
          <Select.Item value="orange">
            {#snippet children(selected)}
              <span class="mr-2">{selected ? "✓" : "○"}</span>
              🍊 Orange
            {/snippet}
          </Select.Item>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {multiple?.join(", ") || "None"}</p>
    </Demo.Section>

    <Demo.Section
      title="Ghost Variant with Destructive Items"
      description="Combine the ghost trigger intent (minimal background) with destructive item intents to create action menus with visual hierarchy. Destructive items are styled with warning colors to prevent accidental dangerous actions like deletion.">
      <Select.Root bind:value={action} placeholder="Select an action">
        <Select.Trigger intent="ghost">
          {#snippet children(value)}
            <span>{value || "Select action"}</span>
            <span class="ml-2">▼</span>
          {/snippet}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="edit">Edit</Select.Item>
          <Select.Item value="duplicate">Duplicate</Select.Item>
          <Select.Separator spacing="lg" />
          <Select.Item value="delete" intent="destructive">Delete</Select.Item>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {action || "None"}</p>
    </Demo.Section>

    <Demo.Section
      title="Disabled Items"
      description="Disable individual items to prevent selection while keeping them visible in the list. Useful for showing unavailable options, permissions-restricted choices, or temporarily disabled features with contextual explanations.">
      <Select.Root bind:value={disabledValue} placeholder="Select an option">
        <Select.Trigger>Select an option</Select.Trigger>
        <Select.Content>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2" disabled>Option 2 (Disabled)</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {disabledValue || "None"}</p>
    </Demo.Section>

    <Demo.Section
      title="Custom Styling with Groups"
      description="Organize related options into labeled groups with customizable spacing, padding, and visual separators. Groups support both string labels and custom snippet rendering for maximum flexibility in creating structured, hierarchical selection menus.">
      <Select.Root bind:value={groupValue} placeholder="Select a category">
        <Select.Trigger>Select a category</Select.Trigger>
        <Select.Content>
          <Select.Group label="Fruits" spacing="lg" padding="sm">
            <Select.Item value="apple">🍎 Apple</Select.Item>
            <Select.Item value="banana">🍌 Banana</Select.Item>
          </Select.Group>
          <Select.Separator spacing="lg" color="accent" />
          <Select.Group spacing="sm">
            {#snippet label()}
              <p>Vegetables</p>
            {/snippet}
            <Select.Item value="carrot">🥕 Carrot</Select.Item>
            <Select.Item value="broccoli">🥦 Broccoli</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <p class="mt-2 text-sm text-gray-600">Selected: {groupValue || "None"}</p>
    </Demo.Section>
  </Demo.Root>
</div>
