import Monitor from "~icons/lucide/monitor";
import AvatarDemo from "@sv0/components/display/avatar/demo.svelte";
import BadgeDemo from "@sv0/components/display/badge/demo.svelte";
import BreadcrumbsDemo from "@sv0/components/display/breadcrumbs/demo.svelte";
import CalloutDemo from "@sv0/components/display/callout/demo.svelte";
import CardDemo from "@sv0/components/display/card/demo.svelte";
import CollapsibleDemo from "@sv0/components/display/collapsible/demo.svelte";
import ComparatorDemo from "@sv0/components/display/comparator/demo.svelte";
import ContextMenuDemo from "@sv0/components/display/context-menu/demo.svelte";
import DataTableDemo from "@sv0/components/display/data-table/demo.svelte";
import DrawerDemo from "@sv0/components/display/drawer/demo.svelte";
import DropdownMenuDemo from "@sv0/components/display/dropdown-menu/demo.svelte";
import EmptyStateDemo from "@sv0/components/display/empty-state/demo.svelte";
import IconsDemo from "@sv0/components/display/icons/demo.svelte";
import LabelDemo from "@sv0/components/display/label/demo.svelte";
import PortalDemo from "@sv0/components/display/portal/demo.svelte";
import ProgressDemo from "@sv0/components/display/progress/demo.svelte";
import SeparatorDemo from "@sv0/components/display/separator/demo.svelte";
import SheetDemo from "@sv0/components/display/sheet/demo.svelte";
import SkeletonDemo from "@sv0/components/display/skeleton/demo.svelte";
import TableDemo from "@sv0/components/display/table/demo.svelte";
import TabsDemo from "@sv0/components/display/tabs/demo.svelte";
import TagDemo from "@sv0/components/display/tag/demo.svelte";
import TooltipDemo from "@sv0/components/display/tooltip/demo.svelte";
import TourDemo from "@sv0/components/display/tour/demo.svelte";
import type { RouteGroup } from "./routes.svelte";

export const nav: RouteGroup = {
  label: "Display",
  path: "display",
  icon: Monitor,
  components: [
    {
      label: "Avatar",
      path: "avatar",
      component: AvatarDemo
    },
    {
      label: "Badge",
      path: "badge",
      component: BadgeDemo
    },
    {
      label: "Breadcrumbs",
      path: "breadcrumbs",
      component: BreadcrumbsDemo
    },
    {
      label: "Callout",
      path: "callout",
      component: CalloutDemo
    },
    {
      label: "Card",
      path: "card",
      component: CardDemo
    },
    // {
    //   label: "Chart",
    //   path: "chart",
    //   component: ChartDemo
    // },
    {
      label: "Collapsible",
      path: "collapsible",
      component: CollapsibleDemo
    },
    {
      label: "Comparator",
      path: "comparator",
      component: ComparatorDemo
    },
    {
      label: "Context Menu",
      path: "context-menu",
      component: ContextMenuDemo
    },
    {
      label: "Data Table",
      path: "data-table",
      component: DataTableDemo
    },
    {
      label: "Drawer",
      path: "drawer",
      component: DrawerDemo
    },
    {
      label: "Dropdown Menu",
      path: "dropdown-menu",
      component: DropdownMenuDemo
    },
    {
      label: "Empty State",
      path: "empty-state",
      component: EmptyStateDemo
    },
    {
      label: "Icons",
      path: "icons",
      component: IconsDemo
    },
    {
      label: "Label",
      path: "label",
      component: LabelDemo
    },
    {
      label: "Portal",
      path: "portal",
      component: PortalDemo
    },
    {
      label: "Progress",
      path: "progress",
      component: ProgressDemo
    },
    {
      label: "Separator",
      path: "separator",
      component: SeparatorDemo
    },
    {
      label: "Sheet",
      path: "sheet",
      component: SheetDemo
    },
    {
      label: "Skeleton",
      path: "skeleton",
      component: SkeletonDemo
    },
    {
      label: "Table",
      path: "table",
      component: TableDemo
    },
    {
      label: "Tabs",
      path: "tabs",
      component: TabsDemo
    },
    {
      label: "Tag",
      path: "tag",
      component: TagDemo
    },
    {
      label: "Tooltip",
      path: "tooltip",
      component: TooltipDemo
    },
    {
      label: "Tour",
      path: "tour",
      component: TourDemo
    }
  ]
};
