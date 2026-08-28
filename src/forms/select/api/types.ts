import type { Placement } from "@floating-ui/dom";
import type { Snippet } from "svelte";
import type {
  SelectContentStyles,
  SelectItemProps,
  SelectLabelStyles,
  SelectRootProps,
  SelectSeparatorStyles,
  SelectTriggerProps,
  SelectTriggerStyles
} from "../types";

export enum SelectComponentType {
  ITEM = "item",
  LABEL = "label",
  SEPARATOR = "separator",
  GROUP = "group"
}

export type SelectItemNode<T> = {
  type: SelectComponentType.ITEM;
  value: T;
  label?: string;
  disabled?: boolean;
  class?: string;
  size?: SelectItemProps["size"];
  renderer?: Snippet<[T]>;
};

export type SelectLabelNode<T> = {
  type: SelectComponentType.LABEL;
  label: string;
  class?: string;
  size?: SelectLabelStyles["size"];
  weight?: SelectLabelStyles["weight"];
};

export type SelectSeparatorNode<T> = {
  type: SelectComponentType.SEPARATOR;
  class?: string;
  orientation?: SelectSeparatorStyles["orientation"];
};

export type SelectGroupNode<T> = {
  type: SelectComponentType.GROUP;
  label?: string;
  class?: string;
  spacing?: "none" | "sm" | "default" | "lg";
  padding?: "none" | "sm" | "default" | "lg";
  children: SelectNode<T>[];
};

export type SelectNode<T> =
  | SelectItemNode<T>
  | SelectLabelNode<T>
  | SelectSeparatorNode<T>
  | SelectGroupNode<T>;

export type SelectContentConfig<T> = {
  offset?: number;
  placement?: Placement;
  size?: SelectContentStyles["size"];
  width?: SelectContentStyles["width"];
  class?: string;
  nodes: SelectNode<T>[];
};

/**
 * Trigger configurations
 */

// Single select trigger configuration.
type SingleTriggerConfig<T> = {
  size?: SelectTriggerStyles["size"];
  width?: SelectTriggerStyles["width"];
  intent?: SelectTriggerStyles["intent"];
  class?: string;
};

// Multi select trigger configuration.
type MultiTriggerConfig<T> = {
  size?: SelectTriggerStyles["size"];
  width?: SelectTriggerStyles["width"];
  intent?: SelectTriggerStyles["intent"];
  class?: string;
};

/**
 * # Select (instance) Configuration
 *
 * -- These types are using to construct a select instance configuration.
 */

/**
 * Select configuration for when the type of the value is a single value of type `T`.
 *
 * @category Select
 *
 * @type Configuration
 */
type SingleSelectConfig<T> = Omit<SelectRootProps<T>, "children"> & {
  content: SelectContentConfig<T>;
  trigger: SingleTriggerConfig<T> & SelectTriggerProps<T>;
};

// Multi select configuration.
type MultiSelectConfig<T> = Omit<SelectRootProps<T>, "children"> & {
  content: SelectContentConfig<T>;
  trigger: MultiTriggerConfig<T> & SelectTriggerProps<T>;
};

// Select configuration.
export type SelectConfig<T> = SingleSelectConfig<T> | MultiSelectConfig<T>;
