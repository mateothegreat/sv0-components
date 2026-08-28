import type { WithOptionalChildren, WithOptionalClass } from "@sv0/components/utils/props";

export type CalloutIntent = "info" | "success" | "warning" | "error" | "note" | "tip";

export type CalloutProps = {
  variant?: CalloutIntent;
  dismissible?: boolean;
  onDismiss?: () => void;
} & WithOptionalClass &
  WithOptionalChildren;
