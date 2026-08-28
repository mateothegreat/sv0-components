<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Icon } from './index.js';
	import { Home, Settings, User } from '@lucide/svelte';
</script>

<Demo.Root title="Icons" description="Icon components using Lucide icons.">
	<Demo.Section title="Default" description="Various icons from Lucide." class="flex gap-4">
		<Home class="h-6 w-6" />
		<Settings class="h-6 w-6" />
		<User class="h-6 w-6" />
	</Demo.Section>
</Demo.Root>
