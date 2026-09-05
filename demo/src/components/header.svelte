<!--
@file

  Header component with navigation for the site.

  This component provides the main navigation structure for the entire site,
  including links to all major sections. It supports responsive design with
  a mobile menu toggle and includes branding elements.

  ## Core Concepts

  1. **Responsive Navigation:** Mobile-friendly menu with hamburger toggle.
  2. **Active State:** Highlights current page in navigation.
  3. **Accessibility:** Proper ARIA labels and keyboard navigation.
-->

<script lang="ts">
  import { themeState } from "$lib/theme-store.svelte";
  import { MoonIcon, SunIcon } from "@lucide/svelte";
  import { Badge } from "@sv0/components/display/badge";
  import { Button } from "@sv0/components/interactives/buttons/button/index.js";
  import { Menubar } from "@sv0/components/navigation/menus/bar";
  import { routes } from "./routes/routes.svelte";
</script>

<div
  class="flex items-center justify-between border-b-2 border-zinc-200 p-2 dark:border-slate-800/50">
  <div class="mr-2 ml-3 font-medium text-emerald-400">
    <Badge variant="outline" class="text-fuchsia-500">@sv0</Badge>
  </div>
  <div class="flex flex-1 gap-2">
    <Menubar.Root class="border-none">
      {#each routes as group}
        <Menubar.Menu>
          <Menubar.Trigger>{group.label}</Menubar.Trigger>
          <Menubar.Content>
            {#each group.components as component}
              {#if component.type === "separator"}
                <Menubar.Separator />
              {:else}
                <Menubar.Item>
                  <a
                    href={`/components/${group.path}/${component.path}`}
                    class="w-full focus:outline-none">
                    {component.label}
                  </a>
                </Menubar.Item>
              {/if}
            {/each}
          </Menubar.Content>
        </Menubar.Menu>
      {/each}
    </Menubar.Root>
  </div>
  <div class="flex gap-2">
    <Button onclick={() => themeState.toggleTheme()} intent="outline" size="icon">
      <SunIcon
        class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
      <MoonIcon
        class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</div>
