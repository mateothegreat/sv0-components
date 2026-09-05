<script lang="ts" generics="T">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { provideSelect, type SelectState } from "./state.svelte";
  import type { SelectRootProps } from "./types";

  let {
    value = $bindable(),
    ctx = $bindable(),
    ...rest
  }: SelectRootProps<T> & {
    ctx?: SelectState<T>;
  } = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  ctx = provideSelect<T>({
    disabled: built.disabled,
    required: built.required,
    name: built.name,
    open: built.open,
    multiple: built.multiple,
    setter: (v) => (value = v),
    value,
    ...rest
  });

  // Sync external changes -> internal state.
  $effect(() => {
    ctx.value = value;
  });
</script>

<!-- Hidden input for form submission -->
{#if built.name}
  {@const currentValue = ctx.value}
  {#if built.multiple && Array.isArray(currentValue)}
    {#if currentValue.length === 0}
      <input
        type="hidden"
        name={built.name}
        value=""
        disabled={built.disabled}
        required={built.required} />
    {:else}
      {#each currentValue as val}
        <input
          type="hidden"
          name={built.name}
          value={val}
          disabled={built.disabled}
          required={built.required} />
      {/each}
    {/if}
  {:else}
    <input
      type="hidden"
      name={built.name}
      value={currentValue as string}
      disabled={built.disabled}
      required={built.required} />
  {/if}
{/if}

{@render built.children?.()}
