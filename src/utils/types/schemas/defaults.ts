/**
 * @file Defaults and Nullability Enforcement
 */

import type { InferEnumFromArray, OutputOfPrimitive } from "./output";
import type {
  ArrayNode,
  EnumNode,
  NullableNode,
  ObjectNode,
  OptionalNode,
  PrimitiveKind,
  Schema,
  SchemaNode
} from "./schemas";

/**
 * A type representing default values for a schema. Keys are optional, and values must
 * match the output type of the corresponding schema node.
 */
export type Defaults<T extends Schema> = {
  readonly [K in keyof T]?: SchemaDefaultValue<T[K]>;
};

/**
 * Maps a schema node to its corresponding default value type. This includes null and
 * undefined where appropriate.
 */
type SchemaDefaultValue<N extends SchemaNode> = N extends PrimitiveKind
  ? OutputOfPrimitive<N> | null | undefined
  : N extends EnumNode<infer A>
    ? InferEnumFromArray<A> | null | undefined
    : N extends ArrayNode<infer I>
      ? SchemaDefaultValue<I>[]
      : N extends OptionalNode<infer V>
        ? SchemaDefaultValue<V> | undefined
        : N extends NullableNode<infer V>
          ? SchemaDefaultValue<V> | null
          : N extends ObjectNode<infer S>
            ? Defaults<S>
            : unknown;

/**
 * Removes `null` from a type `T` if a default is present and enforcement is enabled.
 * Otherwise, returns `T` unchanged.
 */
type MaybeMakeNonNullable<
  T,
  HasDefault extends boolean,
  Enforce extends boolean
> = HasDefault extends true ? (Enforce extends true ? Exclude<T, null> : T) : T;
