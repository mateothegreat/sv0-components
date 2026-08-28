<!--
@file

  Component group overview page.

  This component serves as the overview page for component groups, displaying all components
  available within a specific group. It provides navigation links to individual component demos
  and serves as the landing page for group URLs like `/components/content`.
-->

<script lang="ts">
  let { data } = $props();

  const group = $derived(data?.group);
  const components = $derived(group?.components || []);
</script>

<svelte:head>
  <title>{group?.label} Components | @sv0/components</title>
  <meta
    name="description"
    content="Explore {group?.label} components in the @sv0/components library. Browse and test {components.length} components including {components
      .slice(0, 3)
      .map((c) => c.label)
      .join(', ')}." />
</svelte:head>

<div class="p-6">
  <div class="mb-8">
    <h1 class="mb-4 text-3xl font-bold">{group?.label} Components</h1>
    <p class="text-lg text-gray-600">
      Browse and test {components.length} components in the {group?.label} category.
    </p>
  </div>

  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each components as component}
      {#if component.type === "separator"}
        <div class="col-span-full">
          <hr class="my-6 border-gray-200" />
        </div>
      {:else if component.path && component.label}
        <a
          href="/components/{group?.path}/{component.path}"
          class="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50">
          <h3 class="mb-2 text-lg font-semibold">{component.label}</h3>
          <p class="text-sm text-gray-600">
            View the {component.label} component demo and documentation.
          </p>
        </a>
      {/if}
    {/each}
  </div>

  {#if components.length === 0}
    <div class="py-12 text-center">
      <h2 class="mb-4 text-xl font-semibold">No Components Available</h2>
      <p class="text-gray-600">This group doesn't have any components available yet.</p>
    </div>
  {/if}
</div>
