import {
  usePropsBuilder,
  type WithChildren,
  type WithOptionalClass
} from "@sv0/components/utils/props";
import type { VariantProps } from "@sv0/stylesets";
import { createRawSnippet } from "svelte";
import { describe, expectTypeOf, test } from "vitest";
import { group } from "./styleset";

describe("Select Component Types", () => {
  let {
    ...rest
  }: {
    label?: string;
  } & VariantProps<typeof group> &
    WithOptionalClass &
    WithChildren = {
    label: "test",
    spacing: "default",
    padding: "default",
    children: createRawSnippet(() => ({ render: () => "" }))
  };

  const built = usePropsBuilder(rest).withClassMerge();

  test("should have correct types", () => {
    expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>();

    expectTypeOf(built.spacing).toEqualTypeOf<
      "default" | "none" | "sm" | "lg" | null | undefined
    >();
  });
});
