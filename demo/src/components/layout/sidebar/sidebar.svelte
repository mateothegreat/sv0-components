<script lang="ts" module>
</script>

<script lang="ts">
  import { Sidebar } from "@sv0/components/layout/sidebar";
  import type { ComponentProps } from "svelte";
  import SubscribeOptIn from "../subscribe/subscribe-opt-in.svelte";
  import Main from "./nav/main.svelte";
  import Projects from "./nav/projects.svelte";
  import System from "./nav/system.svelte";

  const sidebar = Sidebar.useSidebar();

  let {
    ref = $bindable(null),
    collapsible = "icon",
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} variant="" {...restProps} class="relative">
  <Sidebar.Content>
    <Projects />
    <Main />
    <System class="mt-auto" />
  </Sidebar.Content>
  <Sidebar.Footer>
    {#if sidebar.open}
      <SubscribeOptIn class="mx-1" />
    {/if}
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
