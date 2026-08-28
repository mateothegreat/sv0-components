/**
 * Output mapping (Schema -> Runtime types)
 */

import type {
  ArrayNode,
  EnumNode,
  NullableNode,
  OptionalNode,
  PrimitiveKind,
  Schema,
  SchemaNode
} from "./schemas";
import type { Dec } from "./utilities";

/**
 * Map primitive kind to a runtime TypeScript type (no null by default). Nullability and
 * optionality are handled via wrappers (`nullable` / `optional`).
 */
export type OutputOfPrimitive<K extends PrimitiveKind> = K extends "string"
  ? string
  : K extends "number"
    ? number
    : K extends "date"
      ? Date
      : K extends "boolean"
        ? boolean
        : never;

/**
 * Get the literal union of string values from a readonly array node. Expects `T` to be a
 * readonly tuple of string literals.
 */
export type InferEnumFromArray<T extends readonly string[]> = T[number];

/**
 * Lookup helper: returns `T[K]` when `K` is keyof T, otherwise `undefined`.
 */
export type Get<T, K> = K extends keyof T ? T[K] : undefined;

/**
 * Defaults type - mirrors the schema's shape but with concrete values to be used as
 * runtime defaults. Keys are optional (you may provide defaults for any subset of keys).
 *
 * Note: because defaults are values (not markers), presence detection in types is done by
 * checking `K extends keyof D` (i.e. whether the key exists in the provided defaults
 * type).
 */
export type Defaults<T extends Schema> = {
  readonly [K in keyof T]?: SchemaDefaultValue<T[K]>;
};

/** Internal: map a SchemaNode to a matching default value shape. */
export type SchemaDefaultValue<N extends SchemaNode> = N extends PrimitiveKind
  ? OutputOfPrimitive<N> | null | undefined
  : N extends EnumNode<infer A>
    ? InferEnumFromArray<A> | null | undefined
    : N extends ArrayNode<infer I>
      ? SchemaDefaultValue<I>[]
      : N extends OptionalNode<infer V>
        ? SchemaDefaultValue<V> | undefined
        : N extends NullableNode<infer V>
          ? SchemaDefaultValue<V> | null
          : N extends Schema
            ? Defaults<N>
            : unknown;

/**
 * MaybeMakeNonNullable removes `null` from T when `HasDefault` is true and `Enforce` is
 * true. Otherwise returns T unchanged.
 */
export type MaybeMakeNonNullable<
  T,
  HasDefault extends boolean,
  Enforce extends boolean
> = HasDefault extends true ? (Enforce extends true ? Exclude<T, null> : T) : T;

/**
 * Core mapping from a SchemaNode to its runtime type, with depth limiting and default
 * presence handling.
 */
export type SchemaNodeOutput<
  N extends SchemaNode,
  D,
  Enforce extends boolean,
  Depth extends number
> = Depth extends 0
  ? unknown // stop recursion to protect compiler
  : N extends PrimitiveKind
    ? MaybeMakeNonNullable<OutputOfPrimitive<N>, false, Enforce>
    : N extends EnumNode<infer A>
      ? MaybeMakeNonNullable<InferEnumFromArray<A> | null, false, Enforce>
      : N extends ArrayNode<infer I>
        ? SchemaNodeOutput<I, D, Enforce, Dec<Depth>>[]
        : N extends OptionalNode<infer V>
          ? SchemaNodeOutput<V, D, Enforce, Dec<Depth>> | undefined
          : N extends NullableNode<infer V>
            ? SchemaNodeOutput<V, D, Enforce, Dec<Depth>> | null
            : N extends Schema
              ? SchemaOutputInternal<N, D, Enforce, Dec<Depth>>
              : unknown;

/**
 * Internal: boolean type whether key K exists in Defaults D.
 */
export type HasDefaultKey<D, K extends string | number | symbol> =
  D extends Record<any, any> ? (K extends keyof D ? true : false) : false;

/**
 * Internal implementation: maps a Schema object to its output type.
 *
 * - `D` is the Defaults object matching the schema (partial)
 * - `Enforce` when true removes `null` from primitive outputs for keys that have defaults
 * - `Depth` controls recursion depth (default 10)
 */
export type SchemaOutputInternal<
  S extends Schema,
  D,
  Enforce extends boolean,
  Depth extends number
> = {
  readonly [K in keyof S]: SchemaNodeOutput<
    S[K],
    Get<D, K>,
    HasDefaultKey<D, K> extends true ? Enforce : false,
    Depth
  >;
};

/**
 * Public SchemaOutput mapping with defaults and optional enforcement.
 *
 * @template S - Schema object
 * @template D - Defaults for S (use `Defaults<S>`)
 * @template Enforce - When `true`, fields that have defaults will have `null` stripped
 *   from primitive outputs
 * @template Depth - Maximum recursion depth (0..10). Default: 10
 */
export type SchemaOutput<
  S extends Schema,
  D extends Defaults<S> | undefined = undefined,
  Enforce extends boolean = false,
  Depth extends number = 10
> = SchemaOutputInternal<S, D extends undefined ? {} : D, Enforce, Depth>;
