<script lang="ts">
  import type { NavigationMenuProps } from "./types.js";
  import Brand from "./brand.svelte";
  import MenuItem from "./menu-item.svelte";
  import MobileMenu from "./mobile-menu.svelte";

  interface Props extends NavigationMenuProps {}

  let {
    brand,
    items,
    showLogin = true,
    loginHref = "#",
    loginText = "Login",
    mobileMenuLabel = "Main Menu"
  }: Props = $props();
</script>

<nav
  aria-label="Main"
  data-orientation="horizontal"
  dir="ltr"
  data-slot="navigation-menu"
  data-viewport="true"
  class="group/navigation-menu relative flex max-w-max min-w-full flex-1 items-center justify-center [&>div:last-child]:left-auto">
  <div class="flex w-full justify-between gap-2 py-4">
    <Brand {brand} />

    <div class="flex items-center gap-2 xl:gap-8">
      <div style="position: relative">
        <ul
          data-orientation="horizontal"
          data-slot="navigation-menu-list"
          class="group hidden flex-1 list-none items-center justify-center gap-0 lg:flex"
          dir="ltr">
          {#each items as item}
            <MenuItem {item} />
          {/each}
        </ul>
      </div>
    </div>

    <div class="flex items-center gap-2">
      {#if showLogin}
        <button
          data-slot="button"
          class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 hidden h-9 shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 md:inline-flex [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <a href={loginHref} class="text-inherit no-underline">
            {loginText}
          </a>
        </button>
      {/if}

      <MobileMenu {items} {showLogin} {loginHref} {loginText} {mobileMenuLabel} />
    </div>
  </div>

  <div class="absolute top-full left-0 isolate z-50 flex justify-center"></div>
</nav>
