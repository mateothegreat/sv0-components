<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Command } from "@sv0/components/interactives/command";
</script>

<Demo.Root title="Command" description="A command component.">
  <Demo.Section title="Default" description="A default command component." class="p-3">
    <div class="mx-auto w-100">
      <Command.Root>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Search Emoji</Command.Item>
            <Command.LinkItem href="https://www.google.com">Google</Command.LinkItem>
            <Command.Item>Calculator</Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item>Profile</Command.Item>
            <Command.Item>Billing</Command.Item>
            <Command.Item>Settings</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    </div>
  </Demo.Section>
</Demo.Root>
