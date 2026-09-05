import type { RouteGroup } from "./routes.svelte";

import Settings2 from "~icons/lucide/settings2";
import DragDropDemo from "@sv0/components/attachments/drag-drop/demo.svelte";
import PopoverDemo from "@sv0/components/attachments/popover/demo.svelte";

export const nav: RouteGroup = {
  label: "Utilities",
  path: "utilities",
  icon: Settings2,
  components: [
    {
      label: "Drag Drop",
      path: "drag-drop",
      component: DragDropDemo
    },
    {
      label: "Popover",
      path: "popover",
      component: PopoverDemo
    }
  ]
};
