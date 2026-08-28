<script lang="ts">
  import { Badge } from "@sv0/components/display/badge";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { Card } from "../card";
  import type { PortalInstance } from "./api.svelte";

  let {
    instance,
    foo,
    id,
    destroy,
    top,
    right
  }: {
    instance: PortalInstance;
    foo: string;
    id: string;
    destroy: () => void;
    top: number;
    right: number;
  } = $props();
</script>

<Card.Root
  class="fixed top-4 right-4 w-75 space-y-4 rounded-md border-fuchsia-600 p-4"
  style="top: {top}px; right: {right}px;">
  <div>
    <h2 class="text-2xl font-bold">Portal'ed Component</h2>
    <p class="text-sm text-slate-400">This is a dynamically rendered component in a portal!</p>
  </div>
  <div class="rounded-md border border-indigo-600 bg-black p-2">
    <p class="text-sm text-slate-400">Props passed to the component via the portal manager:</p>
    <Badge intent="outline" size="sm" class="text-xs">
      <pre class="text-slate-500">$props().id:</pre>
      <pre class="text-lime-500">{id}</pre>
    </Badge>
    <Badge intent="outline" size="sm" class="text-xs">
      <pre class="text-slate-500">$props().foo:</pre>
      <pre class="text-lime-500">{foo}</pre>
    </Badge>
  </div>
  <Button effect="press" intent="destructive" onclick={() => destroy()}>
    Unmount Portal (API-driven)
  </Button>
</Card.Root>
