import type { WithOptionalChildren, WithOptionalClass } from "@sv0/components/utils/props";
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type CopyButtonProps = {
  text: string;
  hidden?: boolean;
  size?: 4 | 5 | 6;
  onCopy?: (status: "success" | "failure" | "idle") => void;
  icon?: Snippet;
} & WithOptionalChildren &
  WithOptionalClass &
  HTMLButtonAttributes;
