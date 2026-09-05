<script lang="ts">
  import AudioWaveformIcon from "~icons/lucide/audio-waveform";
  import ChevronsUpDownIcon from "~icons/lucide/chevrons-up-down";
  import CommandIcon from "~icons/lucide/command";
  import GalleryVerticalEndIcon from "~icons/lucide/gallery-vertical-end";
  import PlusIcon from "~icons/lucide/plus";
  import { DropdownMenu } from "@sv0/components/display/dropdown-menu";
  import { Sidebar } from "@sv0/components/layout/sidebar";

  const teams: { name: string; logo: any; plan: string }[] = [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEndIcon,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveformIcon,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: CommandIcon,
      plan: "Free"
    }
  ];

  let activeTeam = $state(teams[0]);
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div
              class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <activeTeam.logo class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                {activeTeam.name}
              </span>
              <span class="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}>
        <DropdownMenu.Label class="text-muted-foreground text-xs">Teams</DropdownMenu.Label>
        {#each teams as team, index (team.name)}
          <DropdownMenu.Item onSelect={() => (activeTeam = team)} class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border">
              <team.logo class="size-3.5 shrink-0" />
            </div>
            {team.name}
            <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        {/each}
        <DropdownMenu.Separator />
        <DropdownMenu.Item class="gap-2 p-2">
          <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <PlusIcon class="size-4" />
          </div>
          <div class="text-muted-foreground font-medium">Add team</div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
