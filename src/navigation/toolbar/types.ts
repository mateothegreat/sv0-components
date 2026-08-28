import type { Snippet } from "svelte";

/**
 * Base props that extend HTML attributes
 */
export interface BaseProps {
  class?: string;
  [key: string]: unknown;
}

/**
 * Props for the toolbar root component
 */
export interface ToolbarRootProps extends BaseProps {
  variant?: "compact" | "full";
  children?: Snippet;
}

/**
 * Props for toolbar button component
 */
export interface ToolbarButtonProps extends BaseProps {
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onclick?: () => void;
  children?: Snippet;
  icon?: Snippet;
  text?: string;
}

/**
 * Props for toolbar search component
 */
export interface ToolbarSearchProps extends BaseProps {
  placeholder?: string;
  value?: string;
  variant?: "full" | "compact";
  showCloseButton?: boolean;
  onInput?: (value: string) => void;
  onClose?: () => void;
}

/**
 * Props for toolbar dropdown component
 */
export interface ToolbarDropdownProps extends BaseProps {
  label?: string;
  icon?: Snippet;
  items?: DropdownItem[];
  open?: boolean;
  onToggle?: (open: boolean) => void;
}

/**
 * Props for toolbar avatar component
 */
export interface ToolbarAvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  onclick?: () => void;
}

/**
 * Props for toolbar separator component
 */
export interface ToolbarSeparatorProps extends BaseProps {
  orientation?: "horizontal" | "vertical";
}

/**
 * Dropdown item interface
 */
export interface DropdownItem {
  label: string;
  value: string;
  onclick?: () => void;
}
