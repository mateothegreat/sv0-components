/**
 * The state of the quiz instance to determine if the quiz instance is open or closed.
 */
export const State = {
  OPEN: "open",
  CLOSED: "closed"
} as const;

/**
 * The state of the quiz instance to determine if the quiz instance is open or closed.
 */
export type State = (typeof State)[keyof typeof State];

/**
 * The status of the quiz to determine if the quiz is initialized, in progress, or
 * completed.
 */
export const Status = {
  INITIALIZED: "initialized",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed"
} as const;

/**
 * The status of the quiz to determine if the quiz is initialized, in progress, or
 * completed.
 */
export type Status = (typeof Status)[keyof typeof Status];
