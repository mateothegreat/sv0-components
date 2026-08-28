/**
 * @file
 *
 *   This module tests type preservation in PropsBuilder to identify and fix type issues.
 *
 *   This test file demonstrates the issue where variant props with string literal union
 *   types are incorrectly transformed to boolean | null | undefined when passed through
 *   the PropsBuilder chain, specifically after withClassMerge().
 */

import { usePropsBuilder } from "./props";

// Test case 1: Direct type preservation
type TestProps1 = {
  spacing?: "default" | "sm" | "lg" | "none" | null | undefined;
  padding?: "default" | "sm" | "lg" | "none" | null | undefined;
  label?: string;
  class?: string;
};

const test1 = (props: TestProps1) => {
  const built = usePropsBuilder(props).withClassMerge();

  // These should preserve the original types
  const spacing: "default" | "sm" | "lg" | "none" | null | undefined = built.spacing;
  const padding: "default" | "sm" | "lg" | "none" | null | undefined = built.padding;
  const label: string | undefined = built.label;
  const className: string = built.class;

  return { spacing, padding, label, className };
};

// Test case 2: Complex variant props
type ComplexVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "tertiary";
  intent?: "default" | "success" | "warning" | "error";
  class?: string;
};

const test2 = (props: ComplexVariantProps) => {
  const built = usePropsBuilder(props).withClassMerge("base-class");

  // Check type preservation
  const size: "xs" | "sm" | "md" | "lg" | "xl" | undefined = built.size;
  const variant: "primary" | "secondary" | "tertiary" | undefined = built.variant;
  const intent: "default" | "success" | "warning" | "error" | undefined = built.intent;

  return { size, variant, intent };
};

// Test case 3: Chained methods
const test3 = (props: TestProps1) => {
  const built = usePropsBuilder(props).withClassMerge("base").withDefaults({ spacing: "default" });

  // After withDefaults, spacing should be required
  const spacing: "default" | "sm" | "lg" | "none" | null = built.spacing;
  const padding: "default" | "sm" | "lg" | "none" | null | undefined = built.padding;

  return { spacing, padding };
};

// Export tests for type checking
export { test1, test2, test3 };
