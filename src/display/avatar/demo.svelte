<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Avatar } from './index.js';
</script>

<Demo.Root title="Avatar" description="An avatar component for displaying user profile images.">
	<Demo.Section title="Default" description="Default avatar with image.">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</Demo.Section>

	<Demo.Section title="Fallback" description="Avatar with fallback text when image fails to load.">
		<Avatar.Root>
			<Avatar.Image src="https://invalid-url.png" alt="@user" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar.Root>
	</Demo.Section>

	<Demo.Section
		title="Multiple Sizes"
		description="Avatars with different sizes."
		class="flex items-center gap-4"
	>
		<Avatar.Root class="h-8 w-8">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Small" />
			<Avatar.Fallback>SM</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Medium" />
			<Avatar.Fallback>MD</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root class="h-16 w-16">
			<Avatar.Image src="https://github.com/shadcn.png" alt="Large" />
			<Avatar.Fallback>LG</Avatar.Fallback>
		</Avatar.Root>
	</Demo.Section>
</Demo.Root>
