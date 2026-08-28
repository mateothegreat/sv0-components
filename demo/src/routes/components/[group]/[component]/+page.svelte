<!--
  @file 
  Individual component demo page for displaying individual component demos.
  It receives route data from the load function and renders the appropriate 
  demo component based on the group and component parameters from the URL.
-->

<script lang="ts">
  let { data } = $props();
  const group = $derived(data.group);
  const component = $derived(data.component);
</script>

<svelte:head>
  <title>{component?.label || "Component"} | @sv0/components</title>
  <meta
    name="description"
    content="@sv0/components
      {component?.label || 'Component'} demo from the {group?.label || 'Components'} collection." />
</svelte:head>

{#if component.component}
  <component.component />
{:else}
  <div class="p-6 text-center">
    <h1 class="mb-4 text-2xl font-bold">Component Not Found</h1>
    <p class="text-gray-600">The requested component demo could not be loaded.</p>
    <p class="mt-2 text-sm text-gray-500">Group: {group?.path}</p>
    <p class="text-sm text-gray-500">Component: {component?.path}</p>
    <p class="text-sm text-gray-500">Label: {component?.label}</p>
  </div>
{/if}
