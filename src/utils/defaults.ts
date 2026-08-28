/**
 * Initializes the context for a new merge operation.
 *
 * @param source The initial source object.
 * @param defaults The initial defaults object.
 *
 * @returns A fully prepared MergeContext.
 */
function initializeContext(source: any, defaults: any): { context: MergeContext; result: any } {
  const result = {};
  const context: MergeContext = {
    work: [[source, defaults, result]],
    visited: new WeakMap<object, WeakMap<object, any>>()
  };

  // Pre-populate the visited map for the top-level objects to handle cycles.
  const sourceMap = new WeakMap();
  context.visited.set(defaults, sourceMap);
  sourceMap.set(source, result);

  return { context, result };
}

// --- Type Definitions for our merge process ---

/** Represents a single unit of work for our iterative process. */
export type MergeTask = [any, any, any]; // [source, defaults, target]

/** Holds the state of the entire merge operation. */
export interface MergeContext {
  work: MergeTask[];
  visited: WeakMap<object, WeakMap<object, any>>;
}

// --- Strategy Functions ---
/**
 * Checks if a value is a plain object (created by `{}` or `new Object()`).
 *
 * @param value The value to check.
 *
 * @returns True if the value is a plain object.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return Object.prototype.toString.call(value) === "[object Object]";
};

/**
 * Retrieves all own keys (including Symbols) from an object.
 *
 * @param obj The object to get keys from.
 *
 * @returns An array of string and symbol keys.
 */
export const getOwnKeys = (obj: object): Array<string | symbol> => {
  if (obj === null || obj === undefined) return [];
  return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
};

/**
 * Creates a clone of a value with awareness for complex data types.
 *
 * This function handles primitives, plain objects, arrays, and common built-in types like Date,
 * RegExp, Map, Set, and TypedArrays. Other types (like class instances or functions) are returned
 * by reference.
 *
 * @param val The value to clone.
 *
 * @returns A clone of the value.
 */
export const cloneComplex = (val: unknown): unknown => {
  if (val === null || typeof val !== "object") {
    return val; // Primitives
  }

  // Common built-ins
  if (val instanceof Date) return new Date(val.getTime());
  if (val instanceof RegExp) return new RegExp(val.source, val.flags);
  if (val instanceof Map) return new Map(val);
  if (val instanceof Set) return new Set(val);

  // TypedArrays
  if (ArrayBuffer.isView(val) && !(val instanceof DataView)) {
    // This is a robust way to clone any kind of TypedArray (e.g., Uint8Array)
    return (val.constructor as any).from(val);
  }

  // For arrays and plain objects, we return a new empty container.
  // The main merge logic is responsible for populating them deeply.
  if (Array.isArray(val)) return [];
  if (isPlainObject(val)) return {};

  // All other types (class instances, functions) are returned by reference
  return val;
};

/**
 * Strategy #1: Copy all properties from a source object to a target object. This ensures that
 * properties unique to the source are preserved.
 *
 * @param source The object to copy from.
 * @param target The object to copy to.
 */
export function copySourceProperties(source: any, target: any): void {
  for (const key of getOwnKeys(source)) {
    target[key] = cloneComplex(source[key]);
  }
}

/**
 * Strategy #2: Merge properties from a defaults object into the target. This is the core logic that
 * decides whether to use a default value, keep a source value, or create a new sub-task for deep
 * merging.
 *
 * @param source The source object.
 * @param defaults The defaults object.
 * @param target The target object being built.
 * @param context The shared context of the merge operation.
 */
export function mergeDefaultProperties(
  source: any,
  defaults: any,
  target: any,
  context: MergeContext
): void {
  for (const key of getOwnKeys(defaults)) {
    const sourceValue = source[key];
    const defaultValue = defaults[key];

    if (sourceValue == null) {
      // If source value is missing (null/undefined), take the default.
      target[key] = cloneComplex(defaultValue);
    } else {
      // Check if we need to perform a deep merge.
      const isSVPlain = isPlainObject(sourceValue);
      const isDVPlain = isPlainObject(defaultValue);
      const isSVArray = Array.isArray(sourceValue);
      const isDVArray = Array.isArray(defaultValue);

      if ((isSVPlain && isDVPlain) || (isSVArray && isDVArray)) {
        // --- Deep Merge Sub-Task ---
        // Both are objects or both are arrays, so we need to go deeper.
        const newTarget = prepareSubTask(sourceValue, defaultValue, context);
        if (newTarget) {
          target[key] = newTarget;
          // Push a new task onto the stack instead of recursing.
          context.work.push([sourceValue, defaultValue, newTarget]);
        } else {
          // A cycle was detected, so we use the already-created result.
          target[key] = context.visited.get(defaultValue)!.get(sourceValue);
        }
      } else {
        // Types mismatch or are primitive; source value is kept.
        target[key] = cloneComplex(sourceValue);
      }
    }
  }
}

/**
 * Prepares a new sub-task for deep merging, handling cycle detection.
 *
 * @returns A new target object/array if no cycle is detected, otherwise null.
 */
function prepareSubTask(sourceValue: object, defaultValue: object, context: MergeContext) {
  let visitedSourceMap = context.visited.get(defaultValue);
  if (visitedSourceMap?.has(sourceValue)) {
    // Cycle detected! Return null to signal we should use the existing result.
    return null;
  }

  const newTarget = Array.isArray(sourceValue) ? [] : {};

  // Register the new target in the cache *before* it gets processed.
  if (!visitedSourceMap) {
    visitedSourceMap = new WeakMap();
    context.visited.set(defaultValue, visitedSourceMap);
  }
  visitedSourceMap.set(sourceValue, newTarget);

  return newTarget;
}

/**
 * Recursively merges properties from a `defaults` object into a `source` object, returning a new
 * object. It only applies defaults for properties in the `source` that are `null` or `undefined`.
 *
 * This version is highly scalable, using an iterative approach to avoid call stack overflow errors
 * on deeply nested objects. It is also safe from circular references.
 *
 * @template T The expected type of the object.
 *
 * @param source The source object, which may be partially defined.
 * @param defaults The object containing the default values.
 *
 * @returns A new object with defaults deeply applied.
 */
export const withDefaultsDeep = <T extends object>(
  source: Partial<T> | null | undefined,
  defaults: T
): T => {
  if (source == null) return cloneComplex(defaults) as T;
  if (defaults == null) return cloneComplex(source) as T;

  const result = {};
  const visited = new WeakMap<object, WeakMap<object, any>>();

  // The stack holds tasks to be processed. Each task is a triplet of
  // [source, defaults, target_to_populate].
  const work: [any, any, any][] = [[source, defaults, result]];

  // The cycle cache tracks object pairs to prevent infinite loops.
  const sourceMap = new WeakMap();
  visited.set(defaults, sourceMap);
  sourceMap.set(source, result);

  while (work.length > 0) {
    const [currentSource, currentDefaults, currentResult] = work.pop()!;

    // Copy all keys from the source first to preserve unique properties.
    for (const key of getOwnKeys(currentSource)) {
      currentResult[key] = cloneComplex(currentSource[key]);
    }

    // Now, merge in the defaults.
    for (const key of getOwnKeys(currentDefaults)) {
      const sourceValue = currentSource[key];
      const defaultValue = currentDefaults[key];

      if (sourceValue == null) {
        currentResult[key] = cloneComplex(defaultValue);
      } else {
        const isSVPlain = isPlainObject(sourceValue);
        const isDVPlain = isPlainObject(defaultValue);
        const isSVArray = Array.isArray(sourceValue);
        const isDVArray = Array.isArray(defaultValue);

        if ((isSVPlain && isDVPlain) || (isSVArray && isDVArray)) {
          let visitedSourceMap = visited.get(defaultValue);
          if (visitedSourceMap?.has(sourceValue)) {
            currentResult[key] = visitedSourceMap.get(sourceValue);
            continue;
          }

          const newTarget = isSVArray ? [] : {};
          currentResult[key] = newTarget;

          if (!visitedSourceMap) {
            visitedSourceMap = new WeakMap();
            visited.set(defaultValue, visitedSourceMap);
          }
          visitedSourceMap.set(sourceValue, newTarget);

          // Push a new task onto the stack instead of recursing.
          work.push([sourceValue, defaultValue, newTarget]);
        } else {
          currentResult[key] = cloneComplex(sourceValue);
        }
      }
    }
  }

  return result as T;
};
