<!--
  @component

  Recursive renderer for Select content nodes.

  This component handles the recursive rendering of Select component hierarchies from a
  configuration object. It processes each node type (item, label, separator, group) and
  recursively renders child nodes for groups, creating arbitrarily nested structures.

  The renderer supports all Select component features including custom snippets, styling
  variants, and accessibility attributes. It maintains type safety throughout the rendering
  process and ensures proper component nesting according to Select's requirements.

  ## Usage

  ```svelte
  <script lang="ts">
    import { SelectRenderer } from "@sv0/components/forms/select";
    import type { SelectContentNode } from "@sv0/components/forms/select/api.svelte";

    const nodes: SelectContentNode<string>[] = [
      { type: "item", value: "apple", label: "Apple" },
      { type: "separator" },
      {
        type: "group",
        label: "Fruits",
        children: [
          { type: "item", value: "banana", label: "Banana" },
          { type: "item", value: "orange", label: "Orange" }
        ]
      }
    ];
  </script>

  <SelectRenderer {nodes} />
  ```

  @category Select
-->
<script lang="ts" generics="T">
  import { Select } from "@sv0/components/forms/select";
  import { SelectComponentType, type SelectNode } from "./types";

  /**
   * The array of content nodes to render recursively.
   *
   * Each node represents a Select sub-component (item, label, separator, or group).
   * Groups can contain nested children, enabling hierarchical structures of arbitrary
   * depth.
   */
  let { nodes }: { nodes: SelectNode<T>[] } = $props();
</script>

{#each nodes as node (node)}
  {#if node.type === SelectComponentType.ITEM}
    <Select.Item
      value={node.value}
      label={node.label}
      disabled={node.disabled}
      size={node.size}
      class={node.class}>
      {#if typeof node.children === "string"}
        {node.children}
      {:else if node.renderer}
        {@render node.renderer(node.value)}
      {/if}
    </Select.Item>
  {:else if node.type === SelectComponentType.LABEL}
    <Select.Label label={node.label} size={node.size} weight={node.weight} class={node.class}>
      {#if typeof node.children === "string"}
        {node.children}
      {:else if node.renderer}
        {@render node.renderer(node)}
      {/if}
    </Select.Label>
  {:else if node.type === SelectComponentType.SEPARATOR}
    <Select.Separator orientation={node.orientation} class={node.class} />
  {:else if node.type === SelectComponentType.GROUP}
    <Select.Group
      label={node.label}
      spacing={node.spacing}
      padding={node.padding}
      class={node.class}>
      <svelte:self nodes={node.children} />
    </Select.Group>
  {/if}
{/each}
