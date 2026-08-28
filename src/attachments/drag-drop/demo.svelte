<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { droppable } from "./droppable.svelte";
  import { sortable } from "./sortable.svelte";
  import type { DropPosition } from "./sortable.svelte";

  const columns = ["todo", "progress", "done"];

  interface Task {
    id: string;
    title: string;
    column: string;
  }

  let tasks = $state<Task[]>([
    { id: "1", title: "Task 1", column: "todo" },
    { id: "2", title: "Task 2", column: "todo" },
    { id: "3", title: "Task 3", column: "progress" },
    { id: "4", title: "Task 4", column: "todo" },
    { id: "5", title: "Task 5", column: "done" }
  ]);

  function move(id: string, to: string) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.column = to;
    }
  }

  function reorder(draggedTask: Task, position: DropPosition, targetTask: Task) {
    // Find indices
    const draggedIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    const targetIndex = tasks.findIndex((t) => t.id === targetTask.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove dragged task
    const [removed] = tasks.splice(draggedIndex, 1);

    // Update column if needed
    removed.column = targetTask.column;

    // Calculate new index based on position
    let newIndex = targetIndex;
    if (draggedIndex < targetIndex) {
      // Moving forward, adjust for removed element
      newIndex = position === "before" ? targetIndex - 1 : targetIndex;
    } else {
      // Moving backward
      newIndex = position === "before" ? targetIndex : targetIndex + 1;
    }

    // Insert at new position
    tasks.splice(newIndex, 0, removed);
  }
</script>

<Demo.Root
  title="Drag & Drop with Sorting"
  description="Simple and idiomatic drag & drop utility with support for reordering."
  labels={[
    {
      label: "utility",
      class: "border-zinc-700 text-slate-400 border-[1.5px]"
    }
  ]}>
  <div data-board class="grid grid-cols-3 gap-4">
    {#each columns as column}
      <div
        {@attach droppable<Task>({
          handlers: {
            drop: (data, e) => {
              move(data.id, column);
            }
          }
        })}
        class="min-h-[350px] space-y-5 rounded-lg border-4 border-slate-700/50 p-4 data-[over=true]:border-orange-600">
        <div class="text-3xl font-bold tracking-tight text-slate-500">{column}</div>
        <div class="flex flex-col gap-2">
          {#each tasks.filter((t) => t.column === column) as task (task.id)}
            <div
              {@attach sortable<Task>({
                data: task,
                handlers: {
                  drop: (draggedTask, position, targetTask) => {
                    reorder(draggedTask, position, targetTask);
                  }
                }
              })}
              class="relative cursor-move rounded border-[3.5px] border-dashed border-sky-700 p-2.5 font-bold select-none data-[dragging=true]:border-orange-600 data-[dragging=true]:opacity-50 data-[over=true]:border-purple-600 data-[position=before]:before:absolute data-[position=before]:before:top-0 data-[position=before]:before:left-0 data-[position=before]:before:right-0 data-[position=before]:before:h-1 data-[position=before]:before:bg-green-500 data-[position=before]:before:-translate-y-1 data-[position=after]:after:absolute data-[position=after]:after:bottom-0 data-[position=after]:after:left-0 data-[position=after]:after:right-0 data-[position=after]:after:h-1 data-[position=after]:after:bg-green-500 data-[position=after]:after:translate-y-1">
              {task.title}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Demo.Root>

<!-- <style>
  [data-task][data-dragging="true"] {
    background-color: rgb(12 133 194) !important;
  }
</style> -->
