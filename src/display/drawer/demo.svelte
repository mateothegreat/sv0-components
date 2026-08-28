<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Drawer } from './index.js';
</script>

<Demo.Root title="Drawer" description="A drawer component that slides in from the edge of the screen.">
	<Demo.Section title="Default" description="A drawer that slides in from the bottom.">
		<Drawer.Root>
			<Drawer.Trigger class="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
				Open Drawer
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay />
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Drawer Title</Drawer.Title>
						<Drawer.Description>This is a drawer description.</Drawer.Description>
					</Drawer.Header>
					<div class="p-4">
						<p class="text-sm">Drawer content goes here.</p>
					</div>
					<Drawer.Footer>
						<Drawer.Close class="rounded-md border px-4 py-2 text-sm">Close</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	</Demo.Section>
</Demo.Root>
