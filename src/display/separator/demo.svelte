<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Separator } from './index.js';
</script>

<Demo.Root title="Separator" description="A separator component for dividing content.">
	<Demo.Section title="Horizontal" description="A horizontal separator." class="space-y-4">
		<div>
			<p class="text-sm">Content above</p>
			<Separator class="my-4" />
			<p class="text-sm">Content below</p>
		</div>
	</Demo.Section>

	<Demo.Section title="Vertical" description="A vertical separator." class="flex h-20 items-center">
		<span class="text-sm">Left</span>
		<Separator orientation="vertical" class="mx-4" />
		<span class="text-sm">Right</span>
	</Demo.Section>
</Demo.Root>
