<script lang="ts">
  import type { FAQItem } from "@sv0/components/content/faq/types";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import Item from "./item.svelte";

  import { type WithOptionalChildren } from "@sv0/components/utils/props";

  let {
    items,
    multiple = false,
    ...rest
  }: {
    items: FAQItem[];
    multiple?: boolean;
  } & WithOptionalChildren = $props();

  // "border-muted/35  overflow-hidden rounded-lg border bg-black"

  const built = usePropsBuilder(rest).withClassMerge("");

  let expandedItems = $state<Set<string>>(
    new Set(items.filter((item) => item.defaultExpanded).map((item) => item.id))
  );

  function handleToggle(itemId: string) {
    if (multiple) {
      if (expandedItems.has(itemId)) {
        expandedItems.delete(itemId);
      } else {
        expandedItems.add(itemId);
      }
      expandedItems = new Set(expandedItems);
    } else {
      if (expandedItems.has(itemId)) {
        expandedItems = new Set();
      } else {
        expandedItems = new Set([itemId]);
      }
    }
  }
</script>

<div class={built.class} {...rest}>
  <div class={`space-y-4`}>
    {#each items as item, index (item.id)}
      <Item
        {item}
        {index}
        expanded={expandedItems.has(item.id)}
        onToggle={() => handleToggle(item.id)} />
    {/each}
  </div>
</div>
