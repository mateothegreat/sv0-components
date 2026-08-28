import Copy from "./copy.svelte";
import Input from "./input.svelte";
import Root from "./root.svelte";
import Strength from "./strength.svelte";
import ToggleVisibility from "./toggle-visibility.svelte";

export type {
  PasswordCopyButtonProps,
  PasswordInputProps,
  PasswordRootProps,
  PasswordStrengthProps,
  PasswordToggleVisibilityProps
} from "./types";

export const Password = {
  Root,
  Input,
  Strength,
  ToggleVisibility,
  Copy
};
