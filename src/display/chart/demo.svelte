<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Chart, type ChartConfig } from './index.js';

	const chartConfig: ChartConfig = {
		desktop: {
			label: 'Desktop',
			color: 'hsl(var(--chart-1))'
		},
		mobile: {
			label: 'Mobile',
			color: 'hsl(var(--chart-2))'
		}
	};

	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 }
	];
</script>

<Demo.Root title="Chart" description="Chart components for data visualization.">
	<Demo.Section title="Chart Container" description="A container for chart components.">
		<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
			<div class="flex h-full w-full items-center justify-center">
				<p class="text-muted-foreground">Chart visualization area</p>
			</div>
		</Chart.Container>
	</Demo.Section>

	<Demo.Section title="With Data" description="Chart displaying sample data.">
		<div class="space-y-2">
			<p class="text-sm text-muted-foreground">Sample data:</p>
			{#each chartData as data}
				<div class="flex gap-4 text-sm">
					<span class="w-24">{data.month}</span>
					<span class="text-muted-foreground">Desktop: {data.desktop}</span>
					<span class="text-muted-foreground">Mobile: {data.mobile}</span>
				</div>
			{/each}
		</div>
	</Demo.Section>
</Demo.Root>
