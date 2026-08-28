import { createManagedContext, type ManagedContext } from "@sv0/components/utils/contexts.svelte";
import { Config, State, Status } from "./types";

export const CONTEXT_KEY = Symbol("quiz-context");

export type Instance = {
  config: Config;
  state: State;
  status: Status;
  open: () => void;
  toggle: () => void;
  close: () => void;
};

let context: ManagedContext<Instance>;

export const createContex = (config: Config): ManagedContext<Instance> => {
  if (context) {
    return context as ManagedContext<Instance>;
  }

  context = createManagedContext<Instance>({
    key: CONTEXT_KEY,
    value: {
      config,
      state: State.CLOSED,
      status: Status.INITIALIZED,
      open: () => {},
      toggle: () => {},
      close: () => {}
    }
  });

  return context;
};
