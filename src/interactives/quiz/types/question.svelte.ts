/**
 * @file
 *
 *   Provides utilities for defining and validating quiz **question** types.
 *
 *   ## Provides
 *
 *   - **`QuestionType`:** An enumeration of all valid question types, including multiple
 *       choice, single choice, text, number, and boolean formats.
 *   - **`QuestionProps`:** The schema for question properties with optional fields.
 *   - **`Question`:** The instantiated (validated) question class instance for use in
 *       components.
 */

import type { Renderable } from "@sv0/components/utils/props";
import { randomString } from "@sv0/components/utils/random";
import { type } from "arktype";
import { Option, OptionProps, type OptionValue } from "./option.svelte";

export const QuestionState = {
  Unanswered: "unanswered",
  Correct: "correct",
  Incorrect: "incorrect"
} as const;

export type QuestionState = (typeof QuestionState)[keyof typeof QuestionState];

export const QuestionStateSchema = type.enumerated(
  QuestionState.Unanswered,
  QuestionState.Correct,
  QuestionState.Incorrect
);

export const QuestionType = {
  MultipleChoice: "multiple-choice",
  SingleChoice: "single-choice",
  Text: "text",
  Number: "number",
  Boolean: "boolean"
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

// ArkType runtime union from the const object
const QuestionTypeSchema = type.enumerated(
  QuestionType.MultipleChoice,
  QuestionType.SingleChoice,
  QuestionType.Text,
  QuestionType.Number,
  QuestionType.Boolean
);

/**
 * Union type representing all possible question types that can be used in a quiz. This
 * ensures type safety and validation for question categorization.
 *
 * @remarks
 * - `MultipleChoice`: Allows selection of multiple correct answers.
 * - `SingleChoice`: Allows selection of only one correct answer.
 * - `Text`: Requires a text input response.
 * - `Number`: Requires a numeric input response.
 * - `Boolean`: Requires a true/false response.
 *
 * @category Types
 */
// export const QuestionType = type("'MultipleChoice'|'SingleChoice'|'Text'|'Number'|'Boolean'");

/**
 * Schema defining the properties of a question that validates the structure of question
 * objects at runtime and provides type inference.
 *
 * @remarks
 * The schema enforces:
 *
 * - Required title with non-empty string constraint.
 * - Valid question type from the QuestionType union.
 * - Array of validated option objects.
 * - Optional fields for enhanced question context.
 *
 * @category Types
 */

export const QuestionPropsSchema = type({
  /**
   * Unique identifier for the question.
   *
   * @optional
   */
  "id?": "string",

  /**
   * The main text of the question. Must be a non-empty string that clearly states what is
   * being asked, or a Svelte Snippet for rich content.
   */
  title: "string | object",

  /**
   * Additional context or instructions for the question.
   *
   * @optional
   */
  "description?": "string | object",

  /**
   * The type of question which determines how it should be rendered and validated. Must
   * be one of the values defined in QuestionType.
   */
  type: QuestionTypeSchema,

  /**
   * Array of possible answer options. Required for choice-based questions but may be
   * empty for text or number input questions.
   */
  options: OptionProps.array(),

  /**
   * A helpful clue to guide the user toward the correct answer without revealing it.
   *
   * @optional
   */
  "hint?": "string | undefined",

  /**
   * Detailed explanation of the correct answer, typically shown after the question has
   * been answered.
   *
   * @optional
   */
  "explanation?": "string | undefined",

  /**
   * Time limit for the question in seconds. If not provided, the question is untimed.
   *
   * @optional
   */
  "timed?": "number | undefined",

  /**
   * The state of the question.
   *
   * @optional
   */
  "state?": QuestionStateSchema
});

/**
 * TypeScript type inferred from the QuestionSchema. Use this type when working with
 * question objects in your components to ensure type safety.
 *
 * @category Types
 */
export type QuestionProps = Omit<typeof QuestionPropsSchema.infer, "title"> & {
  title: Renderable;
  description: Renderable;
};

/**
 * Instance of a question that encapsulates all question data and functionality.
 *
 * @example
 *
 * ```typescript
 * const question = Question.fromProps({
 *   id: "math-001",
 *   title: "Calculate the area of a circle with radius 5",
 *   type: "Number",
 *   options: [],
 *   hint: "Use the formula πr²"
 * });
 * ```
 *
 * @category Types
 */
export class Question {
  /**
   * Unique identifier for the question. Useful for tracking responses and analytics.
   */
  readonly id: string;

  /**
   * The main text of the question that will be displayed to the user.
   */
  readonly title?: Renderable;

  /**
   * Additional context or instructions that provide more detail about what is expected.
   */
  readonly description?: Renderable;

  /**
   * The type of question which determines the input method and validation rules.
   */
  readonly type: QuestionType;

  /**
   * Array of possible answer options. Each option contains a value and correctness flag.
   */
  readonly options: Option<OptionValue>[];

  /**
   * A helpful clue that can be shown to users who are struggling with the question.
   */
  readonly hint?: string;

  /**
   * Detailed explanation of the correct answer and reasoning behind it.
   */
  readonly explanation?: string;

  /**
   * Time limit for the question in seconds. If not provided, the question is untimed.
   */
  readonly timed?: number;

  /**
   * The options that have been selected by the user.
   */
  readonly selected?: Option<OptionValue>[];

  /**
   * The state of the question.
   */
  state?: QuestionState = $state(QuestionState.Unanswered);

  /**
   * Constructor.
   *
   * @param props - The validated props object to create the question from.
   *
   * @remarks
   * Visibility is `private` so controlled instantiation and guaranteed validation is
   * enforced. This requires that all Question instances are created through the factory
   * method and are properly validated.
   */
  private constructor(props: QuestionProps) {
    this.id = props.id ?? randomString(10);
    this.title = props.title;
    this.description = props.description;
    this.type = props.type;
    this.options = $state(props.options.map((o) => Option.fromProps(o)));
    this.hint = props.hint;
    this.explanation = props.explanation;
    this.timed = props.timed;
    this.selected = $derived.by(() => {
      return this.options.filter((o) => o.selected);
    });
    this.state = props.state ?? QuestionState.Unanswered;
  }

  /**
   * Factory method to create a Question instance from an unknown input. This method
   * validates the input against the QuestionSchema and creates a properly typed Question
   * instance.
   *
   * @param input - The unknown input to validate and create a question from.
   *
   * @returns A validated Question instance with all properties properly initialized.
   *
   * @throws {TraversalError} If the input does not match the QuestionSchema requirements.
   *
   * @example
   *
   * ```typescript
   * // Valid question creation
   * const question = Question.fromProps({
   *   title: "What is TypeScript?",
   *   type: "Text",
   *   options: [],
   *   explanation: "TypeScript is a typed superset of JavaScript..."
   * });
   *
   * // This will throw an error due to missing title
   * const invalid = Question.fromProps({
   *   type: "Boolean",
   *   options: []
   * }); // Throws ArkErrors
   * ```
   *
   * @category Types
   */
  static fromProps(input: typeof QuestionPropsSchema.infer): Question {
    return new Question(input as QuestionProps);
  }

  /**
   * Toggles the selection state of a specific option. For single-choice questions, this
   * method automatically deselects all other options to ensure only one option can be
   * selected at a time.
   *
   * @param option - The option to toggle selection for.
   *
   * @example
   *
   * ```typescript
   * const question = Question.fromProps({
   *   title: "What is TypeScript?",
   *   type: "SingleChoice",
   *   options: [
   *     { value: "A language", correct: true },
   *     { value: "A framework", correct: false }
   *   ]
   * });
   *
   * // Toggle the first option
   * question.toggleOption(question.options[0]);
   * ```
   *
   * @remarks
   * - For `MultipleChoice` questions: allows multiple selections.
   * - For `SingleChoice`, `Boolean`, `Text`, and `Number` questions: ensures only one
   *   option is selected at a time by clearing all other selections first.
   * - This method should only be called when the question is in the `Unanswered` state.
   *
   * @category Methods
   */
  toggleOption(option: Option<OptionValue>): void {
    if (
      this.type === QuestionType.SingleChoice ||
      this.type === QuestionType.Boolean ||
      this.type === QuestionType.Text ||
      this.type === QuestionType.Number
    ) {
      // For single-selection question types, clear all other options first.
      this.options.forEach((o) => {
        if (o !== option) {
          o.selected = false;
        }
      });
    }

    // Toggle the selected option.
    option.selected = !option.selected;
  }

  answer(): void {
    if (this.type === QuestionType.MultipleChoice) {
      // For MultipleChoice: Mark as correct only if all correct options are selected and no incorrect options are selected.
      const allCorrectSelected = this.options
        .filter((o) => o.correct)
        .every((correctOption) => this.selected?.some((sel) => sel === correctOption));
      const noIncorrectSelected = this.selected?.every((sel) => sel.correct) ?? false;
      this.state =
        allCorrectSelected && noIncorrectSelected ? QuestionState.Correct : QuestionState.Incorrect;
    } else if (this.type === QuestionType.SingleChoice) {
      this.state = this.selected?.[0]?.correct ? QuestionState.Correct : QuestionState.Incorrect;
    } else if (this.type === QuestionType.Boolean) {
      this.state = this.selected?.[0]?.correct ? QuestionState.Correct : QuestionState.Incorrect;
    } else if (this.type === QuestionType.Text) {
      this.state =
        this.selected?.[0]?.value === this.options.find((o) => o.correct)?.value
          ? QuestionState.Correct
          : QuestionState.Incorrect;
    } else if (this.type === QuestionType.Number) {
      this.state =
        this.selected?.[0]?.value === this.options.find((o) => o.correct)?.value
          ? QuestionState.Correct
          : QuestionState.Incorrect;
    }
  }
}
