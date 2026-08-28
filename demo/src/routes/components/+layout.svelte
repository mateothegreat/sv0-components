<!--
@file

  # Components Layout

  This component provides the overall structure for the component browsing pages.

  ## Core Concepts

  1. **Left Sidebar:** Sidebar for filtering and searching components.
  2. **Right Main Content:** Main content area for displaying components.
-->

<script lang="ts">
  import { page } from "$app/state";
  import Breadcrumbs from "$components/layout/breadcrumbs/breadcrumbs.svelte";
  import { Separator } from "@sv0/components/display/separator";
  import { Sidebar } from "@sv0/components/layout/sidebar";
  import AppSidebar from "../../components/layout/sidebar/sidebar.svelte";

  let { children } = $props();
</script>

<div class="h-full bg-red-500">
  <Sidebar.Provider class="h-full">
    <AppSidebar />
    <Sidebar.Inset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <Sidebar.Trigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumbs path={page.url.pathname} />
        </div>
      </header>
      <main id="main-content" class="mx-4 flex-1">
        {@render children?.()}
      </main>
    </Sidebar.Inset>
  </Sidebar.Provider>
</div>
