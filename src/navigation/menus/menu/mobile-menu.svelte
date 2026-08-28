<script lang="ts">
  import type { NavigationMenuProps } from "./types.js";

  interface Props {
    items: NavigationMenuProps["items"];
    showLogin: NavigationMenuProps["showLogin"];
    loginHref: NavigationMenuProps["loginHref"];
    loginText: NavigationMenuProps["loginText"];
    mobileMenuLabel: NavigationMenuProps["mobileMenuLabel"];
  }

  let { items, showLogin, loginHref, loginText, mobileMenuLabel }: Props = $props();

  let isOpen = $state(false);
</script>

<button
  data-slot="button"
  class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 lg:hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  aria-label={mobileMenuLabel || "Main Menu"}
  on:click={() => (isOpen = !isOpen)}>
  {#if isOpen}
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
      class="lucide lucide-x size-4"
      aria-hidden="true">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
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
      class="lucide lucide-menu size-4"
      aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  {/if}
</button>

{#if isOpen}
  <div
    class="border-border bg-background fixed inset-0 top-[72px] z-50 container flex h-[calc(100vh-72px)] w-full flex-col overflow-auto border-t lg:hidden">
    <div class="flex flex-col gap-4 p-4">
      {#each items as item}
        {#if item.href}
          <a
            href={item.href}
            class="hover:bg-accent rounded-md p-2 text-lg font-medium transition-colors"
            on:click={() => (isOpen = false)}>
            {item.label}
          </a>
        {:else}
          <div class="p-2 text-lg font-medium">
            {item.label}
          </div>
        {/if}
      {/each}
    </div>

    {#if showLogin}
      <div class="mt-auto p-4">
        <a
          href={loginHref || "#"}
          class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-8 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          on:click={() => (isOpen = false)}>
          {loginText || "Login"}
        </a>
      </div>
    {/if}
  </div>
{/if}
