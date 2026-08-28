<script lang="ts">
  import { popover } from "@sv0/components/attachments/popover/popover.svelte";
  import type { NavigationItem } from "@sv0/components/navigation/menus/menu/types";
  import MenuDropdown from "./menu-dropdown.svelte";

  interface Props {
    item: NavigationItem;
  }

  let { item }: Props = $props();

  let trigger: HTMLElement;
  let content: HTMLElement;
  let isOpen = $state(false);

  $effect(() => {
    if (trigger && content && isOpen) {
      return popover(content, {
        reference: trigger,
        side: "bottom",
        align: "center"
      }).destroy;
    }
  });
</script>

<li data-slot="navigation-menu-item" class="relative">
  {#if item.dropdown}
    <button
      data-state={isOpen ? "open" : "closed"}
      aria-expanded={isOpen}
      data-slot="navigation-menu-trigger"
      class="
				group
				bg-background hover:bg-accent hover:text-accent-foreground
				focus:bg-accent focus:text-accent-foreground
				data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent
				data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent focus-visible:ring-ring/50
				inline-flex
				h-9
				w-max items-center
				justify-center rounded-md
				px-4 py-2 text-xs font-medium
				transition-[color,box-shadow] outline-none focus-visible:ring-[3px]
				focus-visible:outline-1
				disabled:pointer-events-none
				disabled:opacity-50 xl:text-sm
			"
      bind:this={trigger}
      onclick={() => (isOpen = !isOpen)}>
      {item.label}
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
        class="
					lucide lucide-chevron-down
					relative top-[1px]
					ml-1 size-3
					transition duration-300
					group-data-[state=open]:rotate-180
				"
        aria-hidden="true">
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
    {#if isOpen}
      <div bind:this={content} class="popover">
        <MenuDropdown content={item.dropdown} />
      </div>
    {/if}
  {:else if item.href}
    <a
      href={item.href}
      class="
				group
				bg-background hover:bg-accent hover:text-accent-foreground
				focus:bg-accent focus:text-accent-foreground
				focus-visible:ring-ring/50 inline-flex
				h-9 w-max items-center
				justify-center
				rounded-md
				px-4 py-2
				text-xs font-medium
				transition-[color,box-shadow] outline-none focus-visible:ring-[3px]
				focus-visible:outline-1
				xl:text-sm
			">
      {item.label}
    </a>
  {/if}
</li>

<style>
  .popover {
    background: white;
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }
</style>
