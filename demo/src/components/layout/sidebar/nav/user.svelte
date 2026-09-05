<script lang="ts">
  import BadgeCheckIcon from "~icons/lucide/badge-check";
  import BellIcon from "~icons/lucide/bell";
  import ChevronsUpDownIcon from "~icons/lucide/chevrons-up-down";
  import CreditCardIcon from "~icons/lucide/credit-card";
  import LogOutIcon from "~icons/lucide/log-out";
  import SparklesIcon from "~icons/lucide/sparkles";
  import { Avatar } from "@sv0/components/display/avatar";
  import { DropdownMenu } from "@sv0/components/display/dropdown-menu";
  import { Sidebar } from "@sv0/components/layout/sidebar";

  const user: { name: string; email: string; avatar: string } = {
    name: "sv0",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  };
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-trigger"
            {...props}>
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}>
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <SparklesIcon />
            Upgrade to Pro
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <BadgeCheckIcon />
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCardIcon />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <BellIcon />
            Notifications
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <LogOutIcon />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
