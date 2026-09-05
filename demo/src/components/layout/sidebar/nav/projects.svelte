<script lang="ts">
  import LayoutDashboard from "~icons/lucide/layout-dashboard";
  import EllipsisIcon from "~icons/lucide/ellipsis";
  import FolderIcon from "~icons/lucide/folder";
  import ForwardIcon from "~icons/lucide/forward";
  import Trash2Icon from "~icons/lucide/trash-2";
  import { DropdownMenu } from "@sv0/components/display/dropdown-menu";
  import { Sidebar } from "@sv0/components/layout/sidebar";
  import { projects } from "../store.svelte";

  const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.Menu>
    <Sidebar.MenuItem>
      <Sidebar.MenuButton>
        <a href="/" class="flex w-full items-center gap-2">
          <LayoutDashboard class="size-4" />
          <span>Dashboard</span>
        </a>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>

  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each projects.entries() as [key, item] (key)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props }: { props: any })}
            {#if item.path}
              <div class="w-full">
                <a href={item.path} {...props}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </div>
            {:else}
              <button {...props} onclick={() => item.fn?.(item)}>
                <item.icon />
                <span>{item.title}</span>
              </button>
            {/if}
          {/snippet}
        </Sidebar.MenuButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuAction showOnHover {...props}>
                <EllipsisIcon />
                <span class="sr-only">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-48 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}>
            <DropdownMenu.Item>
              <FolderIcon class="text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ForwardIcon class="text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Trash2Icon class="text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
