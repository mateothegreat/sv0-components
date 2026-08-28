<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Badge } from "@sv0/components/display/badge";
  import { Callout } from "@sv0/components/display/callout";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { createPortalManager, type PortalInstance } from "./api.svelte";

  import { CircleFadingPlus } from "@lucide/svelte";
  import Example from "./example.svelte";
  import Portal from "./root.svelte";

  let showDefaultPortal = $state(false);
  let showCustomPortal = $state(false);
  let showDisabledPortal = $state(false);
  let showMultiplePortals = $state(false);

  let customTargetRef: HTMLElement | undefined = $state();

  const portalManager = createPortalManager();

  let instance = $state<PortalInstance>();

  const renderPortal = () => {
    instance = portalManager.render({
      component: Example,
      props: {
        foo: "bar!",
        top: (portalManager.portals.size + 1) * 25,
        right: (portalManager.portals.size + 1) * 25
      }
    });
  };

  const unmountPortal = () => {
    portalManager.unmountAll();
  };

  $effect(() => {
    console.log("instance", portalManager.portals);
  });
</script>

<Demo.Root
  title="Portal"
  description="Built with mobile devices as a first-class citizen, handling viewport changes, orientation shifts, and touch event propagation automatically. The portal intelligently adapts to dynamic layouts, maintains proper cleanup during navigation, and ensures flawless rendering across all screen sizes. No configuration needed—just works on every device.">
  <Callout intent="tip" size="md">
    Auto-magic handling of viewport changes, orientation shifts, and touch events!
  </Callout>

  <Demo.Section
    title="Default Portal Teleportation (API-driven)"
    description="Escape your component hierarchy and render content anywhere in the DOM. This example teleports content to document.body, creating fixed overlays that break free from z-index stacking contexts. Perfect for modals, tooltips, and floating UI elements that need guaranteed top-level rendering."
    variants={[
      { name: "size", value: "xs" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}
    class="flex items-center gap-3">
    <Callout class="border-none dark:bg-zinc-900 dark:text-slate-400" icon={CircleFadingPlus}>
      Portal Instances:
      <Badge size="sm" intent="outline" class="text-lime-500">{portalManager.portals.size}</Badge>
    </Callout>
    <Button effect="press" intent="action" onclick={() => renderPortal()}>
      Render Portal
      <Badge class="bg-black/60 text-green-400">API-driven</Badge>
    </Button>
    {#if portalManager.portals.size > 0}
      <Button effect="press" intent="destructive" onclick={() => unmountPortal()}>
        Unmount All ({portalManager.portals.size}) Portals
        <Badge class="bg-black/60 text-green-400">API-driven</Badge>
      </Button>
    {/if}
  </Demo.Section>

  <Demo.Section
    title="Declarative Portal"
    description="Escape your component hierarchy and render content anywhere in the DOM. This example teleports content to document.body, creating fixed overlays that break free from z-index stacking contexts. Perfect for modals, tooltips, and floating UI elements that need guaranteed top-level rendering."
    variants={[
      { name: "size", value: "xs" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}>
    <Button effect="press" intent="action" onclick={() => (showDefaultPortal = !showDefaultPortal)}>
      Toggle Default Portal
      <Badge class="bg-black/60 text-green-400">Declarative</Badge>
    </Button>
    {#if showDefaultPortal}
      <Portal>
        {#snippet children()}
          <div
            class="fixed top-5 right-5 z-[9999] rounded-lg bg-green-500 p-5 text-white shadow-lg">
            <p>✨ I'm portaled to document.body!</p>
            <p class="text-xs opacity-90">Check the DOM inspector</p>
          </div>
        {/snippet}
      </Portal>
    {/if}
  </Demo.Section>
  <Demo.Section
    title="Element Reference Targeting"
    description="Leverage Svelte's bind:this directive for type-safe, direct element targeting. This approach eliminates selector fragility and provides compile-time safety when portaling to dynamic or programmatically created elements. Ideal for advanced UI patterns where target elements are conditionally rendered or generated at runtime.">
    <Button
      effect="press"
      intent="action"
      onclick={() => (showDisabledPortal = !showDisabledPortal)}>
      Toggle Element Portal
      <Badge class="bg-black/60 text-green-400">Declarative</Badge>
    </Button>
    <div
      bind:this={customTargetRef}
      class="mt-2.5 min-h-[100px] rounded border-2 border-dashed border-orange-500 p-5">
      <p class="text-gray-500 italic">Element Reference Target</p>
    </div>
    {#if showDisabledPortal && customTargetRef}
      <Portal target={customTargetRef}>
        {#snippet children()}
          <div class="mt-2.5 rounded bg-orange-500 p-4 text-white">
            <p>🔗 I'm portaled using an element reference!</p>
          </div>
        {/snippet}
      </Portal>
    {/if}
  </Demo.Section>
  <Demo.Section
    title="Multiple Portals Composition"
    description="Compose multiple portal instances targeting the same destination for powerful content aggregation patterns. Each portal maintains its own lifecycle and props while rendering to a shared container, enabling modular UI composition from disparate component trees. Watch as three independent portals seamlessly render into a single target element.">
    <Button
      effect="press"
      intent="action"
      onclick={() => (showMultiplePortals = !showMultiplePortals)}>
      Toggle Multiple Portals
      <Badge class="bg-black/60 text-green-400">Declarative</Badge>
    </Button>
    <div
      id="multi-portal-target"
      class="mt-2.5 min-h-[150px] rounded border-2 border-dashed border-red-500 p-5">
      <p class="text-gray-500 italic">Multiple Portal Target</p>
    </div>
    {#if showMultiplePortals}
      <Portal target="#multi-portal-target">
        {#snippet children()}
          <div class="mt-2.5 rounded bg-red-500 p-4 text-white">
            <p>🔴 Portal #1</p>
          </div>
        {/snippet}
      </Portal>
      <Portal target="#multi-portal-target">
        {#snippet children()}
          <div class="mt-2.5 rounded bg-pink-500 p-4 text-white">
            <p>🟣 Portal #2</p>
          </div>
        {/snippet}
      </Portal>
      <Portal target="#multi-portal-target">
        {#snippet children()}
          <div class="mt-2.5 rounded bg-purple-600 p-4 text-white">
            <p>🟣 Portal #3</p>
          </div>
        {/snippet}
      </Portal>
    {/if}
  </Demo.Section>
</Demo.Root>
