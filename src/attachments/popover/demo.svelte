<script lang="ts">
  import { popover } from "./popover.svelte.js";

  let triggerElement: HTMLElement;
  let popoverElement: HTMLElement;
  let arrowElement: HTMLElement;
  let isOpen = $state(false);

  // Individual option states
  let side = $state<"top" | "right" | "bottom" | "left">("bottom");
  let align = $state<"start" | "center" | "end">("center");
  let offset = $state(8);
  let padding = $state(8);
  let showArrow = $state(true);
  let autoFlip = $state(true);
  let autoShift = $state(true);

  // Debug effect to log current state
  $effect(() => {
    console.log("Options changed:", {
      side,
      align,
      offset,
      padding,
      showArrow,
      autoFlip,
      autoShift,
      isOpen
    });
  });

  // Reactive positioning effect - recreates attachment when any dependency changes
  $effect(() => {
    if (triggerElement && popoverElement && isOpen) {
      const attachment = popover(popoverElement, {
        reference: triggerElement,
        side,
        align,
        offset,
        padding,
        arrow: showArrow ? arrowElement : undefined,
        autoFlip,
        autoShift
      });

      return attachment.destroy;
    }
  });

  const togglePopover = () => {
    isOpen = !isOpen;
  };

  const closePopover = () => {
    isOpen = false;
  };

  // Close on escape key
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      closePopover();
    }
  };

  // Close on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      isOpen &&
      popoverElement &&
      !popoverElement.contains(event.target as Node) &&
      !triggerElement?.contains(event.target as Node)
    ) {
      closePopover();
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleOutsideClick} />

<div class="space-y-8 p-8">
  <h2 class="text-2xl font-bold">Popover Attachment Demo</h2>

  <!-- Controls -->
  <div class="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-4">
    <div>
      <label class="mb-1 block text-sm font-medium">Side</label>
      <select bind:value={side} class="w-full rounded border p-2">
        <option value="top">Top</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Align</label>
      <select bind:value={align} class="w-full rounded border p-2">
        <option value="start">Start</option>
        <option value="center">Center</option>
        <option value="end">End</option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Offset</label>
      <input type="range" min="0" max="32" bind:value={offset} class="w-full" />
      <span class="text-xs text-gray-600">{offset}px</span>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Padding</label>
      <input type="range" min="0" max="32" bind:value={padding} class="w-full" />
      <span class="text-xs text-gray-600">{padding}px</span>
    </div>

    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={showArrow} />
      <span class="text-sm">Show Arrow</span>
    </label>

    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={autoFlip} />
      <span class="text-sm">Auto Flip</span>
    </label>

    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={autoShift} />
      <span class="text-sm">Auto Shift</span>
    </label>
  </div>

  <!-- State -->
  <div class="space-y-4">
    <h3 class="text-xl font-semibold">State</h3>
    <pre class="overflow-x-auto text-sm"><code
        >{JSON.stringify(
          { side, align, offset, padding, showArrow, autoFlip, autoShift },
          null,
          2
        )}</code></pre>
    {#if popoverElement}
      <p class="text-sm text-gray-600">
        Current placement: <code>{popoverElement.getAttribute("data-placement") || "none"}</code>
      </p>
      <p class="text-sm text-gray-600">
        Position: <code>left: {popoverElement.style.left}, top: {popoverElement.style.top}</code>
      </p>
    {/if}
  </div>

  <!-- Demo Area -->
  <div
    class="relative flex min-h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8">
    <button
      bind:this={triggerElement}
      onclick={togglePopover}
      class="
        rounded-lg bg-blue-500 px-6 py-3
        font-medium text-white shadow-lg transition-colors hover:bg-blue-600
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none
      "
      aria-haspopup="dialog"
      aria-expanded={isOpen}>
      {isOpen ? "Close" : "Open"} Popover
    </button>

    {#if isOpen}
      <div
        bind:this={popoverElement}
        class="
          z-50 max-w-sm rounded-lg border border-gray-200
          bg-white p-6 shadow-xl
          dark:border-gray-700 dark:bg-gray-800
        "
        role="dialog"
        aria-modal="true">
        <div
          bind:this={arrowElement}
          class="
            absolute h-2 w-2 rotate-45 border border-gray-200 bg-white data-[placement^='bottom']:border-r-0
            data-[placement^='bottom']:border-b-0 data-[placement^='left']:border-b-0 data-[placement^='left']:border-l-0
            data-[placement^='right']:border-t-0 data-[placement^='right']:border-r-0
            data-[placement^='top']:border-t-0 data-[placement^='top']:border-l-0
            dark:border-gray-700 dark:bg-gray-800
          "
          class:hidden={!showArrow}>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Popover Content</h3>
          <p class="text-gray-600 dark:text-gray-300">
            This popover is positioned using the popover attachment utility. It automatically
            handles positioning, collision detection, and viewport boundaries.
          </p>
          <div class="flex space-x-2">
            <button
              onclick={closePopover}
              class="rounded bg-gray-100 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-200">
              Close
            </button>
            <button
              class="rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
              Action
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
