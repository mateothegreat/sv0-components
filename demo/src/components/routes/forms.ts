import { RectangleEllipsis } from "@lucide/svelte";
import FieldDemo from "@sv0/components/forms/field/demo.svelte";
import InputDemo from "@sv0/components/forms/input/demo.svelte";
import PasswordDemo from "@sv0/components/forms/password/demo.svelte";
import SelectDemo from "@sv0/components/forms/select/demo.svelte";
import type { RouteGroup } from "./routes.svelte";

export const nav: RouteGroup = {
  label: "Forms",
  path: "forms",
  icon: RectangleEllipsis,
  components: [
    {
      label: "Input",
      path: "input",
      component: InputDemo
    },
    {
      label: "Password",
      path: "password",
      component: PasswordDemo
    },
    {
      label: "Field",
      path: "field",
      component: FieldDemo
    },
    {
      label: "Select",
      path: "select",
      component: SelectDemo
    }
  ]
};
