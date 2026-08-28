<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { styleSet } from "./styleset";
  import type { ButtonStyles } from "./types";

  let {
    ...rest
  }: {
    href?: string;
    disabled?: boolean;
  } & WithChildren &
    WithOptionalClass &
    ButtonStyles &
    HTMLButtonAttributes = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const style = styleSet(
    {
      intent: built.intent,
      size: built.size,
      effect: built.effect,
      focus: built.focus
    },
    built.class
  );
</script>

{#if built.href}
  <a
    class={style}
    href={built.disabled ? undefined : built.href}
    aria-disabled={built.disabled}
    role={built.disabled ? "link" : undefined}
    tabindex={built.disabled ? -1 : undefined}>
    {@render built.children?.()}
  </a>
{:else}
  <button class={style} disabled={built.disabled} {...built.rest()}>
    {@render built.children?.()}
  </button>
{/if}
