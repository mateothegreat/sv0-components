export const State = {
  VISIBLE: "visible",
  HIDDEN: "hidden"
} as const;

export type State = (typeof State)[keyof typeof State];
