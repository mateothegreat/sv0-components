import { describe, expect, it } from "vitest";
import { withDefaultsDeep } from "./defaults";

describe("withDefaultsDeep (v3 - Iterative)", () => {
  // Test case 1: Basic functionality
  it("should merge defaults for top-level properties", () => {
    const source = { a: 1, b: undefined };
    const defaults = { a: 10, b: 2, c: 3 };
    expect(withDefaultsDeep(source, defaults)).toEqual({ a: 1, b: 2, c: 3 });
  });

  // Test case 2: Handling null
  it("should use defaults for null source values", () => {
    const source = { a: null };
    const defaults = { a: 1 };
    // FIX: Provide a generic that allows `null` values in the source.
    expect(withDefaultsDeep<{ a: number | null }>(source, defaults)).toEqual({ a: 1 });
  });

  // Test case 3: Nested objects
  it("should recursively merge nested objects", () => {
    const source = { config: { theme: "dark", timeout: null } };
    const defaults = { config: { theme: "light", timeout: 5000, retries: 3 } };

    // FIX: The source object's `config` property is a *partial* version of the
    // defaults' `config` property. We define that relationship in the generic type.
    expect(
      withDefaultsDeep<{
        config: Partial<{ theme: string; timeout: number | null; retries: number }>;
      }>(source, defaults)
    ).toEqual({ config: { theme: "dark", timeout: 5000, retries: 3 } });
  });

  // Test case 4: Preserving unique source properties
  it("should preserve properties that exist only in the source object", () => {
    const source = { a: 1, uniqueToSource: 100 };
    const defaults = { a: 2, b: 3 };
    expect(withDefaultsDeep(source, defaults)).toEqual({ a: 1, b: 3, uniqueToSource: 100 });
  });

  // Test case 5: Null/undefined source
  it("should return a deep copy of defaults if source is null or undefined", () => {
    const defaults = { a: 1, nested: { b: 2 } };
    const result = withDefaultsDeep(null, defaults);
    expect(result).toEqual(defaults);
    expect(result.nested).not.toBe(defaults.nested);
  });

  // Test case 6: Array merging
  it("should merge arrays element-wise, prioritizing source values", () => {
    const source = { arr: [{ id: 1 }, null] };
    const defaults = {
      arr: [
        { id: 9, name: "A" },
        { id: 2, name: "B" }
      ]
    };

    // FIX: Specify that the source array can contain objects that are a partial
    // representation of the objects in the defaults array.
    type Item = { id: number; name: string };
    expect(withDefaultsDeep<{ arr: (Partial<Item> | null)[] }>(source, defaults)).toEqual({
      arr: [
        { id: 1, name: "A" },
        { id: 2, name: "B" }
      ]
    });
  });

  // Test case 7: Circular reference protection
  it("should handle circular references without crashing", () => {
    const source: any = { a: 1 };
    source.self = source;
    const defaults: any = { b: 2 };
    defaults.self = defaults;

    const result = withDefaultsDeep(source, defaults);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.self).toBe(result);
  });

  // Test case 8: Very deep object to test stack safety
  it("should handle deeply nested objects without stack overflow", () => {
    let deepSource: any = {};
    let current = deepSource;
    for (let i = 0; i < 5000; i++) {
      current.nested = {};
      current = current.nested;
    }
    current.final = "source";

    const defaults = { nested: { nested: { final: "default" } } };
    const result = withDefaultsDeep(deepSource, defaults);

    // FIX: For a stress test with extreme nesting, the inferred type becomes impossibly
    // complex. Casting the result to `any` allows us to traverse it without
    // causing a type-checking error, which is acceptable for this kind of test.
    let resultCurrent: any = result;
    for (let i = 0; i < 5000; i++) {
      resultCurrent = resultCurrent.nested;
    }
    expect(resultCurrent.final).toBe("source");
  });

  // Test case 9: Complex data types from clone-utils
  it("should correctly clone complex data types", () => {
    const date = new Date();
    const regex = /abc/g;
    const map = new Map([["a", 1]]);
    const set = new Set([1, 2]);

    const source = { date, regex, map, set };
    const defaults = {
      date: new Date(0),
      regex: /xyz/i,
      map: new Map(),
      set: new Set(),
      other: "default"
    };

    const result = withDefaultsDeep(source, defaults);
    expect(result.date.getTime()).toBe(date.getTime());
    expect(result.regex.source).toBe("abc");
    expect(result.map.get("a")).toBe(1);
    expect(result.set.has(1)).toBe(true);
    expect(result.other).toBe("default");
  });

  // Test case 10: Symbol keys
  it("should correctly merge objects with symbol keys", () => {
    const sym1 = Symbol("id");
    const sym2 = Symbol("meta");

    const source = { [sym1]: "source-id" };
    const defaults = { [sym1]: "default-id", [sym2]: "meta-info" };

    const result = withDefaultsDeep(source, defaults);
    expect(result[sym1]).toBe("source-id");
    expect(result[sym2]).toBe("meta-info");
  });
});
