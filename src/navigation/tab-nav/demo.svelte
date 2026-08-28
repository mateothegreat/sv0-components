<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { TabNav } from "@sv0/components/navigation/tab-nav";
  import { cycle } from "@sv0/components/utils/collections";
  import { onDestroy, onMount } from "svelte";

  type TabValue = {
    id: string;
    label: string;
  };

  const tabs: TabValue[] = $state([
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ]);

  let selected: TabValue | undefined = $state(tabs[1]);
  let cycler: ReturnType<typeof cycle<TabValue>> | undefined;

  onMount(() => {
    cycler = cycle(tabs, (value) => (selected = value));
    // cycler.start(2);
  });

  onDestroy(() => {
    cycler?.stop();
  });
</script>

<div>
  selected: {JSON.stringify(selected)}
</div>

<Demo.Section title="Tab Nav" description="A tab navigation component.">
  <!-- bind:selected works directly with the component -->
  <TabNav.Root bind:selected onclick={() => cycler?.stop()}>
    {#each tabs as tab}
      <TabNav.Tab value={tab}>{tab.label}</TabNav.Tab>
    {/each}
  </TabNav.Root>
</Demo.Section>
