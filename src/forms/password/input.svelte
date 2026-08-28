<script lang="ts">
  import { Input } from "@sv0/components/forms/input";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { createStyleSet } from "@sv0/stylesets";
  import { usePassword } from "./state.svelte";
  import type { PasswordInputProps } from "./types";

  let {
    value = $bindable(""),
    disablePasswordAutofill = false,
    children,
    ...rest
  }: PasswordInputProps = $props();

  const built = usePropsBuilder(rest).withClassMerge("w-full gap-2 flex");
  const ctx = usePassword();

  if (value) {
    ctx.state.value = value;
  }

  const styleSet = createStyleSet({
    base: "transition-all",
    variants: {
      padding: {
        default: "",
        withToggle: "pr-8",
        withCopy: "pr-8",
        withBoth: "pr-16"
      },
      disabled: {
        true: "pointer-events-none opacity-50"
      }
    },
    defaultVariants: {
      padding: "default"
    }
  });

  const style = styleSet(
    {
      disabled: built.disabled,
      padding: built.padding
    },
    built.class
  );
</script>

<div class={built.class}>
  <Input
    bind:value={ctx.state.value}
    disabled={built.disabled}
    type={ctx.state.hidden ? "password" : "text"}
    autocomplete={disablePasswordAutofill ? "off" : "on"}
    data-1p-ignore={disablePasswordAutofill ? "true" : undefined}
    data-lpignore={disablePasswordAutofill ? "true" : undefined}
    data-bwignore={disablePasswordAutofill ? "true" : undefined}
    aria-invalid={ctx.valid()} />
  {@render children?.()}
</div>
