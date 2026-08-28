<script lang="ts">
  import { usePropsBuilder, type WithOptionalClass } from "@sv0/components/utils/props";
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
  import { styleSet } from "./styleset";
  import type { InputStyles } from "./types";

  let {
    value = $bindable(""),
    ...rest
  }: {
    disablePasswordAutofill?: boolean;
    value: any;
  } & WithOptionalClass &
    InputStyles &
    Omit<HTMLInputAttributes, "type"> &
    (
      | { type: "file"; files?: FileList }
      | { type?: Exclude<HTMLInputTypeAttribute, "file">; files?: undefined }
    ) = $props();

  const built = usePropsBuilder(rest);

  const style = styleSet(
    {
      type: built.type,
      disabled: built.disabled
    },
    built.class
  );
</script>

{#if built.type === "file"}
  <input class={style} type="file" bind:value bind:files={built.files} {...built.rest()} />
{:else}
  <input
    class={style}
    type={built.type}
    bind:value
    autocomplete={built.disablePasswordAutofill ? "off" : "on"}
    data-1p-ignore={built.disablePasswordAutofill ? "true" : undefined}
    data-lpignore={built.disablePasswordAutofill ? "true" : undefined}
    data-bwignore={built.disablePasswordAutofill ? "true" : undefined}
    {...built.rest()} />
{/if}
