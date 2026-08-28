<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Tabs } from './index.js';
</script>

<Demo.Root title="Tabs" description="A tabs component for organizing content.">
	<Demo.Section title="Default" description="Tabs with multiple sections.">
		<Tabs.Root value="account" class="w-[400px]">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
				<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account" class="space-y-2">
				<p class="text-sm">Make changes to your account here.</p>
			</Tabs.Content>
			<Tabs.Content value="password" class="space-y-2">
				<p class="text-sm">Change your password here.</p>
			</Tabs.Content>
			<Tabs.Content value="settings" class="space-y-2">
				<p class="text-sm">Manage your settings here.</p>
			</Tabs.Content>
		</Tabs.Root>
	</Demo.Section>
</Demo.Root>
