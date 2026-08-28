<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Breadcrumbs } from './index.js';
</script>

<Demo.Root title="Breadcrumbs" description="A breadcrumb navigation component.">
	<Demo.Section title="Default" description="Default breadcrumb navigation.">
		<Breadcrumbs.Root>
			<Breadcrumbs.List>
				<Breadcrumbs.Item>
					<Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
				</Breadcrumbs.Item>
				<Breadcrumbs.Separator />
				<Breadcrumbs.Item>
					<Breadcrumbs.Link href="/components">Components</Breadcrumbs.Link>
				</Breadcrumbs.Item>
				<Breadcrumbs.Separator />
				<Breadcrumbs.Item>
					<Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
				</Breadcrumbs.Item>
			</Breadcrumbs.List>
		</Breadcrumbs.Root>
	</Demo.Section>

	<Demo.Section
		title="With Ellipsis"
		description="Breadcrumbs with collapsed items using ellipsis."
	>
		<Breadcrumbs.Root>
			<Breadcrumbs.List>
				<Breadcrumbs.Item>
					<Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
				</Breadcrumbs.Item>
				<Breadcrumbs.Separator />
				<Breadcrumbs.Item>
					<Breadcrumbs.Ellipsis />
				</Breadcrumbs.Item>
				<Breadcrumbs.Separator />
				<Breadcrumbs.Item>
					<Breadcrumbs.Link href="/components">Components</Breadcrumbs.Link>
				</Breadcrumbs.Item>
				<Breadcrumbs.Separator />
				<Breadcrumbs.Item>
					<Breadcrumbs.Page>Breadcrumbs</Breadcrumbs.Page>
				</Breadcrumbs.Item>
			</Breadcrumbs.List>
		</Breadcrumbs.Root>
	</Demo.Section>
</Demo.Root>
