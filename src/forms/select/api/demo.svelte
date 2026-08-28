<script lang="ts">
  import {
    Apple,
    Banana,
    ChefHat,
    Cherry,
    ChevronDown,
    SquareStack,
    Timer,
    TimerOff
  } from "@lucide/svelte";
  import { Demo } from "@sv0/components/demos";
  import { Badge } from "@sv0/components/display/badge";
  import {
    SelectComponentType,
    type SelectConfig,
    type SelectItemNode
  } from "@sv0/components/forms/select/api/types";
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { onMount, type Component } from "svelte";
  import { SelectState } from "../state.svelte";
  import type { SelectValue } from "../types";
  import { createSelectInstance, type SelectInstance } from "./instance.svelte";

  type Item = {
    label: string;
    value: string;
    color?: string;
    icon?: Component;
  };

  type Instance = {
    element: HTMLDivElement;
    config: SelectConfig<Item>;
    instance: SelectInstance<Item>;
    started?: boolean;
    start?: () => void;
    stop?: () => void;
  };

  let basic = $state<HTMLDivElement>();
  let grouped = $state<HTMLDivElement>();
  let multiple = $state<HTMLDivElement>();
  let dynamic = $state<HTMLDivElement>();

  const createBasic = (): Instance => {
    const config: SelectConfig<Item> = {
      placeholder: "Select a fruit",
      trigger: {
        children: trigger
      },
      content: {
        nodes: [
          {
            type: SelectComponentType.ITEM,
            value: { label: "Apple", value: "apple", icon: Apple, color: "text-green-500" },
            label: "Apple",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Banana", value: "banana", icon: Banana, color: "text-yellow-400" },
            label: "Banana",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Cherry", value: "cherry", icon: Cherry, color: "text-red-500" },
            label: "Orange",
            renderer: item
          }
        ]
      }
    };

    const instance = createSelectInstance<Item>({
      target: basic!,
      config
    })!;

    return {
      config,
      instance,
      element: basic!
    };
  };

  const createGrouped = (): Instance => {
    const config: SelectConfig<Item> = {
      trigger: {
        children: trigger
      },
      content: {
        nodes: [
          {
            type: SelectComponentType.GROUP,
            label: "Fruits",
            children: [
              {
                type: SelectComponentType.ITEM,
                value: { label: "Apple", value: "apple", icon: Apple, color: "text-green-500" },
                label: "Apple",
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: {
                  label: "Banana",
                  value: "banana",
                  icon: Banana,
                  color: "text-yellow-400"
                },
                label: "Banana",
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Cherry", value: "cherry", icon: Cherry, color: "text-red-500" },
                label: "Cherry",
                renderer: item
              }
            ]
          },
          { type: SelectComponentType.SEPARATOR },
          {
            type: SelectComponentType.GROUP,
            label: "Vegetables",
            children: [
              {
                type: SelectComponentType.ITEM,
                value: { label: "Carrot", value: "carrot" },
                label: "Carrot",
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Broccoli", value: "broccoli" },
                label: "Broccoli",
                renderer: item
              }
            ]
          },
          { type: SelectComponentType.SEPARATOR },
          {
            type: SelectComponentType.GROUP,
            label: "Berries",
            children: [
              {
                type: SelectComponentType.ITEM,
                value: { label: "Strawberry", value: "strawberry" },
                label: "Strawberry",
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Blueberry", value: "blueberry" },
                label: "Blueberry",
                renderer: item
              }
            ]
          }
        ]
      }
    };

    const instance = createSelectInstance<Item>({
      target: grouped!,
      config
    })!;

    return {
      config,
      instance,
      element: grouped!
    };
  };

  const createMultiple = (): Instance => {
    const config: SelectConfig<Item> = {
      placeholder: "Select a fruit",
      /**
       * As soon as you type `multiple: true`, TypeScript will enforce that `value` must
       * be `Item[]`, `onValueChange` expects `Item[]`, etc.
       */
      multiple: true,
      trigger: {
        children: trigger,
        size: "lg"
      },
      content: {
        nodes: [
          { type: SelectComponentType.LABEL, label: "Available Fruits" },
          {
            type: SelectComponentType.GROUP,
            children: [
              {
                type: SelectComponentType.ITEM,
                value: { label: "Apple", value: "apple", icon: Apple, color: "text-green-500" },
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Banana", value: "banana", icon: Banana, color: "text-yellow-400" },
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Cherry", value: "cherry", icon: Cherry, color: "text-red-500" },
                renderer: item
              }
            ]
          },
          { type: SelectComponentType.SEPARATOR },
          { type: SelectComponentType.LABEL, label: "Available Berries" },
          {
            type: SelectComponentType.GROUP,
            children: [
              {
                type: SelectComponentType.ITEM,
                value: { label: "Strawberry", value: "strawberry" },
                renderer: item
              },
              {
                type: SelectComponentType.ITEM,
                value: { label: "Blueberry", value: "blueberry" },
                renderer: item
              }
            ]
          }
        ]
      }
    };

    /**
     * Create the select instance programmatically returning a `SelectInstance` reference.
     * This is the only method you will need to have a working select component instance.
     */
    const instance = createSelectInstance<Item>({
      target: multiple!,
      config,
      /**
       * Here we set the initial value of the select based on the values of the items
       * above for example purposes only. You can access the `instance.value` property to
       * manipulate the value of the select programmatically at any time forward.
       */
      value: config.content.nodes
        .filter((node) => node.type === SelectComponentType.GROUP)
        .flatMap((node) => ("children" in node ? node.children : []))
        .filter((node) => node.type === SelectComponentType.ITEM)
        .map((node) => ("value" in node ? node.value : undefined))
        .filter((value): value is Item => value !== undefined)
    })!;

    return {
      config,
      instance,
      element: multiple!
    };
  };

  const createDynamic = (): Instance => {
    /**
     * Create the configuration object for the dynamic select.
     */
    const config: SelectConfig<Item> = {
      trigger: {
        children: trigger
      },
      content: {
        nodes: [
          {
            type: SelectComponentType.ITEM,
            value: { label: "Apple", value: "apple", icon: Apple, color: "text-green-500" },
            label: "Apple (dynamic)",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Banana", value: "banana", icon: Banana, color: "text-yellow-400" },
            label: "Banana (dynamic)",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Cherry", value: "cherry", icon: Cherry, color: "text-red-500" },
            label: "Cherry (dynamic)",
            renderer: item
          },
          { type: SelectComponentType.SEPARATOR } as const,
          {
            type: SelectComponentType.ITEM,
            value: { label: "Carrot", value: "carrot" },
            label: "Carrot (dynamic)",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Broccoli", value: "broccoli" },
            label: "Broccoli (dynamic)",
            renderer: item
          },
          { type: SelectComponentType.SEPARATOR } as const,
          {
            type: SelectComponentType.ITEM,
            value: { label: "Strawberry", value: "strawberry" },
            label: "Strawberry (dynamic)",
            renderer: item
          },
          {
            type: SelectComponentType.ITEM,
            value: { label: "Blueberry", value: "blueberry" },
            label: "Blueberry (dynamic)",
            renderer: item
          }
        ]
      }
    };

    /**
     * Create the select instance programmatically returning a `SelectInstance` reference
     * to later instrument its component lifecycle and access its API when needed.
     */
    const instance = createSelectInstance<Item>({
      target: dynamic!,
      config
    })!;

    /**
     * Random selection helper by picking a random item from the selectable values.
     */
    const pickRandom = (): Item => {
      const values = config.content.nodes
        .filter((node): node is SelectItemNode<Item> => node.type === SelectComponentType.ITEM)
        .map((node) => node.value);
      return values[Math.floor(Math.random() * values.length)];
    };

    let started = $state(false);
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      if (started) return;
      started = true;
      instance.value = pickRandom();
      interval = setInterval(() => {
        instance.value = pickRandom();
      }, 1000);
    };

    start();

    return {
      /**
       * We expose the config so that the caller can use it. It is a plain object so that
       * the caller can modify it if needed.
       */
      config,
      /**
       * We expose the instance so that the caller can use it. It is a SelectInstance so
       * that the caller can use the API methods.
       */
      instance,
      /**
       * We expose the element so that the caller can bind to it. It is a HTMLDivElement
       * so that the caller can bind to it.
       */
      element: dynamic!,
      /**
       * We expose a getter for the started state so that the caller can check if the
       * random picker is running because it is a rune state. Without this, the caller
       * would not have direct access to the `$state` itself but a copy of the value
       * instead.
       */
      get started() {
        return started;
      },
      /**
       * We expose a function to start the random picker so that the caller can start it.
       */
      start: () => start(),
      /**
       * We expose a function to stop the random picker so that the caller can stop it.
       */
      stop: () => {
        started = false;
        clearInterval(interval);
      }
    };
  };

  const instances: {
    basic?: Instance;
    grouped?: Instance;
    multiple?: Instance;
    custom?: Instance;
    dynamic?: Instance;
  } = $state({});

  onMount(() => {
    instances.basic = createBasic();
    instances.grouped = createGrouped();
    instances.multiple = createMultiple();
    instances.dynamic = createDynamic();
  });
</script>

<!-- 
  This is a snippet that is used to render the trigger button for all of the select components
  in the demo. It is passed to the `trigger` property of the select configuration object.

  @param value - The value of the select instance.
  @param instance - The select instance (this is optional but is there if you need it).
-->
{#snippet trigger(value: SelectValue<Item>, state: SelectState<Item>)}
  <div class="flex w-full min-w-0 items-center justify-between gap-2">
    {#if value}
      <!-- 
        Check to see if the select instance is in multiple mode and render
        conditionally based on the type of `value` (Item | Item[]).    
      -->
      {#if state.multiple && Array.isArray(value)}
        <!-- 
          Render the selected (multiple) items.
          We use `Array.isArray(value)` for narrowing the type of `value` to `Item[]`.
        -->
        <SquareStack class="mr-1 inline text-fuchsia-500" />
        <span class="min-w-0 flex-1 truncate">
          {value.map((v: Item) => v.label).join(", ")}
        </span>
      {:else}
        <!-- 
          Select is in single mode.
        -->
        <div class="flex items-center gap-2 text-slate-400">
          {#if "icon" in value}
            <value.icon class={value.color} />
          {/if}
          <span class={"color" in value ? value.color : ""}>
            {"label" in value ? value.label : ""}
          </span>
        </div>
      {/if}
    {:else}
      <!-- 
        Nothing is selected (`value` is falsey), render a placeholder.
      -->
      <div class="flex items-center gap-2 text-slate-400">
        <ChefHat class="text-fuchsia-500" />
        <span>
          <!-- 
            Render the placeholder if it is defined in the configuration. Otherwise,
            render a default placeholder.

            The ternary can be omitted if you are passing a value to `placeholder` (this 
            is just for the demo).
          -->
          {state.placeholder ?? "Select an option.."}

          <!-- {state.placeholder} -->
        </span>
      </div>
    {/if}
    <!-- 
      Render the down arrow icon for the trigger button.
    -->
    <ChevronDown class="size-3.5" />
  </div>
{/snippet}

<!--
  This is a snippet that is used to render the item for the select component.
  It is passed to the `item` property of the select configuration object.

  @param value - The value of the item.
-->
{#snippet item(value: Item)}
  <div class="flex items-center gap-2 text-slate-400">
    <value.icon class={value.color} />
    <span class={value.color}>{value.label}</span>
  </div>
{/snippet}

<!--
  This is a snippet that is used to dump the value of the selected items.

  @param value - The value of the select instance.
-->
{#snippet dump(value?: Item | Item[])}
  <!-- 
    If the value is defined, render the selected items and the JSON representation of the value.
    Otherwise, render a message saying that nothing is selected.
  -->
  <div class="max-h-40 space-y-1 overflow-y-auto pr-2">
    {#if value}
      <p class="text-sm text-slate-600">Current Value:</p>
      <pre
        class="overflow-x-auto rounded-md border border-zinc-800 bg-zinc-900/65 p-2 text-xs text-emerald-600">{JSON.stringify(
          value,
          null,
          2
        )}</pre>
    {:else}
      <p class="flex items-center gap-1 text-sm text-slate-600">
        Current Value:
        <Badge intent="outline" size="xs" class="font-mono text-zinc-600">undefined</Badge>
      </p>
    {/if}
  </div>
{/snippet}

<Demo.Root
  title="Imperative Select API"
  description="Create Select components programmatically using configuration objects instead of declarative templates. This API is perfect for building dynamic interfaces where the select structure comes from backend data or needs to be shared across multiple locations.">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <!-- Basic Imperative Select -->
    <Demo.Section
      title="Basic Imperative Select"
      description="Define a simple select using a configuration object. It's as simple as calling the `createSelectInstance` function."
      class="flex h-50 flex-col gap-4">
      <Demo.WithButton
        bind:ref={basic}
        disabled={instances.basic?.instance.value === undefined}
        onclick={() => {
          if (instances.basic) {
            instances.basic.instance.value = undefined;
          }
        }}>
      </Demo.WithButton>
      {@render dump(instances.basic?.instance.value)}
    </Demo.Section>

    <!-- Grouped Select with Nested Structure -->
    <Demo.Section
      title="Grouped Select with Nested Structure"
      description="Create complex hierarchical select structures with groups, labels, and separators."
      class="flex h-50 flex-col gap-4">
      <Demo.WithButton
        bind:ref={grouped}
        disabled={instances.grouped?.instance.value === undefined}
        onclick={() => {
          if (instances.grouped) {
            instances.grouped.instance.value = undefined;
          }
        }}>
      </Demo.WithButton>
      {@render dump(instances.grouped?.instance.value)}
    </Demo.Section>

    <!-- Multiple Selection -->
    <Demo.Section
      title="Multiple Selection"
      description="Enable multi-select mode through with a single flag. Values are automagically propagated both ways."
      class="flex h-50 flex-col gap-4">
      <Demo.WithButton
        bind:ref={multiple}
        disabled={instances.multiple?.instance.value instanceof Array &&
          instances.multiple.instance.value.length === 0}
        onclick={() => {
          if (instances.multiple) {
            instances.multiple.instance.value = [];
          }
        }}>
      </Demo.WithButton>
      {@render dump(instances.multiple?.instance.value)}
    </Demo.Section>

    <!-- Dynamic Configuration -->
    <Demo.Section
      title="Dynamic Configuration Example"
      description="You can programmatically control the values and other properties of the select in real-time."
      class="flex h-50 flex-col gap-4">
      <Demo.WithButton
        bind:ref={dynamic}
        disabled={instances.dynamic?.instance.value === undefined}
        onclick={() => {
          if (instances.dynamic) {
            instances.dynamic.instance.value = undefined;
          }
        }}>
        <Button
          intent="outline"
          effect="press"
          class="w-22"
          onclick={() => {
            if (instances.dynamic?.started) {
              instances.dynamic.stop?.();
            } else {
              instances.dynamic?.start?.();
            }
          }}>
          {#if instances.dynamic?.started}
            <span class="flex items-center gap-1 text-pink-500">
              <TimerOff class="size-3.5" />
              Stop
            </span>
          {:else}
            <span class="flex items-center gap-1 text-green-500">
              <Timer class="size-3.5" />
              Start
            </span>
          {/if}
        </Button>
      </Demo.WithButton>
      {@render dump(instances.dynamic?.instance.value)}
    </Demo.Section>
  </div>
</Demo.Root>
