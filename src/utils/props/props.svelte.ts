import clsx from "clsx";
import type { Snippet } from "svelte";

/**
 * Type utility that defines required children snippet props.
 *
 * Use this utility type to create components that require children snippets with specific
 * parameter types. The children prop becomes mandatory, ensuring that consuming
 * components always provide the required snippet content.
 *
 * @template TChildArgs An array of parameter types that the children snippet expects.
 *
 * @example
 *
 * ```ts
 * WithChildren<[SelectValue<T>]> // one arg
 * WithChildren<[SelectValue<T>, SelectInstance<T>, boolean]> // three args
 * WithChildren<[]> // no args
 * ```
 *
 * @example
 *
 * ```ts
 * type Props = WithChildren<[string, number]>;
 * const { children }: Props = $props();
 * // children: Snippet<[string, number]>
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithOptionalChildren} for optional children snippet props.
 */
export type WithChildren<TChildArgs extends unknown[] = []> = {
  children: Snippet<[...TChildArgs]>;
};

/**
 * Type utility that defines optional children snippet props.
 *
 * Use this utility type to create components that accept optional children snippets with
 * specific parameter types. The children prop becomes optional, allowing components to
 * gracefully handle cases where no snippet content is provided.
 *
 * @template TChildArgs An array of parameter types that the children snippet expects.
 *
 * @example
 *
 * ```ts
 * WithOptionalChildren<[string]> // one arg
 * WithOptionalChildren<[string, number]> // two args
 * WithOptionalChildren<[]> // no args
 * ```
 *
 * @example
 *
 * ```ts
 * type Props = WithOptionalChildren<[string]>;
 * const { children }: Props = $props();
 * // children?: Snippet<[string]>
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithChildren} for required children snippet props.
 */
export type WithOptionalChildren<TChildArgs extends unknown[] = []> = {
  children?: Snippet<[...TChildArgs]>;
};
/**
 * Type utility that transforms class prop to required className prop.
 *
 * Use this utility type to convert components that use the standard `class` prop to use a
 * required `className` prop instead. This removes the original class property and
 * replaces it with a mandatory className property.
 *
 * @template T The base type that may contain a class property.
 *
 * @example
 *
 * ```ts
 * type Props = WithClassName<{ class?: string; id: number }>;
 * // Result: { className: string; id: number }
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithClassNameOptional} for optional className prop.
 */
export type WithClass = { class: string };

/**
 * Type utility that transforms class prop to optional className prop.
 *
 * Use this utility type to convert components that use the standard `class` prop to use
 * an optional `className` prop instead. This removes the original class property and
 * replaces it with an optional className property.
 *
 * @template T The base type that may contain a class property.
 *
 * @example
 *
 * ```ts
 * type Props = WithClassNameOptional<{ class?: string; id: number }>;
 * // Result: { className?: string; id: number }
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithClassName} for required className prop.
 */
export type WithOptionalClass = { class?: string };

/**
 * Creates a type that transforms an object type into data attributes with the `data-`
 * prefix.
 *
 * This utility type takes an object type and generates corresponding data attributes,
 * preserving the required/optional nature of each property. Required properties in the
 * input type become required data attributes, while optional properties become optional
 * data attributes.
 *
 * @template T A record type where keys represent the data attribute names (without the
 *   `data-` prefix) and values represent the expected types for those attributes.
 *
 * @example
 *
 * ```ts
 * type Props = WithDataAttrs<{
 *   "author-id": string;
 *   bool: boolean;
 * }>;
 *
 * const { "data-author-id": authorId, "data-bool": bool }: Props = $props();
 * // authorId: string
 * // bool: boolean
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 */
export type WithDataAttrs<T extends Record<string, unknown>> = {
  [K in keyof T as `data-${K & string}`]: T[K];
};

/**
 * Extracts the data attributes from the given type.
 *
 * @template T The type to extract the data attributes from.
 *
 * @example
 *
 * ```ts
 * type Props = ExtractDataAttrs<{ "data-author-id": string; "data-bool": boolean }>;
 * // Result: { authorId: string; bool: boolean }
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithDataAttrs} for adding data attributes to a type.
 */
export type ExtractDataAttrs<T> = T extends WithDataAttrs<infer U> ? U : never;

/**
 * Creates a type that adds optional ARIA attributes based on the provided attribute
 * names.
 *
 * This utility type transforms a union of string literals into optional ARIA attributes
 * with the `aria-` prefix. All generated attributes are optional and accept string
 * values, following the standard ARIA specification where most attributes are
 * string-based.
 *
 * @template T A union of string literals representing the ARIA attribute names (without
 *   the `aria-` prefix).
 *
 * @example
 *
 * ```ts
 * type Props = WithAriaAttrs<"label" | "describedby">;
 *
 * const { "aria-label": label, "aria-describedby": describedBy }: Props = $props();
 * // label: string | undefined
 * // describedBy: string | undefined
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link WithDataAttrs} for adding data attributes to a type.
 */
export type WithAriaAttrs<T extends string> = {
  [K in T as `aria-${K}`]?: string;
};

/**
 * Merges the given classes into a single class name.
 *
 * @param classes - The classes to merge.
 *
 * @returns The merged class names as a string.
 *
 * @example
 *
 * ```ts
 * const merged = mergeClassNames("flex", "items-center", "gap-2", "text-sm");
 * // Result: "flex items-center gap-2 text-sm"
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 */
export const mergeClassNames = (...classes: (string | undefined)[]) => {
  // return Array.from(new Set(classes.filter(Boolean).join(" ").split(/\s+/))).join(" ");
  return clsx(...classes);
};

/**
 * Builder for managing props objects with fluent API.
 *
 * @template TProps - The original props object shape.
 * @template TUsed - Keys that have been consumed (tracked in types). We allow any
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link usePropsBuilder} for building props objects with transformations using fluent API.
 */
class PropsBuilder<TProps extends Record<string, any>, TUsed extends PropertyKey = never> {
  /**
   * Runtime tracker to avoid duplicates when building "rest()".
   */
  readonly #usedKeys = new Set<PropertyKey>(["class"]);

  /**
   * Constructor for the PropsBuilder.
   *
   * @param props - The props object to build.
   */
  constructor(readonly props: TProps) {
    Object.assign(this, props);
  }

  /**
   * Mark a key as used at runtime.
   *
   * @param key - The key to mark as used.
   */
  #markUsedRuntime(key: PropertyKey): void {
    this.#usedKeys.add(key);
  }

  /**
   * Merge classes and mark "class" as used.
   *
   * @param classNames - The classes to merge.
   *
   * @returns A new PropsBuilder with the merged classes.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ class: "flex items-center gap-2 text-sm" });
   * const merged = builder.withClassMerge("text-sm");
   * // Result: { class: "flex items-center gap-2 text-sm" }
   * ```
   */
  withClassMerge(
    ...classNames: (string | string[] | null | undefined)[]
  ): PropsBuilder<TProps & { class: string }, TUsed | "class"> & (TProps & { class: string }) {
    // runtime: mark "class" as used
    this.#markUsedRuntime("class");

    const currentClass = (this.props as any).class ?? "";
    const flattened = classNames.flat().filter(Boolean) as string[];
    const merged = mergeClassNames(currentClass, ...flattened);

    const next = {
      ...this.props,
      class: merged
    } as TProps & { class: string };

    return Object.assign(new PropsBuilder(next), next) as any;
  }

  /**
   * Instantiate a prop value and mark the key as used.
   *
   * @param key - The key to instantiate.
   * @param factory - The factory function to instantiate the prop value.
   *
   * @returns A new PropsBuilder with the instantiated prop value.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const instantiated = builder.withInstantiate("foo", (v) => v + "baz");
   * // Result: { foo: "barbaz" }
   * ```
   */
  withInstantiate<K extends keyof TProps, R>(
    key: K,
    factory: (v: TProps[K]) => R
  ): PropsBuilder<Omit<TProps, K> & { [P in K]: R }, TUsed | K> &
    (Omit<TProps, K> & { [P in K]: R }) {
    // runtime: mark the key as used
    this.#markUsedRuntime(key);

    const value = factory(this.props[key]);
    const nextProps = { ...this.props, [key]: value } as Omit<TProps, K> & { [P in K]: R };

    return Object.assign(new PropsBuilder(nextProps), nextProps) as any;
  }

  /**
   * Instantiate multiple named builders from a factory map. Runtime marks any keys found
   * in produced `.props` so rest() won't duplicate them.
   *
   * @param methods - The methods to instantiate.
   *
   * @returns A new PropsBuilder with the instantiated methods.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const instantiated = builder.withInstantiates({ foo: (props) => new PropsBuilder(props) });
   * // Result: { foo: { foo: "bar" } }
   * ```
   */
  withInstantiates<TMethods extends Record<string, (props: TProps) => PropsBuilder<any>>>(
    methods: TMethods
  ): PropsBuilder<TProps, TUsed> & TMethods {
    // runtime: mark the keys as used
    for (const key in methods) {
      this.#markUsedRuntime(key);
    }

    const builtProps: Record<string, any> = {};
    const newMethods: Record<string, any> = {};

    for (const key in methods) {
      const built = methods[key](this.props);
      builtProps[key] = built;
      if ((built as any).props) Object.assign(builtProps, (built as any).props);

      // runtime: mark keys found in built.props so rest() won't duplicate them
      if ((built as any).props) {
        for (const k of Object.keys((built as any).props)) {
          this.#markUsedRuntime(k);
        }
      }

      newMethods[key] = built;
    }

    return Object.assign(new PropsBuilder(builtProps as any), newMethods) as any;
  }

  /**
   * Apply defaults and mark the defaulted keys as used.
   *
   * @param defaults - The defaults to apply.
   *
   * @returns A new PropsBuilder with the applied defaults.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const defaults = builder.withDefaults({ foo: "baz" });
   * // Result: { foo: "baz" }
   * ```
   */
  withDefaults<K extends keyof TProps>(
    defaults: Pick<TProps, K>
  ): PropsBuilder<Omit<TProps, K> & Required<Pick<TProps, K>>, TUsed | K> &
    (Omit<TProps, K> & Required<Pick<TProps, K>>) {
    // runtime: mark each default key as used
    for (const k of Object.keys(defaults) as K[]) {
      this.#markUsedRuntime(k);
    }

    const next = { ...defaults, ...this.props } as Omit<TProps, K> & Required<Pick<TProps, K>>;
    return Object.assign(new PropsBuilder(next), next) as any;
  }

  /**
   * Add data attributes (e.g. {foo: 'bar'} -> data-foo="bar"). Marks the original short
   * keys as used at runtime so rest() won't duplicate them.
   *
   * @param attrs - The data attributes to add.
   *
   * @returns A new PropsBuilder with the added data attributes.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const dataAttrs = builder.withDataAttrs({ foo: "bar" });
   * // Result: { foo: "bar" }
   * ```
   */
  withDataAttrs(attrs: ExtractDataAttrs<TProps>): PropsBuilder<
    TProps & WithDataAttrs<ExtractDataAttrs<TProps>>,
    TUsed
  > & {
    dataAttrs: ExtractDataAttrs<TProps>;
  } {
    const dataAttrsObj = Object.fromEntries(
      Object.entries(attrs).map(([key, value]) => [`data-${key}`, value])
    ) as WithDataAttrs<ExtractDataAttrs<TProps>>;

    // runtime: mark original attr keys as used (so rest() doesn't duplicate them)
    for (const k of Object.keys(attrs)) {
      this.#markUsedRuntime(k);
    }

    const nextProps = {
      ...this.props,
      ...dataAttrsObj
    } as TProps & WithDataAttrs<ExtractDataAttrs<TProps>>;

    const nextBuilder = new PropsBuilder(nextProps) as PropsBuilder<
      TProps & WithDataAttrs<ExtractDataAttrs<TProps>>,
      TUsed
    > & { dataAttrs: ExtractDataAttrs<TProps> };

    (nextBuilder as any).dataAttrs = attrs;

    return nextBuilder;
  }

  /**
   * Explicitly mark any prop keys as used (runtime). Useful when you perform ad-hoc
   * consumption and want rest() to omit keys.
   *
   * @param keys - The keys to mark as used.
   *
   * @returns A new PropsBuilder with the marked keys as used.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const used = builder.useKeys("foo");
   * // Result: { foo: "bar" }
   * ```
   */
  useKeys<KS extends keyof TProps>(...keys: KS[]): PropsBuilder<TProps, TUsed | KS> {
    for (const k of keys) this.#markUsedRuntime(k);
    return this as unknown as PropsBuilder<TProps, TUsed | KS>;
  }

  /**
   * Return an object with the props that have NOT been consumed.
   *
   * - Runtime: filters out keys in #usedKeys.
   * - Type: returns Omit<TProps, TUsed>.
   *
   * @returns A new PropsBuilder with the omitted keys.
   *
   * @example
   *
   * ```ts
   * const builder = new PropsBuilder({ foo: "bar" });
   * const omitted = builder.rest();
   * // Result: { foo: "bar" }
   * ```
   */
  rest(): Omit<TProps, TUsed> {
    const result: Partial<TProps> = {};
    for (const key in this.props) {
      if (!this.#usedKeys.has(key)) {
        result[key as keyof TProps] = this.props[key as keyof TProps];
      }
    }
    return result as Omit<TProps, TUsed>;
  }
}

/**
 * Builds a props object with the given props and applies the given transformations.
 *
 * @template T - The type of props to build.
 *
 * @param props - The props object to build.
 *
 * @returns A props builder object with the given props and applied transformations.
 *
 * @example
 *
 * ```svelte
 * <script lang="ts">
 *   import type { Size } from "$types/sizes";
 *   import { dataAttrs, usePropsBuilder, type WithChildren, type WithDataAttrs } from "$util/props";
 *
 *   type Props = {
 *     id: number;
 *     bool: boolean;
 *     size?: Size;
 *     foo?: number;
 *   } & WithDataAttrs<{
 *     author: string;
 *     bool: boolean;
 *   }> &
 *     WithChildren;
 *
 *   // First, we destructure the props so we can use $bindable() or other rune-safe features.
 *   const { foo = $bindable(), ...rest }: Props = $props();
 *
 *   // Now we leverage the builder utilities to transform the final props.
 *   const built = usePropsBuilder(rest)
 *     .withClassMerge("flex items-center gap-2 text-sm")
 *     .withDefaults({ size: "lg" });
 * </script>
 *
 * <div class={built.class} {...dataAttrs(built)}>
 *   {@render built.children?.()}
 * </div>
 * ```
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link PropsBuilder} for the builder class.
 */
export const usePropsBuilder = <TProps extends Record<string, any>>(props: TProps) => {
  const state = $state({ ...props });
  return Object.assign(new PropsBuilder(state), state);
};

/**
 * Filters the given props object to only include keys that start with "data-".
 *
 * @param props - The props object to filter.
 *
 * @returns A new props object with only the keys that start with "data-".
 *
 * @category Utilities
 *
 * @subcategory Props
 *
 * @see {@link usePropsBuilder} for building props objects with transformations using fluent API.
 */
export const dataAttrs = <T extends Record<string, any>>(props: T) => {
  // Filter keys that start with "data-"
  return Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith("data-"))) as {
    [K in keyof T as K extends `data-${string}` ? K : never]: T[K];
  };
};
