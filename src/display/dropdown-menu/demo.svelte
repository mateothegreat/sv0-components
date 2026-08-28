<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { DropdownMenu } from './index.js';
</script>

<Demo.Root title="Dropdown Menu" description="A dropdown menu component.">
	<Demo.Section title="Default" description="A dropdown menu with items and separators.">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="rounded-md border px-4 py-2 text-sm">
				Open Menu
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					Profile
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Settings
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Log out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Demo.Section>
</Demo.Root>
