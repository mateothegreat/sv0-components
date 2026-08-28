import { Context } from "./types/context";

export const createComparator = (context: Context) => {
  const instance = new Context(context);

  return {
    instance
  };
};
