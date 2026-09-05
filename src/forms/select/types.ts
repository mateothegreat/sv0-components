import type { Placement } from "@floating-ui/dom";
import type {
  WithChildren,
  WithOptionalChildren,
  WithOptionalClass
} from "@sv0/components/utils/props";
import type { WithElementAttrs } from "@sv0/components/utils/types/modifiers";
import type { VariantProps } from "@sv0/stylesets";
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { SelectState } from "./state.svelte";
import type { contentStyleSet, group, item, label, root, separator, trigger } from "./styleset";

/**
 * A `<Select.Root>`'s value type. `T` is expressed *directly* by the consumer as the
 * shape of the store they bind to `value` — a single item type (e.g. `Item | undefined`)
 * for single-select, or an array type (e.g. `Item[]`) for multi-select. There is no
 * separate discriminant: `T` already carries that information, so this alias is just a
 * readability shorthand for "T or unset".
 */
export type SelectValue<T> = T | undefined;

/**
 * Extracts the *single item* type from a `<Select.Root>`'s value type `T`. If `T` is an
 * array (multi-select), yields the element type; otherwise yields `NonNullable<T>`
 * (single-select).
 *
 * @example
 *
 * ```ts
 * ItemOf<Item | undefined> // Item
 * ItemOf<Item[]>            // Item
 * ItemOf<Item[] | undefined> // Item
 * ```
 */
export type ItemOf<T> = T extends readonly (infer U)[] ? U : NonNullable<T>;

/**
 * Props for the `<Select.Root />` component.
 */
export type SelectRootProps<T> = {
  /**
   * The placeholder text for the select.
   */
  placeholder?: string;

  /**
   * The selected value(s). Its type is whatever `T` the consumer chose — an item type
   * for single-select, or an array type for multi-select. No wrapper, no discriminant.
   *
   * @bindable
   */
  value?: T;

  /**
   * Callback when value changes.
   */
  onValueChange?: (value: T | undefined) => void;

  /**
   * Whether the select is disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Whether the select is required for form submission.
   *
   * @defaultValue false
   */
  required?: boolean;

  /**
   * Name for form submission.
   */
  name?: string;

  /**
   * Whether the dropdown is open.
   *
   * @defaultValue false
   *
   * @bindable
   */
  open?: boolean;

  /**
   * Callback when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether the select accumulates selections (multi) or replaces on select (single).
   * This is a pure *runtime* behavior toggle; the *type* of `value` is dictated by `T`
   * itself. Typing `value` as `Item[]` implies multi-select; typing it as
   * `Item | undefined` implies single-select.
   *
   * @defaultValue false
   */
  multiple?: boolean;
} &
  // Allow an optional class prop to be provided to the component.
  WithOptionalClass &
  // Expose the props from the root styleset to the component.
  VariantProps<typeof root> &
  // Require children to be provided to the component.
  WithChildren &
  // Add the HTML attributes to the component.
  WithElementAttrs<HTMLDivElement>;

export type SelectTriggerProps<T> = SelectTriggerStyles &
  WithChildren<[T | undefined, SelectState<T>]> &
  WithOptionalClass &
  Omit<HTMLButtonAttributes, "children">;

export type SelectContentProps = {
  /**
   * Offset from the trigger element.
   *
   * @defaultValue 4
   */
  offset?: number;

  /**
   * Placement of the content relative to the trigger element.
   *
   * @defaultValue "bottom-start"
   */
  placement?: Placement;
} & VariantProps<typeof contentStyleSet> &
  WithChildren &
  WithOptionalClass &
  WithElementAttrs<HTMLDivElement>;

/**
 * Props for the `<Select.Label />` component.
 */
export type SelectLabelProps = {
  label?: string;
} & SelectLabelStyles &
  WithOptionalChildren &
  WithOptionalClass &
  WithElementAttrs<HTMLDivElement>;

/**
 * Props for the `<Select.Separator />` component.
 */
export type SelectSeparatorProps = SelectSeparatorStyles &
  WithOptionalClass &
  WithElementAttrs<HTMLDivElement>;

/**
 * Style variant types for the Select.Trigger component. These types are derived from the
 * trigger styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectTriggerStyles = VariantProps<typeof trigger>;

/**
 * Style variant types for the Select.Content component. These types are derived from the
 * content styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectContentStyles = VariantProps<typeof contentStyleSet>;

/**
 * Style variant types for the Select.Item component. These types are derived from the
 * item styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectItemProps<T = unknown> = {
  value: ItemOf<T>;
  label?: string;
  disabled?: boolean;
} & VariantProps<typeof item> &
  WithChildren<[{ selected: boolean; highlighted: boolean }]> &
  WithOptionalClass &
  WithElementAttrs<HTMLDivElement>;

/**
 * Style variant types for the Select.Group component. These types are derived from the
 * group styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectGroupProps = {
  /**
   * The group's label. Either a plain string (rendered as-is inside `<Select.Label>`)
   * or a snippet for full markup control.
   */
  label?: string | Snippet;
} & VariantProps<typeof group> &
  WithOptionalClass &
  WithChildren &
  WithElementAttrs<HTMLDivElement>;

/**
 * Style variant types for the Select.Label component. These types are derived from the
 * label styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectLabelStyles = VariantProps<typeof label>;

/**
 * Style variant types for the Select.Separator component. These types are derived from
 * the separator styleset and provide type safety for styling props.
 *
 * @category Select Styles
 */
export type SelectSeparatorStyles = VariantProps<typeof separator>;

export const SelectItemSize = {
  sm: "sm",
  default: "default",
  lg: "lg"
} as const;

export type SelectItem<T = unknown> = {
  ref: HTMLDivElement;
  value: ItemOf<T>;
};
export type SelectItemSize = (typeof SelectItemSize)[keyof typeof SelectItemSize];

export const SelectItemIntent = {
  default: "default",
  destructive: "destructive"
} as const;

export type SelectItemIntent = (typeof SelectItemIntent)[keyof typeof SelectItemIntent];

export const SelectItemState = {
  default: "default",
  selected: "selected",
  highlighted: "highlighted",
  disabled: "disabled"
} as const;

export type SelectItemState = (typeof SelectItemState)[keyof typeof SelectItemState];
