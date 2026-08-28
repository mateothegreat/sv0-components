/**
 * @file
 *
 *   Provides utilities for defining and validating quiz **option** types.
 *
 *   ## Provides
 *
 *   - **`OptionValue`:** A union type representing all possible values an option can hold.
 *   - **`OptionProps`:** The schema for option properties with optional correctness flag.
 *   - **`Option`:** The instantiated (validated) option class instance for use in components.
 */

import type { Renderable } from "@sv0/components/utils/props";
import { ArkErrors, type } from "arktype";

/**
 * Union type representing all possible values that an option can contain. This includes
 * primitive types as well as Svelte-specific rendering types.
 *
 * @category Types
 */
export type OptionValue = Renderable | number | boolean;

/**
 * Schema defining the properties of an option that validates the structure of option
 * objects at runtime and provides type inference.
 *
 * @category Types
 */
export const OptionProps = type({
  /**
   * The value of the option. Can be a string, number, boolean, Snippet, or Component.
   * This is what gets displayed to the user and compared for correctness.
   */
  value: "string|number|boolean",

  /**
   * Indicates whether this option is the correct answer.
   *
   * @optional
   */
  "correct?": "boolean",

  /**
   * Indicates whether this option is selected.
   *
   * @optional
   */
  "selected?": "boolean",

  /**
   * Explanations for why this option is correct or incorrect. Provides educational
   * feedback to the user when they select this option.
   *
   * @optional
   */
  "explanations?": {
    /**
     * Explanation shown when this is the correct answer and user selected it.
     *
     * @optional
     */
    "correct?": "string",

    /**
     * Explanation shown when this is an incorrect answer and user selected it.
     *
     * @optional
     */
    "incorrect?": "string",

    /**
     * Explanation shown when this is the correct answer and user did not select it.
     *
     * @optional
     */
    "missed?": "string"
  }
});

/**
 * TypeScript type inferred from the OptionProps schema. Use this type when working with
 * option objects in your components.
 *
 * @category Types
 */
export type OptionPropsType<T extends OptionValue = OptionValue> = Omit<
  typeof OptionProps.infer,
  "value"
> & { value: T };

/**
 * Instance of an option that encapsulates all option data and functionality.
 *
 * @example
 *
 * ```typescript
 * const option = Option.fromProps({
 *   id: "math-001",
 *   value: "TypeScript",
 *   correct: false
 * });
 * ```
 *
 * @category Types
 */
export class Option<T extends OptionValue = OptionValue> {
  /**
   * The value of the option such as a string, number, boolean, Snippet, or Component.
   */
  readonly value: T;

  /**
   * Indicates whether this option is the correct answer.
   */
  readonly correct?: boolean;

  selected?: boolean = $state(false);

  /**
   * Explanations for why this option is correct or incorrect. Provides educational
   * feedback to help users understand their choice.
   */
  readonly explanations?: {
    correct?: string;
    incorrect?: string;
    missed?: string;
  };

  /**
   * Constructor.
   *
   * @param props - The validated props object to create the option from.
   *
   * @remarks
   * Visibility is `private` so controlled instantiation and guaranteed validation is
   * enforced. This requires that all Question instances are created through the factory
   * method and are properly validated.
   */
  private constructor(props: OptionPropsType<T>) {
    this.value = props.value;
    this.correct = props.correct ?? false;
    this.selected = props.selected ?? false;
    this.explanations = props.explanations;
  }

  /**
   * Factory method to create a Question instance from an unknown input. This method
   * validates the input against the OptionProps and creates a properly typed Option
   * instance.
   *
   * @param input - The unknown input to validate and create a option from.
   *
   * @returns A validated Option instance with all properties properly initialized.
   *
   * @throws {TraversalError} If the input does not match the OptionProps requirements.
   *
   * @example
   *
   * ```typescript
   * // Valid option creation
   * const option = Option.fromProps({
   *   value: "TypeScript",
   *   correct: false
   * });
   *
   * // This will throw an error due to missing value
   * const invalid = Option.fromProps({
   *   correct: true
   * }); // Throws ArkErrors
   * ```
   *
   * @category Types
   */
  static fromProps<T extends OptionValue>(input: unknown): Option<T> {
    /**
     * Validate the input props object and will throw if any validation errors are found.
     */
    const result = OptionProps.assert(input);

    if (result instanceof ArkErrors) {
      throw new Error(result.toString());
    }

    return new Option(result as OptionPropsType<T>);
  }
}
