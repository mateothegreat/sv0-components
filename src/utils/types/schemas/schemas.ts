import type { Defaults, InferEnumFromArray, OutputOfPrimitive } from "./output";
import type { Dec, Get } from "./utilities";

/**
 * Identifiers for primitive types used in schema definitions. These map directly to
 * runtime TypeScript types via `OutputOfPrimitive`.
 */
export type PrimitiveKind = "string" | "number" | "date" | "boolean";

/**
 * A schema node representing an enum. The `enum` property must be a readonly tuple of
 * string literals.
 *
 * Example:
 *
 * ```ts
 * { enum: ["red", "blue", "green"] as const }
 * ```
 */
export type EnumNode<T extends readonly string[] = readonly string[]> = {
  readonly enum: T;
};

/**
 * A schema node representing an array of another schema node. This allows recursive
 * nesting of arrays.
 *
 * Example:
 *
 * ```ts
 * { array: "string" }
 * { array: { object: { name: "string" } } }
 * ```
 */
export type ArrayNode<T extends SchemaNode = SchemaNode> = {
  readonly array: T;
};

/**
 * A schema node representing an optional field. The field may be `undefined` at runtime.
 *
 * Example:
 *
 * ```ts
 * { optional: "string" }
 * ```
 */
export type OptionalNode<T extends SchemaNode = SchemaNode> = {
  readonly optional: T;
};

/**
 * A schema node representing a nullable field. The field may be `null` at runtime.
 *
 * Example:
 *
 * ```ts
 * { nullable: "string" }
 * ```
 */
export type NullableNode<T extends SchemaNode = SchemaNode> = {
  readonly nullable: T;
};

/**
 * A schema node representing a nested object schema. This wraps a `Schema` object to
 * avoid circular type references.
 *
 * Example:
 *
 * ```ts
 * { object: { name: "string", age: "number" } }
 * ```
 */
export type ObjectNode<T extends Schema = Schema> = {
  readonly object: T;
};

/**
 * Forward declaration of SchemaNodeBase (also breaks circularity)
 *
 * A union of all valid schema node types. This includes primitives, enums, arrays,
 * optional and nullable wrappers, and nested objects.
 *
 * @template S - The schema node type
 */
export type SchemaNodeBase<S extends SchemaNodeBase<any> = SchemaNodeBase<any>> =
  | PrimitiveKind
  | EnumNode
  | ArrayNode<S>
  | OptionalNode<S>
  | NullableNode<S>
  | ObjectNode<S>;

/**
 * Public alias for all schema node types
 */
export type SchemaNode = SchemaNodeBase;

/**
 * A schema is a readonly object whose values are `SchemaNode` entries. Each key
 * represents a field in the schema, and its value defines the type and structure.
 *
 * @example
 *
 * ```ts
 * const schema = {
 *   id: "number",
 *   name: "string",
 *   tags: { array: "string" },
 *   owner: { optional: { object: { name: "string" } } },
 *   status: { enum: ["active", "inactive"] as const }
 * } as const;
 * ```
 */
export type Schema = {
  readonly [key: string]: SchemaNode;
};

/**
 * Determines whether a key `K` exists in a defaults object `D`. This is used to decide
 * whether nullability should be enforced for a given field.
 *
 * @template D - The defaults object
 * @template K - The key to check
 */
export type HasDefaultKey<D, K extends string | number | symbol> =
  D extends Record<any, any> ? (K extends keyof D ? true : false) : false;

/**
 * Removes `null` from a type `T` if a default is present and enforcement is enabled.
 * Otherwise, returns `T` unchanged.
 *
 * @template T - The base type
 * @template HasDefault - Whether a default exists for this field
 * @template Enforce - Whether nullability enforcement is enabled
 */
export type MaybeMakeNonNullable<
  T,
  HasDefault extends boolean,
  Enforce extends boolean
> = HasDefault extends true ? (Enforce extends true ? Exclude<T, null> : T) : T;

/**
 * Maps a single schema node to its runtime output type. This function is recursive and
 * depth-limited to avoid compiler blowups.
 *
 * @template N - The schema node
 * @template D - The default value for this node
 * @template Enforce - Whether to enforce non-nullability
 * @template Depth - Remaining recursion depth
 */
export type SchemaNodeOutput<
  N extends SchemaNode,
  D,
  Enforce extends boolean,
  Depth extends number
> = Depth extends 0
  ? unknown
  : N extends PrimitiveKind
    ? MaybeMakeNonNullable<OutputOfPrimitive<N>, false, Enforce>
    : N extends EnumNode<infer A>
      ? MaybeMakeNonNullable<InferEnumFromArray<A> | null, false, Enforce>
      : N extends ArrayNode
        ? SchemaNodeOutput<N["array"], D, Enforce, Dec<Depth>>[]
        : N extends OptionalNode
          ? SchemaNodeOutput<N["optional"], D, Enforce, Dec<Depth>> | undefined
          : N extends NullableNode
            ? SchemaNodeOutput<N["nullable"], D, Enforce, Dec<Depth>> | null
            : N extends ObjectNode
              ? SchemaOutputInternal<N["object"], D, Enforce, Dec<Depth>>
              : unknown;

/**
 * Internal implementation of schema output mapping. Iterates over each key in the schema
 * and applies per-key default enforcement.
 *
 * @template S - The schema object
 * @template D - The defaults object
 * @template Enforce - Whether to enforce non-nullability
 * @template Depth - Remaining recursion depth
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
 * Public-facing schema output type. Maps a schema to its runtime output type, applying
 * defaults and nullability enforcement.
 *
 * @template S - The schema definition
 * @template D - The defaults object (optional)
 * @template Enforce - Whether to enforce non-nullability for fields with defaults
 * @template Depth - Maximum recursion depth (default: 10)
 *
 *   Example:
 *
 *   ```ts
 *   const schema = {
 *   id: "string",
 *   tags: { array: "string" },
 *   owner: { optional: { object: { name: "string" } } }
 *   } as const;
 *
 *   type Output = SchemaOutput<typeof schema>;
 * ```
 */
export type SchemaOutput<
  S extends Schema,
  D extends Defaults<S> | undefined = undefined,
  Enforce extends boolean = false,
  Depth extends number = 10
> = SchemaOutputInternal<S, D extends undefined ? {} : D, Enforce, Depth>;
