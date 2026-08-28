<script lang="ts">
  import { ChevronDown, ChevronUp } from "@lucide/svelte";
  import { Demo } from "@sv0/components/demos";
  import { Collapsible } from "./index.js";

  let isOpen = $state(false);
</script>

<Demo.Root
  title="Collapsible"
  description="A collapsible component for showing and hiding content.">
  <Demo.Section title="Default" description="A collapsible section with toggle trigger.">
    <Collapsible.Root bind:open={isOpen} class="w-[350px] space-y-2">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <Collapsible.Trigger
          class="hover:bg-muted flex h-9 w-9 items-center justify-center rounded-md">
          {#if isOpen}
            <ChevronUp class="h-4 w-4 transition-transform" />
          {:else}
            <ChevronDown class="h-4 w-4 transition-transform" />
          {/if}
        </Collapsible.Trigger>
      </div>
      <div class="rounded-md border px-4 py-3 text-sm">@radix-ui/primitives</div>
      <Collapsible.Content class="space-y-2">
        <div class="rounded-md border px-4 py-3 text-sm">@radix-ui/colors</div>
        <div class="rounded-md border px-4 py-3 text-sm">@stitches/react</div>
      </Collapsible.Content>
    </Collapsible.Root>
  </Demo.Section>
</Demo.Root>
