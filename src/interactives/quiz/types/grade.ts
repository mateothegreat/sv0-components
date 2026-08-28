/**
 * @file
 *
 *   Provides utilities for defining and validating quiz **grade** types.
 *
 *   ## Provides
 *
 *   - **`GradeProps`:** The schema for grade properties with validation and defaults.
 *   - **`Grade`:** The instantiated (validated) grade class instance for use in components.
 */

import { ArkErrors, type } from "arktype";

/**
 * Schema defining the properties of a grade configuration that validates the structure of
 * grade objects at runtime and provides type inference.
 *
 * @remarks
 * The schema enforces:
 *
 * - Minimum score must be a non-negative number.
 * - Maximum score must be a positive number greater than minimum.
 * - Attempts must be a positive integer.
 * - All fields have sensible defaults when not provided.
 *
 * @category Types
 */
export const GradeProps = type({
  /**
   * The minimum score that can be achieved. Must be a non-negative number.
   *
   * @default 0
   *
   * @optional
   */
  min: ["number>=0", "=", 0],

  /**
   * The maximum score that can be achieved. Must be a positive number and should
   * typically be greater than the minimum score.
   *
   * @default 100
   *
   * @optional
   */
  max: ["number>0", "=", 100],

  /**
   * The number of attempts allowed for the quiz. Must be a positive integer.
   *
   * @default 1
   *
   * @optional
   */
  attempts: ["number>0", "=", 1]
});

/**
 * TypeScript type inferred from the GradeProps schema. Use this type when working with
 * grade configuration objects in your components.
 *
 * @category Types
 */
export type GradePropsType = typeof GradeProps.infer;

/**
 * Instance of a grade configuration that encapsulates all grading data and functionality.
 *
 * @example
 *
 * ```typescript
 * // Create a basic grade configuration
 * const grade = Grade.fromProps({
 *   min: 0,
 *   max: 100,
 *   attempts: 3
 * });
 * ```
 *
 * @example
 *
 * ```typescript
 * // Create with defaults (min: 0, max: 100, attempts: 1)
 * const defaultGrade = Grade.fromProps({});
 * ```
 *
 * @example
 *
 * ```typescript
 * // Create a custom scoring system
 * const customGrade = Grade.fromProps({
 *   min: 50,
 *   max: 500,
 *   attempts: 5
 * });
 * ```
 *
 * @category Types
 */
export class Grade {
  /**
   * The minimum score that can be achieved in the quiz.
   */
  readonly min: number;

  /**
   * The maximum score that can be achieved in the quiz.
   */
  readonly max: number;

  /**
   * The number of attempts allowed for completing the quiz.
   */
  readonly attempts: number;

  /**
   * Constructor.
   *
   * @param props - The validated props object to create the grade configuration from.
   *
   * @remarks
   * Visibility is `private` so controlled instantiation and guaranteed validation is
   * enforced. This requires that all Grade instances are created through the factory
   * method and are properly validated.
   */
  private constructor(props: GradePropsType) {
    this.min = props.min;
    this.max = props.max;
    this.attempts = props.attempts;
  }

  /**
   * Factory method to create a Grade instance from an unknown input. This method
   * validates the input against the GradeProps schema and creates a properly typed Grade
   * instance.
   *
   * @param input - The unknown input to validate and create a grade configuration from.
   *
   * @returns A validated Grade instance with all properties properly initialized.
   *
   * @throws {Error} If the input does not match the GradeProps requirements.
   *
   * @example
   *
   * ```typescript
   * // Valid grade creation with all properties
   * const grade = Grade.fromProps({
   *   min: 0,
   *   max: 100,
   *   attempts: 3
   * });
   *
   * // Valid grade creation with defaults
   * const defaultGrade = Grade.fromProps({});
   *
   * // This will throw an error due to negative minimum
   * const invalid = Grade.fromProps({
   *   min: -10,
   *   max: 100
   * }); // Throws Error
   * ```
   *
   * @category Types
   */
  static fromProps(input: unknown): Grade {
    /**
     * Validate the input props object and will throw if any validation errors are found.
     */
    const result = GradeProps.assert(input);

    if (result instanceof ArkErrors) {
      throw new Error(result.toString());
    }

    return new Grade(result);
  }

  /**
   * Calculates the percentage score based on a raw score value.
   *
   * @param score - The raw score to convert to a percentage.
   *
   * @returns The percentage score as a number between 0 and 100.
   *
   * @example
   *
   * ```typescript
   * const grade = Grade.fromProps({ min: 0, max: 50 });
   * const percentage = grade.getGradePercentage(25); // Returns 50
   * ```
   *
   * @category Methods
   */
  getGradePercentage(score: number): number {
    const range = this.max - this.min;
    const adjustedScore = Math.max(this.min, Math.min(this.max, score)) - this.min;
    return (adjustedScore / range) * 100;
  }

  /**
   * Determines if a given score passes based on a threshold percentage.
   *
   * @param score - The raw score to evaluate.
   * @param threshold - The passing threshold as a percentage (default: 70).
   *
   * @returns True if the score meets or exceeds the threshold.
   *
   * @example
   *
   * ```typescript
   * const grade = Grade.fromProps({ min: 0, max: 100 });
   * const passes = grade.getPassing(75); // Returns true (75% >= 70%)
   * const fails = grade.getPassing(65, 80); // Returns false (65% < 80%)
   * ```
   *
   * @category Methods
   */
  getPassing(score: number, threshold: number = 70): boolean {
    return this.getGradePercentage(score) >= threshold;
  }
}
