import { type Score, calculateStrengthScore } from "@sv0/components/utils/validation/score";
import { getContext, setContext } from "svelte";

type PasswordState = {
  value: string;
  hidden: boolean;
  tainted: boolean;
  min: Score;
  strength: () => Score;
  valid: boolean;
};

export function createPasswordState(min: Score = 3) {
  const state = $state({
    value: "",
    hidden: true,
    tainted: false,
    min
  });

  const strength = $derived(() => calculateStrengthScore(state.value));
  const valid = $derived(() => state.value !== "" && strength() >= state.min);

  return { state, strength, valid };
}

const PASSWORD_KEY = Symbol("password");

export function providePassword(min?: Score) {
  const context = createPasswordState(min);
  setContext(PASSWORD_KEY, context);
  return context;
}

export const usePassword = () => {
  const context = getContext<ReturnType<typeof createPasswordState>>(PASSWORD_KEY);
  if (!context) {
    throw new Error("usePassword must be used within a Password.Root component");
  }
  return context;
};
