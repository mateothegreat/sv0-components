/**
 * This covers:
 *
 * - Primitive → runtime type mapping
 * - Enum parsing with trimming
 * - Nullability enforcement
 * - Schema output inference with and without defaults
 * - Default type inference
 * - Deep simplification behavior
 * - Options object typing
 */
import { describe, expectTypeOf, it } from "vitest";
import type {
  Default,
  InferEnum,
  MaybeNotNullable,
  Opts,
  OutputOfPrimitive,
  Schema,
  SchemaOutput,
  Simplify
} from "./schemas/schemas"; // adjust import path

describe("Primitive → OutputOfPrimitive mapping", () => {
  it("maps primitives to correct runtime types", () => {
    expectTypeOf<OutputOfPrimitive<"string">>().toEqualTypeOf<string | null>();
    expectTypeOf<OutputOfPrimitive<"number">>().toEqualTypeOf<number | null>();
    expectTypeOf<OutputOfPrimitive<"date">>().toEqualTypeOf<Date | null>();
    expectTypeOf<OutputOfPrimitive<"boolean">>().toEqualTypeOf<boolean | null>();
  });

  it("parses enum-like primitives", () => {
    type E = OutputOfPrimitive<"<a,b,c>">;
    expectTypeOf<E>().toEqualTypeOf<"a" | "b" | "c" | null>();
  });

  it("trims whitespace in enum parsing", () => {
    type E = OutputOfPrimitive<"< a , b , c >">;
    expectTypeOf<E>().toEqualTypeOf<"a" | "b" | "c" | null>();
  });
});

describe("InferEnum", () => {
  it("produces correct union from enum string", () => {
    type E = InferEnum<"<x,y>">;
    expectTypeOf<E>().toEqualTypeOf<"x" | "y" | null>();
  });
});

describe("MaybeNotNullable", () => {
  it("removes null when default is provided and enforce is true", () => {
    type T = MaybeNotNullable<string | null, "default", true>;
    expectTypeOf<T>().toEqualTypeOf<string>();
  });

  it("keeps null when enforce is false", () => {
    type T = MaybeNotNullable<string | null, "default", false>;
    expectTypeOf<T>().toEqualTypeOf<string | null>();
  });

  it("keeps null when default is undefined", () => {
    type T = MaybeNotNullable<string | null, undefined, true>;
    expectTypeOf<T>().toEqualTypeOf<string | null>();
  });
});

describe("SchemaOutput", () => {
  const schema = {
    id: "string",
    count: "number",
    meta: {
      active: "boolean"
    },
    tags: ["string"],
    nested: [{ name: "string" }]
  } as const satisfies Schema;

  it("infers correct output without defaults", () => {
    type Out = SchemaOutput<typeof schema>;
    expectTypeOf<Out>().toEqualTypeOf<{
      id: string | null;
      count: number | null;
      meta: { active: boolean | null };
      tags: (string | null)[];
      nested: { name: string | null }[];
    }>();
  });

  it("enforces non-null when defaults are provided", () => {
    type D = {
      id: "abc";
      count: 0;
      meta: { active: true };
      tags: [];
      nested: [{ name: "x" }];
    };
    type Out = SchemaOutput<typeof schema, D, true>;
    expectTypeOf<Out>().toEqualTypeOf<{
      id: string;
      count: number;
      meta: { active: boolean };
      tags: string[];
      nested: { name: string }[];
    }>();
  });
});

describe("Default", () => {
  const schema = {
    id: "string",
    meta: { active: "boolean" },
    tags: ["string"]
  } as const satisfies Schema;

  it("infers correct default type", () => {
    type Def = Default<typeof schema>;
    expectTypeOf<Def>().toEqualTypeOf<{
      id?: string;
      meta?: { active?: boolean };
      tags?: string[];
    }>();
  });
});

describe("Simplify", () => {
  it("deeply simplifies nested mapped types", () => {
    type Nested = { a: { b: { c: string } } };
    type S = Simplify<Nested>;
    expectTypeOf<S>().toEqualTypeOf<{ a: { b: { c: string } } }>();
  });

  it("respects ExcludeType", () => {
    type Nested = { a: Map<string, number> };
    type S = Simplify<Nested>;
    expectTypeOf<S>().toEqualTypeOf<{ a: Map<string, number> }>();
  });
});

describe("Opts", () => {
  const schema = { id: "string" } as const satisfies Schema;
  type D = { id: "abc" };

  it("accepts correct option shapes", () => {
    type O = Opts<typeof schema, D, true>;
    expectTypeOf<O>().toMatchTypeOf<{
      schema: typeof schema;
      default?: D;
      enforceDefault?: true;
      debounce?: number | false;
      pushHistory?: boolean;
      twoWayBinding?: boolean;
      preserveUnknownParams?: boolean;
      invalidateAll?: boolean;
      invalidate?: readonly (string | URL)[];
      shallow?: boolean;
    }>();
  });
});
