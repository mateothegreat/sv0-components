/**
 * @file
 *
 *   # Type-Safe Schema Output Inference Utilities
 *
 *   Provides a depth-limited and default-aware system for inferring runtime types from our
 *   schema definitions.
 *
 *   These utilities are used for form builders, API validators, and contexts where schemas
 *   need to be mapped types at runtime.
 *
 *   ## Initial Implementation Coverage
 *
 *   Initial implementation covers the following (more will come as the library evolves):
 *
 *   - Primitive types and enum literals.
 *   - Optional and nullable wrappers.
 *   - Nested object schemas.
 *   - Arrays of any schema node.
 *   - Per-key default enforcement.
 *   - Recursion depth limiting to protect the compiler.
 */

import type { InferEnumFromArray, OutputOfPrimitive } from "./output";
import type { Dec, Get } from "./utilities";

/**
 * 🔍 Determines whether a specific key `K` exists in a defaults object `D`.
 *
 * This utility is used to decide whether a field should be treated as having a default
 * value, which in turn affects nullability enforcement.
 *
 * @template D - The defaults object, typically inferred from user input
 * @template K - The key to check for presence in `D`
 *
 * @example Type HasDefault = HasDefaultKey<{ name: "John" }, "name">; // true type
 * NoDefault = HasDefaultKey<{ name: "John" }, "age">; // false
 */
export type HasDefaultKey<D, K extends string | number | symbol> =
  D extends Record<any, any> ? (K extends keyof D ? true : false) : false;

/**
 * 🧼 Conditionally removes `null` from a type `T` based on default presence and
 * enforcement.
 *
 * This utility is central to controlling nullability in schema outputs. If a default is
 * present and `Enforce` is true, `null` is stripped from the type. Otherwise, the type is
 * returned unchanged.
 *
 * @template T - The base type to conditionally clean
 * @template HasDefault - Whether a default exists for this field
 * @template Enforce - Whether nullability enforcement is enabled
 *
 * @example Type Cleaned = MaybeMakeNonNullable<string | null, true, true>; // string type
 * Unchanged = MaybeMakeNonNullable<string | null, false, true>; // string | null
 */
export type MaybeMakeNonNullable<
  T,
  HasDefault extends boolean,
  Enforce extends boolean
> = HasDefault extends true ? (Enforce extends true ? Exclude<T, null> : T) : T;

/**
 * 🔁 Recursively maps a single schema node `N` to its runtime output type.
 *
 * This is the heart of schema inference. It handles:
 *
 * - Primitive types
 * - Enum literals
 * - Arrays
 * - Optional and nullable wrappers
 * - Nested object schemas
 *
 * Recursion is depth-limited using `Depth` and `Dec<Depth>` to avoid compiler blowups.
 *
 * @template N - The schema node to resolve
 * @template D - The default value for this node (used for nullability enforcement)
 * @template Enforce - Whether to enforce non-nullability for fields with defaults
 * @template Depth - Remaining recursion depth (0 halts recursion)
 */
export type SchemaNodeOutput<N, D, Enforce extends boolean, Depth extends number> = Depth extends 0
  ? unknown // Recursion limit reached — fallback to unknown
  : N extends "string" | "number" | "date" | "boolean"
    ? MaybeMakeNonNullable<OutputOfPrimitive<N>, false, Enforce>
    : N extends { enum: readonly string[] }
      ? MaybeMakeNonNullable<InferEnumFromArray<N["enum"]> | null, false, Enforce>
      : N extends { array: infer A }
        ? SchemaNodeOutput<A, D, Enforce, Dec<Depth>>[]
        : N extends { optional: infer O }
          ? SchemaNodeOutput<O, D, Enforce, Dec<Depth>> | undefined
          : N extends { nullable: infer U }
            ? SchemaNodeOutput<U, D, Enforce, Dec<Depth>> | null
            : N extends { object: infer S extends Record<string, any> }
              ? SchemaOutputInternal<S, D, Enforce, Dec<Depth>>
              : unknown;

/**
 * 🧮 Internal implementation for mapping a full schema object to its output type.
 *
 * This type iterates over each key in the schema and applies `SchemaNodeOutput` to
 * resolve its runtime type. It also checks whether each key has a default and applies
 * nullability enforcement accordingly.
 *
 * @template S - The schema object (record of keys to schema nodes)
 * @template D - The defaults object (partial match to `S`)
 * @template Enforce - Whether to enforce non-nullability for fields with defaults
 * @template Depth - Remaining recursion depth
 */
export type SchemaOutputInternal<
  S extends Record<string, any>,
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
 * 📦 Public-facing schema output type.
 *
 * This is the type you’ll use to infer the runtime shape of a schema. It supports
 * optional defaults and nullability enforcement, and protects the compiler with a
 * configurable recursion depth.
 *
 * @template S - The schema definition (record of keys to schema nodes)
 * @template D - The defaults object (optional; use `undefined` if none)
 * @template Enforce - Whether to enforce non-nullability for fields with defaults
 * @template Depth - Maximum recursion depth (default: 10)
 *
 * @example Const schema = { id: "string", tags: { array: "string" }, owner: { optional: {
 * object: { name: "string" } } } } as const;
 *
 * Type Output = SchemaOutput<typeof schema>;
 */
export type SchemaOutput<
  S extends Record<string, any>,
  D extends Record<string, any> | undefined = undefined,
  Enforce extends boolean = false,
  Depth extends number = 10
> = SchemaOutputInternal<S, D extends undefined ? {} : D, Enforce, Depth>;
