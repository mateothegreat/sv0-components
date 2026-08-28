<script lang="ts">
	import { Demo } from '@sv0/components/demos';
	import {
		FlexRender,
		createSvelteTable,
		renderComponent,
		renderSnippet
	} from './index.js';
	import { createColumnHelper } from '@tanstack/table-core';

	type Person = {
		firstName: string;
		lastName: string;
		age: number;
	};

	const data: Person[] = [
		{ firstName: 'John', lastName: 'Doe', age: 30 },
		{ firstName: 'Jane', lastName: 'Smith', age: 25 },
		{ firstName: 'Bob', lastName: 'Johnson', age: 35 }
	];

	const columnHelper = createColumnHelper<Person>();

	const columns = [
		columnHelper.accessor('firstName', {
			header: 'First Name'
		}),
		columnHelper.accessor('lastName', {
			header: 'Last Name'
		}),
		columnHelper.accessor('age', {
			header: 'Age'
		})
	];

	const table = createSvelteTable({
		data,
		columns,
		getCoreRowModel: () => []
	});
</script>

<Demo.Root title="Data Table" description="A data table component built with TanStack Table.">
	<Demo.Section title="Basic Table" description="A simple data table with columns and rows.">
		<div class="rounded-md border">
			<p class="p-4 text-sm">
				Data table component with {data.length} rows and {columns.length} columns
			</p>
		</div>
	</Demo.Section>
</Demo.Root>
