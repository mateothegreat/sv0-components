<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ToolbarDropdownProps } from "./types";

  let {
    label = "Filters",
    icon,
    items = [],
    open = $bindable(false),
    onToggle,
    class: className,
    ...restProps
  }: ToolbarDropdownProps = $props();

  function toggleDropdown() {
    open = !open;
    if (onToggle) {
      onToggle(open);
    }
  }

  function handleItemClick(item: (typeof items)[0]) {
    if (item.onclick) {
      item.onclick();
    }
    open = false;
  }
</script>

<div class={cn("relative", className)} {...restProps}>
  <button
    onclick={toggleDropdown}
    class="flex h-9 items-center gap-2 rounded-lg bg-zinc-200 px-3 text-sm text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700">
    {#if icon}
      {@render icon()}
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    {/if}
    <span>{label}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={cn("h-4 w-4 text-zinc-500 transition-transform", open && "rotate-180")}>
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  </button>

  {#if open}
    <div
      class="absolute top-full z-10 mt-1 w-56 rounded-lg border border-zinc-200 bg-white py-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {#each items as item}
        <button
          onclick={() => handleItemClick(item)}
          class="w-full cursor-pointer px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <span class="text-sm">{item.label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
