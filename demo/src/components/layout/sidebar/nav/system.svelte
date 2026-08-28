<script lang="ts" module>
</script>

<script lang="ts">
  import { Sidebar } from "@sv0/components/layout/sidebar";
  import type { ComponentProps } from "svelte";
  import { system } from "../store.svelte";

  let { ref = $bindable(null), ...restProps }: {} & ComponentProps<typeof Sidebar.Group> = $props();
</script>

<Sidebar.Group bind:ref {...restProps}>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each system.entries() as [key, item] (key)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="sm">
            {#snippet child({ props })}
              {#if item.path}
                <a href={item.path} {...props}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              {:else}
                <button {...props} onclick={() => item.fn?.(item)}>
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              {/if}
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
