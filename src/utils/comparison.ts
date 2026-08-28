export const compare = <T>(a: T, b: T, key?: string): boolean => {
  // === 1. Identity check
  if (a === b) return true;

  // === 2. Nullish check
  if (a == null || b == null) return a === b;

  const typeA = typeof a;
  const typeB = typeof b;

  // === 3. Type mismatch
  if (typeA !== typeB) return false;

  // === 4. Primitive fast paths
  switch (typeA) {
    case "string":
    case "boolean":
      return a === b;
    case "number":
      return Object.is(a, b); // handles NaN
    case "bigint":
    case "symbol":
      return a === b;
  }

  // === 5. Object-like cases
  if (typeA === "object") {
    // Optional key-based comparison
    if (key && key in (a as object) && key in (b as object)) {
      return compare((a as any)[key], (b as any)[key]);
    }

    // Dates
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // RegExp
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }

    // Arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!compare(a[i], b[i])) return false;
      }
      return true;
    }

    // Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [k, v] of a) {
        if (!b.has(k) || !compare(v, b.get(k))) return false;
      }
      return true;
    }

    // Set
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const v of a) {
        if (!b.has(v)) return false;
      }
      return true;
    }

    // === 6. Shallow object compare first
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;

    let needsDeep = false;
    for (const k of keysA) {
      const valA = (a as any)[k];
      const valB = (b as any)[k];
      if (valA === valB) continue;
      if (valA && valB && typeof valA === "object" && typeof valB === "object") {
        needsDeep = true;
      } else {
        return false;
      }
    }

    // === 7. Deep compare only if needed
    if (needsDeep) {
      const seen = new WeakMap();
      const deepEqual = (x: any, y: any): boolean => {
        if (x === y) return true;
        if (typeof x !== "object" || typeof y !== "object" || x == null || y == null) return false;
        if (seen.get(x) === y) return true;
        seen.set(x, y);
        const kx = Object.keys(x);
        const ky = Object.keys(y);
        if (kx.length !== ky.length) return false;
        for (const k of kx) {
          if (!deepEqual(x[k], y[k])) return false;
        }
        return true;
      };
      return deepEqual(a, b);
    }

    return true;
  }

  // === 8. Fallback
  return Object.is(a, b);
};
