# Component Architecture

## Utilities

| Utility                 | Type       | Description                                                      |
| ----------------------- | ---------- | ---------------------------------------------------------------- |
| `WithChildren`          | `type`     | Defines required children snippet props.                         |
| `WithOptionalChildren`  | `type`     | Defines optional children snippet props.                         |
| `WithClassName`         | `type`     | Transforms class prop to required className prop.                |
| `WithClassNameOptional` | `type`     | Transforms class prop to optional className prop.                |
| `WithProps`             | `type`     | Expands object record type into top-level props.                 |
| `WithSnippets`          | `type`     | Defines snippet props with specific names and parameter types.   |
| `WithVariant`           | `type`     | Defines variant prop with specific name and allowed values.      |
| `WithDataAttrs`         | `type`     | Transforms object type into data attributes with `data-` prefix. |
| `WithAriaAttrs`         | `type`     | Adds optional ARIA attributes based on provided attribute names. |
| `PropsBuilder`          | `class`    | Builder for managing props objects with fluent API.              |
| `usePropsBuilder`       | `function` | Builds props object with transformations using fluent API.       |
| `mergeClassNames`       | `function` | Merges given classes into a single class name.                   |
| `dataAttrs`             | `function` | Filters props object to only include keys starting with `data-`. |

### Example

```ts
<script lang="ts" generics="T">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/util";
  import { getComponentContext } from "./context.svelte";

  type Props = {
    // Allows caller to pass in a name (required).
    name: string;
    // Allows caller to pass in a selected value (optional).
    selected?: T;
    // Allows caller to pass in css class names (optional).
    class?: string;
    // Is passed through via the `...rest` value to the `<div>` element below.
    onclick?: () => void;
    // Allows caller to pass in children snippets (required).
  } & WithChildren;

  // Let the svelte compiler see the props we expect to be passed to the component
  // so type safety kicks in and values are bound.
  let { selected = $bindable<T>(), class: className, ...rest }: Props = $props();

  // Parse the props we really care about safely using the props builder method.
  const built = usePropsBuilder({ class: className, ...rest }).withClassMerge(
    // Merges ours + caller's class names using clsx under the hood
    // and exposes  `className` as a prop thats safe to use in the template (vs. `class`).
    "flex items-center gap-2 text-sm"
  );
</script>

<div class={built.class} {...rest}>
  <!--
    Here we conditionally render the content of the component based on the presence
    of the `children` prop or we render things ourself.
  -->
  {#if built.children}
    <!-- Render the children snippets if they are passed in (exposed via the `children` prop). -->
    {@render built.children()}
  {:else}
    <!-- If no children are passed in, render a default message. -->
    <h1>Hello, {built.name}!</h1>
  {/if}
</div>
```
