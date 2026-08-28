/**
 * Convenience types & Opts
 */

import type { Defaults } from "./output";
import type { PrimitiveKind, Schema } from "./schemas";

/**
 * PrimitiveSchema: shorthand for a flat schema with only primitives. Example: `{ id:
 * "number", name: "string" }`
 */
export type PrimitiveSchema = {
  readonly [K in string]: PrimitiveKind;
};

/**
 * Options object for schema-driven utilities.
 *
 * - `schema` is required.
 * - `defaults` matches `Defaults<typeof schema>` and is optional.
 * - `enforceDefaults` mirrors the `Enforce` generic behavior at runtime.
 */
export type Opts<
  S extends Schema,
  D extends Defaults<S> | undefined = undefined,
  Enforce extends boolean = false
> = {
  readonly schema: S;
  readonly defaults?: D;
  readonly enforceDefaults?: Enforce;
  readonly debounce?: number | false;
  readonly pushHistory?: boolean;
  readonly twoWayBinding?: boolean;
  readonly preserveUnknownParams?: boolean;
  readonly invalidateAll?: boolean;
  readonly invalidate?: (string | URL)[];
  readonly shallow?: boolean;
};
