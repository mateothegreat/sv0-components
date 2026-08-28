import type { CopyProps } from "@sv0/components/interactives/buttons/copy/types";
import type { Score } from "@sv0/components/utils/validation/score";
import type { VariantProps } from "@sv0/stylesets";
import type {
  Meter as MeterPrimitive,
  Toggle as TogglePrimitive,
  WithChildren,
  WithoutChildren
} from "bits-ui";
import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
import type {
  copyButtonStyleSet,
  inputStyleSet,
  rootStyleSet,
  strengthBarStyleSet,
  strengthGapsStyleSet,
  strengthMeterStyleSet,
  toggleVisibilityStyleSet
} from "./styleset";

export type PasswordRootStyles = VariantProps<typeof rootStyleSet>;
export type PasswordInputStyles = VariantProps<typeof inputStyleSet>;
export type PasswordToggleVisibilityStyles = VariantProps<typeof toggleVisibilityStyleSet>;
export type PasswordStrengthMeterStyles = VariantProps<typeof strengthMeterStyleSet>;
export type PasswordStrengthBarStyles = VariantProps<typeof strengthBarStyleSet>;
export type PasswordStrengthGapsStyles = VariantProps<typeof strengthGapsStyleSet>;
export type PasswordCopyButtonStyles = VariantProps<typeof copyButtonStyleSet>;

export type PasswordRootPropsWithoutHTML = WithChildren<{
  ref?: HTMLDivElement | null;
  hidden?: boolean;
  /**
   * The minimum acceptable score for a password. (0-4)
   *
   * @default 3
   */
  minScore?: Score;
}>;

export type PasswordRootProps = WithoutChildren<HTMLAttributes<HTMLDivElement>> &
  PasswordRootPropsWithoutHTML &
  PasswordRootStyles;

export type PasswordInputPropsWithoutHTML = WithChildren<{
  ref?: HTMLInputElement | null;
  value?: string;
  disablePasswordAutofill?: boolean;
}>;

export type PasswordInputProps = Omit<
  WithoutChildren<HTMLInputAttributes>,
  "type" | "files" | "aria-invalid" | "value"
> &
  PasswordInputPropsWithoutHTML &
  PasswordInputStyles;

export type PasswordToggleVisibilityProps = Omit<
  TogglePrimitive.RootProps,
  "children" | "pressed" | "aria-label" | "tabindex"
> &
  PasswordToggleVisibilityStyles;

export type PasswordCopyButtonProps = Omit<CopyProps, "children" | "text"> &
  PasswordCopyButtonStyles;

export type PasswordStrengthPropsWithoutHTML = {
  strength?: Score;
};

export type PasswordStrengthProps = PasswordStrengthPropsWithoutHTML &
  WithoutChildren<MeterPrimitive.RootProps> &
  PasswordStrengthMeterStyles;
