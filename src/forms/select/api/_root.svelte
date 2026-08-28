<script lang="ts" generics="T,C extends SelectConfig<T>">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { onMount } from "svelte";
  import { Select, SelectRenderer } from "..";
  import { provideSelect } from "../state.svelte";
  import type { SelectRootProps, SelectValue } from "../types";
  import type { SelectInstance, StateProxy } from "./instance.svelte";
  import type { SelectConfig } from "./types";

  let {
    proxy,
    config,
    instance,
    ...rest
  }: {
    config: C;
    proxy: StateProxy<T>;
    instance: SelectInstance<T>;
  } & SelectRootProps<SelectValue<T>> = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  /**
   * Create a unified, reactive state object. This is the key. By combining config and
   * value, we create a single discriminated union object that TypeScript can properly
   * analyze.
   */
  let state = $state({ ...config, value: proxy.value });

  const ctx = provideSelect({
    disabled: config.disabled,
    required: config.required,
    name: config.name,
    open: config.open,
    multiple: config.multiple,
    setter: (v) => (proxy.value = v),
    value: state.value,
    ...config
  });

  /**
   * Sync changes from the select component back to the stateBox (and thus to the caller).
   * This effect updates both the stateBox and calls any onValueChange callback.
   */
  $effect(() => {
    proxy.value = state.value;
    if (state.multiple) {
      /**
       * Here, TS knows `state.value` is `T[]` and `state.onValueChange` expects `T[]`.
       */
      state.onValueChange?.(state.value);
    } else {
      /**
       * Here, TS knows `state.value` is `T` and `state.onValueChange` expects `T`.
       */
      state.onValueChange?.(state.value);
    }
  });

  /**
   * Sync changes from the stateBox (external updates) to the local state.
   */
  $effect(() => {
    state.value = proxy.value;
  });

  onMount(() => {});
</script>

<Select.Root
  bind:ctx={instance.ctx}
  bind:value={state.value}
  multiple={state.multiple}
  open={state.open}
  disabled={state.disabled}
  required={state.required}
  name={state.name}
  width={state.width}
  class={state.class}>
  <Select.Trigger
    size={state.trigger.size}
    width={state.trigger.width}
    intent={state.trigger.intent}
    class={state.trigger.class}>
    <!-- The `{#if state.multiple}` narrows the type of the ENTIRE `state` object. -->
    {#if state.multiple}
      <!-- `state` is narrowed, so `state.value` is T[] and `state.trigger.children` expects T[]. Perfect match. -->
      {@render state.trigger.children?.(state.value, ctx)}
    {:else}
      <!-- `state` is narrowed, so `state.value` is T and `state.trigger.children` expects T. Perfect match. -->
      {@render state.trigger.children?.(state.value, ctx)}
    {/if}
  </Select.Trigger>
  <Select.Content
    offset={state.content.offset}
    placement={state.content.placement || "bottom-end"}
    size={state.content.size}
    width={state.content.width}
    class={state.content.class}>
    <SelectRenderer nodes={state.content.nodes} />
  </Select.Content>
</Select.Root>
