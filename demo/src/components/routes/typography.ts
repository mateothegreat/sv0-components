import type { RouteGroup } from "./routes.svelte";

import { Type } from "@lucide/svelte";
import TypographyDemo from "@sv0/components/typography/demo.svelte";

export const nav: RouteGroup = {
  label: "Typography",
  path: "typography",
  icon: Type,
  components: [
    {
      label: "Typography",
      path: "typography",
      component: TypographyDemo
    }
  ]
};
