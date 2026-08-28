# dragDrop

A simple and lightweight drag and drop utility for Svelte 5 using attachments. Provides reactive state tracking with `$state()` for drag and drop interactions.

## Features

- 🎯 Simple API with sensible defaults
- 📊 Reactive state tracking using `$state()`
- 🔧 Highly configurable with callback hooks
- 🪶 Lightweight with no dependencies
- 🎨 Framework-agnostic drag/drop logic

## Usage

### Basic Draggable Item

```svelte
<script lang="ts">
  import { dragDrop } from "@sv0/components/attachments/drag-drop";

  let draggedItem = $state<string | null>(null);
</script>

<div
  {@attach dragDrop({
    data: "item-1",
    onDragStart: (e, state) => {
      draggedItem = state.data as string;
    },
    onDragEnd: () => {
      draggedItem = null;
    }
  })}
  data-draggable
>
  Drag me!
</div>

{#if draggedItem}
  <p>Dragging: {draggedItem}</p>
{/if}

<style>
  [data-draggable] {
    padding: 1rem;
    background: oklch(84.1% 0.238 128.85);
    border-radius: 0.5rem;
    cursor: move;
    user-select: none;
  }

  [data-draggable]:hover {
    background: oklch(74.1% 0.238 128.85);
  }
</style>
```

### Drop Zone

```svelte
<script lang="ts">
  import { dragDrop } from "@sv0/components/attachments/drag-drop";

  let droppedItems = $state<string[]>([]);
</script>

<div
  {@attach dragDrop({
    draggable: false,
    droppable: true,
    onDrop: (e, state) => {
      droppedItems.push(state.data as string);
    }
  })}
  data-dropzone
>
  Drop items here

  {#if droppedItems.length > 0}
    <ul>
      {#each droppedItems as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  [data-dropzone] {
    min-height: 200px;
    padding: 1rem;
    border: 2px dashed oklch(37.1% 0 0);
    border-radius: 0.5rem;
  }
</style>
```

### Visual Feedback on Drag Over

```svelte
<script lang="ts">
  import { dragDrop } from "@sv0/components/attachments/drag-drop";

  let isOver = $state(false);
</script>

<div
  {@attach dragDrop({
    draggable: false,
    droppable: true,
    onDragEnter: () => {
      isOver = true;
    },
    onDragLeave: () => {
      isOver = false;
    },
    onDrop: () => {
      isOver = false;
    }
  })}
  data-dropzone
  data-active={isOver}
>
  Drop here
</div>

<style>
  [data-dropzone] {
    min-height: 200px;
    padding: 1rem;
    border: 2px dashed oklch(37.1% 0 0);
    border-radius: 0.5rem;
    transition: all 0.2s;
  }

  [data-dropzone][data-active="true"] {
    border-color: oklch(84.1% 0.238 128.85);
    background: oklch(26.9% 0 0);
  }
</style>
```

### Complete Kanban-Style Example

```svelte
<script lang="ts">
  import { dragDrop } from "@sv0/components/attachments/drag-drop";

  interface Task {
    id: string;
    title: string;
    column: string;
  }

  let tasks = $state<Task[]>([
    { id: "1", title: "Task 1", column: "todo" },
    { id: "2", title: "Task 2", column: "todo" },
    { id: "3", title: "Task 3", column: "progress" }
  ]);

  function moveTask(taskId: string, newColumn: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.column = newColumn;
    }
  }

  const columns = ["todo", "progress", "done"];
</script>

<div data-board>
  {#each columns as column}
    <div
      {@attach dragDrop({
        draggable: false,
        droppable: true,
        onDrop: (e, state) => {
          const taskId = state.data as string;
          moveTask(taskId, column);
        }
      })}
      data-column
    >
      <h3>{column}</h3>

      {#each tasks.filter((t) => t.column === column) as task}
        <div
          {@attach dragDrop({
            data: task.id,
            droppable: false
          })}
          data-task
        >
          {task.title}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  [data-board] {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  [data-column] {
    min-height: 300px;
    padding: 1rem;
    background: oklch(26.9% 0 0);
    border-radius: 0.5rem;
  }

  [data-task] {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: oklch(37.1% 0 0);
    border-radius: 0.25rem;
    cursor: move;
    user-select: none;
  }

  [data-task]:hover {
    background: oklch(47.1% 0 0);
  }
</style>
```

### Customizing Data Transfer

```svelte
<script lang="ts">
  import { dragDrop } from "@sv0/components/attachments/drag-drop";

  interface Product {
    id: number;
    name: string;
    price: number;
  }

  const product: Product = {
    id: 1,
    name: "Widget",
    price: 29.99
  };

  let dropped = $state<Product | null>(null);
</script>

<div
  {@attach dragDrop({
    data: product,
    dataFormat: "application/json"
  })}
  data-draggable
>
  {product.name} - ${product.price}
</div>

<div
  {@attach dragDrop({
    draggable: false,
    droppable: true,
    dataFormat: "application/json",
    onDrop: (e, state) => {
      dropped = state.data as Product;
    }
  })}
  data-dropzone
>
  {#if dropped}
    Received: {dropped.name} (${dropped.price})
  {:else}
    Drop product here
  {/if}
</div>
```

## API

```ts
function dragDrop(options?: DragDropOptions): Attachment;
```

## Types

```ts
interface DragDropState {
  /**
   * Whether the element is currently being dragged
   */
  isDragging: boolean;
  /**
   * Whether the element has an item being dragged over it
   */
  isDraggedOver: boolean;
  /**
   * The current data being transferred during drag
   */
  data: unknown;
}

interface DragDropCallbacks {
  /**
   * Called when drag starts
   */
  onDragStart?: (e: DragEvent, state: DragDropState) => void;
  /**
   * Called when dragging ends
   */
  onDragEnd?: (e: DragEvent, state: DragDropState) => void;
  /**
   * Called when something is dragged over the element
   */
  onDragOver?: (e: DragEvent, state: DragDropState) => void;
  /**
   * Called when dragged item enters the element
   */
  onDragEnter?: (e: DragEvent, state: DragDropState) => void;
  /**
   * Called when dragged item leaves the element
   */
  onDragLeave?: (e: DragEvent, state: DragDropState) => void;
  /**
   * Called when something is dropped on the element
   */
  onDrop?: (e: DragEvent, state: DragDropState) => void;
}

interface DragDropOptions extends DragDropCallbacks {
  /**
   * Whether the element can be dragged
   * @default true
   */
  draggable?: boolean;
  /**
   * Whether the element can receive drops
   * @default true
   */
  droppable?: boolean;
  /**
   * Data to be transferred when dragging
   * @default undefined
   */
  data?: unknown;
  /**
   * The drag effect to use
   * @default "move"
   */
  effectAllowed?: DataTransfer["effectAllowed"];
  /**
   * The drop effect to use
   * @default "move"
   */
  dropEffect?: DataTransfer["dropEffect"];
  /**
   * Data format for the transfer
   * @default "text/plain"
   */
  dataFormat?: string;
}
```

## Source

[Function](./attachment.ts)
