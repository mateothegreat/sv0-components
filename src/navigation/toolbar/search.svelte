<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ToolbarSearchProps } from "./types";

  let {
    placeholder = "Search...",
    value = $bindable(""),
    variant = "full",
    showCloseButton = true,
    onInput,
    onClose,
    class: className,
    ...restProps
  }: ToolbarSearchProps = $props();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    if (onInput) {
      onInput(target.value);
    }
  }

  function handleClose() {
    value = "";
    if (onClose) {
      onClose();
    }
  }
</script>

{#if variant === "full"}
  <!-- Full width variant (toolbar-2.html style) -->
  <div class={cn("relative flex-1", className)} {...restProps}>
    <input
      {placeholder}
      bind:value
      oninput={handleInput}
      class="h-9 w-full rounded-lg bg-zinc-100 pr-4 pl-9 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-hidden dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400"
      type="text" />
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
      class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  </div>
{:else}
  <!-- Compact expandable variant (toolbar-1.html style) -->
  <div class={cn("relative flex items-center", className)} {...restProps}>
    <div
      class="flex h-10 items-center gap-2 overflow-hidden rounded-xl bg-zinc-100 px-3 dark:bg-zinc-800"
      style="width: auto; opacity: 1">
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
        class="h-4 w-4 text-[#0C8CE9] dark:text-blue-400">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <div class="relative flex items-center" style="opacity: 1; transform: none">
        <input
          {placeholder}
          bind:value
          oninput={handleInput}
          class="h-7 w-[200px] border-none bg-transparent px-0 text-sm text-zinc-900 outline-hidden placeholder:text-zinc-500 focus:outline-hidden dark:text-zinc-100 dark:placeholder:text-zinc-400"
          type="search" />
      </div>
      {#if showCloseButton && value}
        <button
          type="button"
          onclick={handleClose}
          class="text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
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
            <path d="M9 14 4 9l5-5"></path>
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"></path>
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}
