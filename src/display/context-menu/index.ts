import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import CheckboxItem from "./context-menu-checkbox-item.svelte";
import Content from "./context-menu-content.svelte";
import GroupHeading from "./context-menu-group-heading.svelte";
import Group from "./context-menu-group.svelte";
import Item from "./context-menu-item.svelte";
import Label from "./context-menu-label.svelte";
import RadioGroup from "./context-menu-radio-group.svelte";
import RadioItem from "./context-menu-radio-item.svelte";
import Separator from "./context-menu-separator.svelte";
import Shortcut from "./context-menu-shortcut.svelte";
import SubContent from "./context-menu-sub-content.svelte";
import SubTrigger from "./context-menu-sub-trigger.svelte";
import Trigger from "./context-menu-trigger.svelte";

const Sub = ContextMenuPrimitive.Sub;
const Root = ContextMenuPrimitive.Root;

export const ContextMenu = {
  Root,
  Sub,
  CheckboxItem,
  Content,
  GroupHeading,
  Group,
  Item,
  Label,
  RadioGroup,
  RadioItem,
  Separator,
  Shortcut,
  SubContent,
  SubTrigger,
  Trigger
};
