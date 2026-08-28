<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    isActive,
    isGroupActive,
    routes,
    type RouteGroup
  } from "$components/routes/routes.svelte";
  import { ChevronRightIcon } from "@lucide/svelte";
  import { Collapsible } from "@sv0/components/display/collapsible";
  import { Sidebar } from "@sv0/components/layout/sidebar";

  /**
   * Toggles the active state of a group.
   *
   * @param group - The route group to toggle.
   */
  const toggleGroup = (group: any) => {
    group.active = !group.active;
  };

  const isSelected = (group: RouteGroup) => {
    if ($page.url.pathname === `/components/${group.path}`) {
      return true;
    }
    return isGroupActive(
      $page.url.pathname,
      group.components.map((component) => ({
        url: `/components/${group.path}/${component.path}`
      }))
    );
  };
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Components</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each routes as group}
      <Collapsible.Root
        open={isSelected(group)}
        onclick={() => {
          goto(`/components/${group.path}`);
          group.active = !group.active;
        }}>
        {#snippet child({ props }: { props: any })}
          <Sidebar.MenuItem {...props}>
            <Sidebar.MenuButton onclick={() => toggleGroup(group)} tooltipContent={group.label}>
              {#snippet child({ props }: { props: any })}
                <button {...props}>
                  <group.icon />
                  <span>{group.label}</span>
                </button>
              {/snippet}
            </Sidebar.MenuButton>
            {#if group.components?.length}
              <Collapsible.Trigger>
                {#snippet child({ props }: { props: any })}
                  <Sidebar.MenuAction
                    {...props}
                    class=" justify-between data-[state=open]:rotate-90">
                    <ChevronRightIcon />
                    <span class="sr-only">Toggle</span>
                  </Sidebar.MenuAction>
                {/snippet}
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Sidebar.MenuSub>
                  <Sidebar.Separator />
                  {#each group.components as component}
                    {#if component.type === "separator"}
                      <Sidebar.Separator />
                    {:else}
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton
                          href={`/components/${group.path}/${component.path}`}
                          class={isActive(
                            $page.url.pathname,
                            `/components/${group.path}/${component.path}`
                          )
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : ""}>
                          <span>{component.label}</span>
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    {/if}
                  {/each}
                  <Sidebar.Separator />
                </Sidebar.MenuSub>
              </Collapsible.Content>
            {/if}
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
