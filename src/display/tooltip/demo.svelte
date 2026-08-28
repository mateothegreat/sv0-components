<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Tooltip } from './index.js';
</script>

<Demo.Root title="Tooltip" description="A tooltip component for displaying additional information.">
	<Demo.Section title="Default" description="Hover over the button to see the tooltip.">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger class="rounded-md border px-4 py-2 text-sm">Hover me</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content>
						<p>Add to library</p>
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Demo.Section>
</Demo.Root>
