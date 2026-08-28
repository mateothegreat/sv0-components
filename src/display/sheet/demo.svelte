<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Sheet } from './index.js';
</script>

<Demo.Root title="Sheet" description="A sheet component that slides in from the side.">
	<Demo.Section title="Default" description="A sheet that slides in from the right.">
		<Sheet.Root>
			<Sheet.Trigger class="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
				Open Sheet
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.Overlay />
				<Sheet.Content>
					<Sheet.Header>
						<Sheet.Title>Sheet Title</Sheet.Title>
						<Sheet.Description>Sheet description goes here.</Sheet.Description>
					</Sheet.Header>
					<div class="py-4">
						<p class="text-sm">Sheet content goes here.</p>
					</div>
					<Sheet.Footer>
						<Sheet.Close class="rounded-md border px-4 py-2 text-sm">Close</Sheet.Close>
					</Sheet.Footer>
				</Sheet.Content>
			</Sheet.Portal>
		</Sheet.Root>
	</Demo.Section>
</Demo.Root>
