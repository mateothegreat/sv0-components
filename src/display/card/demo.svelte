<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Card } from './index.js';
</script>

<Demo.Root title="Card" description="A card component for displaying content.">
	<Demo.Section title="Default" description="Default card with header, content, and footer.">
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card description goes here.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>This is the main content of the card.</p>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-muted-foreground">Card footer</p>
			</Card.Footer>
		</Card.Root>
	</Demo.Section>

	<Demo.Section title="With Action" description="Card with action button in header.">
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Notifications</Card.Title>
				<Card.Description>You have 3 unread messages.</Card.Description>
				<Card.Action>
					<button class="text-sm font-medium">Mark all as read</button>
				</Card.Action>
			</Card.Header>
			<Card.Content>
				<div class="space-y-2">
					<p class="text-sm">• New message from John</p>
					<p class="text-sm">• Your report is ready</p>
					<p class="text-sm">• Meeting reminder: 3 PM</p>
				</div>
			</Card.Content>
		</Card.Root>
	</Demo.Section>
</Demo.Root>
