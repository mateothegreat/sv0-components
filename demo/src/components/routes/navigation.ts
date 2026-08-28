import type { RouteGroup } from "./routes.svelte";

import { Navigation } from "@lucide/svelte";
import MenuDemo from "@sv0/components/navigation/menus/menu/demo.svelte";
import TabNavDemo from "@sv0/components/navigation/tab-nav/demo.svelte";
import ToolbarDemo from "@sv0/components/navigation/toolbar/demo.svelte";

export const nav: RouteGroup = {
  label: "Navigation",
  path: "navigation",
  icon: Navigation,
  components: [
    {
      label: "Menu",
      path: "menu",
      component: MenuDemo
    },
    {
      label: "Tab Nav",
      path: "tab-nav",
      component: TabNavDemo
    },
    {
      label: "Toolbar",
      path: "toolbar",
      component: ToolbarDemo
    }
  ]
};
