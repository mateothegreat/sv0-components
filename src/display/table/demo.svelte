<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import { Table } from './index.js';

	const invoices = [
		{ invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
		{ invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
		{ invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' }
	];
</script>

<Demo.Root title="Table" description="A table component for displaying data.">
	<Demo.Section title="Default" description="A simple table with data.">
		<Table.Root>
			<Table.Caption>A list of your recent invoices.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Invoice</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Method</Table.Head>
					<Table.Head class="text-right">Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each invoices as invoice}
					<Table.Row>
						<Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
						<Table.Cell>{invoice.status}</Table.Cell>
						<Table.Cell>{invoice.method}</Table.Cell>
						<Table.Cell class="text-right">{invoice.amount}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Demo.Section>
</Demo.Root>
