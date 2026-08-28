import { Command as CommandPrimitive } from "bits-ui";

import Empty from "./empty.svelte";
import Group from "./group.svelte";
import Input from "./input.svelte";
import Item from "./item.svelte";
import LinkItem from "./link-item.svelte";
import List from "./list.svelte";
import Root from "./root.svelte";
import Separator from "./separator.svelte";
import Shortcut from "./shortcut.svelte";

const Loading = CommandPrimitive.Loading;

export const Command = {
  Root,
  Empty,
  Group,
  Item,
  LinkItem,
  Input,
  List,
  Separator,
  Shortcut,
  Loading
};
