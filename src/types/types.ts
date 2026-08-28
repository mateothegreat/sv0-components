/**
 * Extracts the first generic parameter from any generic type using a template function.
 */
export type InferGeneric<C, Template extends (...args: any[]) => any> = C extends Template
  ? C extends (...args: any[]) => infer U
    ? U
    : never
  : never;
