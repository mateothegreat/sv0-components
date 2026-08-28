<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Skeleton } from './index.js';
</script>

<Demo.Root title="Skeleton" description="A skeleton loader component for loading states.">
	<Demo.Section title="Default" description="Skeleton loading placeholders." class="space-y-2">
		<Skeleton class="h-12 w-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</Demo.Section>
</Demo.Root>
