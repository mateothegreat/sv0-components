import MousePointerClick from "~icons/lucide/mouse-pointer-click";
import type { RouteGroup } from "./routes.svelte";

import ButtonDemo from "@sv0/components/interactives/buttons/button/demo.svelte";
import CommandDemo from "@sv0/components/interactives/command/demo.svelte";
import DialogDemo from "@sv0/components/interactives/dialog/demo.svelte";
import PopoverDemo from "@sv0/components/interactives/popover/demo.svelte";
import QuizDemo from "@sv0/components/interactives/quiz/demo.svelte";
import ShareDemo from "@sv0/components/interactives/share/demo.svelte";
import StepperDemo from "@sv0/components/interactives/stepper/demo.svelte";

export const nav: RouteGroup = {
  label: "Interactives",
  path: "interactives",
  icon: MousePointerClick,
  components: [
    {
      label: "Button",
      path: "button",
      component: ButtonDemo
    },
    {
      label: "Command",
      path: "command",
      component: CommandDemo
    },
    {
      label: "Separator",
      type: "separator"
    },
    {
      label: "Dialog",
      path: "dialog",
      component: DialogDemo
    },
    {
      label: "Popover",
      path: "popover",
      component: PopoverDemo
    },
    {
      label: "Separator",
      type: "separator"
    },
    {
      label: "Share",
      path: "share",
      component: ShareDemo
    },
    {
      label: "Stepper",
      path: "stepper",
      component: StepperDemo
    },
    {
      label: "Separator",
      type: "separator"
    },
    {
      label: "Quiz",
      path: "quiz",
      component: QuizDemo
    },
    {
      label: "Wizard",
      path: "wizard",
      component: StepperDemo
    }
  ]
};
