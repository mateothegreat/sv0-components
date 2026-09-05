<script lang="ts">
  import Sparkles from "~icons/lucide/sparkles";
  import { Demo } from "@sv0/components/demos";
  import { Toolbar } from "./index.js";

  // Demo state
  let searchValue = $state("");
  let isFiltersOpen = $state(false);

  // Demo data
  const filterItems = [
    { label: "All Items", value: "all", onclick: () => console.log("All Items") },
    { label: "Recent", value: "recent", onclick: () => console.log("Recent") },
    { label: "Popular", value: "popular", onclick: () => console.log("Popular") }
  ];
</script>

<Demo.Root title="Toolbar" description="A toolbar component.">
  <Demo.Section title="Default" description="A default toolbar component." class="w-fit">
    <Toolbar.Root theme="dark" size="sm">
      <!-- Theme toggle button -->
      <Toolbar.Button onclick={() => console.log("asdf")} tooltip="Theme toggle">
        {#snippet icon()}
          <Sparkles class="h-4.5 w-4.5" />
        {/snippet}
      </Toolbar.Button>

      <Toolbar.Separator />

      <!-- Plus button -->
      <Toolbar.Button>
        {#snippet icon()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        {/snippet}
      </Toolbar.Button>

      <!-- Sparkles button -->
      <Toolbar.Button>
        {#snippet icon()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4">
            <path
              d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
            ></path>
            <path d="M20 3v4"></path>
            <path d="M22 5h-4"></path>
            <path d="M4 17v2"></path>
            <path d="M5 18H3"></path>
          </svg>
        {/snippet}
      </Toolbar.Button>

      <!-- Compact search -->
      <!-- <Toolbar.Search variant="compact" placeholder="Try to close me" bind:value={searchValue} /> -->

      <!-- Click button -->
      <Toolbar.Button text="Click!">
        {#snippet icon()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4">
            <path d="M14 4.1 12 6"></path>
            <path d="m5.1 8-2.9-.8"></path>
            <path d="m6 12-1.9 2"></path>
            <path d="M7.2 2.2 8 5.1"></path>
            <path
              d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
            ></path>
          </svg>
        {/snippet}
      </Toolbar.Button>

      <Toolbar.Separator />

      <!-- Avatar -->
      <Toolbar.Avatar alt="User" />
    </Toolbar.Root>
  </Demo.Section>
  <Demo.Section title="Full" description="A full width toolbar component." class="p-3">
    <Toolbar.Root variant="full">
      <!-- Full width search -->
      <Toolbar.Search variant="full" placeholder="Search..." bind:value={searchValue} />

      <!-- Filters dropdown -->
      <Toolbar.Dropdown label="Filters" items={filterItems} bind:open={isFiltersOpen} />

      <!-- Action buttons group -->
      <div class="flex items-center gap-1">
        <!-- Settings button -->
        <Toolbar.Button size="md">
          {#snippet icon()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-zinc-500">
              <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          {/snippet}
        </Toolbar.Button>

        <!-- Download button -->
        <Toolbar.Button size="md">
          {#snippet icon()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-zinc-500">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
          {/snippet}
        </Toolbar.Button>

        <!-- Share button -->
        <Toolbar.Button size="md">
          {#snippet icon()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-zinc-500">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
            </svg>
          {/snippet}
        </Toolbar.Button>
      </div>

      <!-- Create button -->
      <Toolbar.Button variant="primary">
        {#snippet icon()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 text-white">
            <path
              d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
            ></path>
            <path d="M20 3v4"></path>
            <path d="M22 5h-4"></path>
            <path d="M4 17v2"></path>
            <path d="M5 18H3"></path>
          </svg>
        {/snippet}
        <span class="text-sm text-white">Create</span>
      </Toolbar.Button>
    </Toolbar.Root>
  </Demo.Section>
</Demo.Root>
