<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { ContextMenu } from './index.js';
</script>

<Demo.Root title="Context Menu" description="A context menu component triggered by right-click.">
	<Demo.Section title="Default" description="Right-click the box to open context menu.">
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
			>
				Right click here
			</ContextMenu.Trigger>
			<ContextMenu.Content class="w-64">
				<ContextMenu.Item>
					Back
					<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Forward
					<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Reload
					<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.CheckboxItem checked>Show Bookmarks Bar</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
				<ContextMenu.Separator />
				<ContextMenu.Group>
					<ContextMenu.GroupHeading>More Tools</ContextMenu.GroupHeading>
					<ContextMenu.Item>Save Page As...</ContextMenu.Item>
					<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
	</Demo.Section>
</Demo.Root>
