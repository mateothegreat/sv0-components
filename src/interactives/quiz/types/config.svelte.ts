/**
 * @file
 *
 *   Provides utilities for defining and validating quiz **configuration** types.
 *
 *   ## Provides
 *
 *   - **`ConfigProps`:** The schema for configuration properties with optional fields.
 *   - **`Config`:** The instantiated (validated) configuration class instance for use in
 *       components.
 */

import { type } from "arktype";
import { Grade } from "./grade";
import { Question, QuestionPropsSchema, QuestionState } from "./question.svelte";
import { Status } from "./quiz";
import { TimerPropsSchema } from "./timer.svelte";

/**
 * Schema defining the properties of a quiz configuration that validates the structure of
 * configuration objects at runtime and provides type inference.
 *
 * @remarks
 * The schema enforces:
 *
 * - Optional title and description for quiz metadata.
 * - Array of validated question objects.
 * - Optional grade configuration for scoring.
 * - Optional timer settings for timed quizzes.
 *
 * @category Types
 */
export const ConfigProps = type({
  /**
   * The title of the quiz. Displayed prominently to users.
   *
   * @optional
   */
  "title?": "string",

  /**
   * A description providing context or instructions for the quiz.
   *
   * @optional
   */
  "description?": "string",

  /**
   * Array of questions that make up the quiz. Each question is validated according to the
   * QuestionProps schema.
   *
   * @optional
   */
  questions: QuestionPropsSchema.array(),

  /**
   * Grading configuration that determines scoring rules and attempt limits.
   *
   * @optional
   */
  "grade?": "unknown",

  /**
   * The active/current question index.
   *
   * @optional
   */
  "current?": QuestionPropsSchema,

  /**
   * Timer configuration that determines the time limit for the quiz.
   *
   * @optional
   */
  "timer?": TimerPropsSchema,

  "navigation?": type({
    "previous?": "boolean"
  })
});

/**
 * TypeScript type inferred from the ConfigProps schema. Use this type when working with
 * configuration objects in your components to ensure type safety.
 *
 * @category Types
 */
export type ConfigProps = typeof ConfigProps.infer;

/**
 * Instance of a quiz configuration that encapsulates all configuration data and
 * functionality. This class provides a validated and properly typed configuration object
 * for use throughout the quiz system.
 *
 * @example
 *
 * ```typescript
 * const config = Config.fromProps({
 *   title: "JavaScript Fundamentals Quiz",
 *   description: "Test your knowledge of JavaScript basics",
 *   questions: [
 *     {
 *       title: "What is a closure?",
 *       type: "Text",
 *       options: []
 *     }
 *   ],
 *   timed: 300 // 5 minutes
 * });
 * ```
 *
 * @category Types
 */
export class Config {
  /**
   * The status of the quiz.
   */
  status = $state<Status>(Status.INITIALIZED);

  /**
   * The title of the quiz displayed to users.
   */
  readonly title?: string;

  /**
   * A description providing context or instructions for the quiz.
   */
  readonly description?: string;

  /**
   * Array of validated Question instances that make up the quiz content.
   */
  readonly questions: Question[];

  /**
   * Grading configuration that determines scoring rules and attempt limits.
   */
  readonly grade?: Grade;

  /**
   * The active/current question index.
   */
  current = $state<Question | undefined>();

  /**
   * Controls navigation between questions.
   */
  readonly navigation: {
    /**
     * Indicates whether the previous button is visible in the quiz navigation.
     */
    previous: boolean;
  };

  /**
   * Constructor.
   *
   * @param props - The validated props object to create the configuration from.
   *
   * @remarks
   * Visibility is `private` so controlled instantiation and guaranteed validation is
   * enforced. This requires that all Config instances are created through the factory
   * method and are properly validated.
   */
  private constructor(props: ConfigProps) {
    this.title = props.title;
    this.description = props.description;
    this.questions = props.questions?.map((q) => Question.fromProps(q)) ?? [];
    this.grade = Grade.fromProps(props.grade);
    this.navigation = {
      previous: props.navigation?.previous ?? true
    };

    if (props.current) {
      this.current = Question.fromProps(props.current);
    } else {
      this.current = this.questions[0];
    }

    /**
     * Effect to flip the status to IN_PROGRESS when there is at least one answered
     * question. This effect will self‑terminate after the first trigger.
     */
    $effect(() => {
      if (
        this.status === Status.INITIALIZED &&
        this.questions.some((q) => q.state !== QuestionState.Unanswered)
      ) {
        this.status = Status.IN_PROGRESS;
        /**
         * Tell svelte to stop tracking this effect by returning an empty cleanup
         * function.
         */
        return () => {};
      }
    });
  }

  /**
   * Factory method to create a Config instance from an unknown input. This method
   * validates the input against the ConfigProps schema and creates a properly typed
   * Config instance.
   *
   * @param input - The unknown input to validate and create a configuration from.
   *
   * @returns A validated Config instance with all properties properly initialized.
   *
   * @throws {TraversalError} If the input does not match the ConfigProps requirements.
   *
   * @example
   *
   * ```typescript
   * // Valid configuration creation
   * const config = Config.fromProps({
   *   title: "Advanced TypeScript Quiz",
   *   description: "Challenge your TypeScript knowledge",
   *   questions: [
   *     {
   *       title: "What is a generic constraint?",
   *       type: "MultipleChoice",
   *       options: [
   *         { value: "A type parameter limitation", correct: true },
   *         { value: "A runtime check", correct: false }
   *       ]
   *     }
   *   ],
   *   timed: 600
   * });
   *
   * // This will throw an error if questions contain invalid data
   * const invalid = Config.fromProps({
   *   title: "Bad Quiz",
   *   questions: [
   *     { type: "InvalidType" } // Missing required title
   *   ]
   * }); // Throws ArkErrors
   * ```
   *
   * @category Types
   */
  static fromProps(input: unknown): Config {
    const data = ConfigProps.assert(input);
    return new Config(data);
  }

  next() {
    if (this.current === undefined) {
      this.current = this.questions[0];
    }
    const i = this.questions.indexOf(this.current);
    if (i < this.questions.length - 1) {
      this.current = this.questions[i + 1];
    }
  }

  previous() {
    if (this.current === undefined) {
      this.current = this.questions[0];
    }
    const i = this.questions.indexOf(this.current);
    if (i > 0) {
      this.current = this.questions[i - 1];
    }
  }

  complete() {
    this.status = Status.COMPLETED;
  }

  get index() {
    return this.questions.indexOf(this.current!);
  }

  get first() {
    return (this.current = this.questions[0]);
  }

  get last() {
    return this.current === this.questions[this.questions.length - 1];
  }

  getAnswers(questionId?: string) {
    return this.questions
      .filter((q) => (questionId ? q.id === questionId : true))
      .map((q) =>
        q.options
          .filter((o) => o.selected && o.correct)
          .map((o) => {
            return {
              questionId: q.id,
              optionId: o.value,
              value: o.value,
              selected: o.selected,
              correct: o.correct
            };
          })
      );
  }
}
