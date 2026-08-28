# Portal

Highly customizable floating overlay component with trigger and content atoms.
Supports animations via [`usal`](https://github.com/italoalmeida0/usal) and
optional portals for rendering outside normal DOM flow.

> \[!NOTE] This component is a work in progress and is not yet ready for
> production.

## Demos

## Installation

```Shell
npm add sv0 display/portal
```

## Usage

Example usage of this component:

### Template (Declarative, Markup-Driven) Example

```HTML
<script lang="ts">
  import { Popover, type PopoverInstance } from "sv0/display/popover";
  import { Button } from "sv0/display/button";
</script>

<!-- This is the root provider that encapsulates the popover lifecycle. -->
<Popover.Root>

  <!-- This is the trigger that will be used to open the popover. -->
  <Popover.Trigger>
    <Button onclick={(instance: PopoverInstance) => instance.open()}>Open</Button>
  </Popover.Trigger>

  <!-- This is the content that will be rendered inside the popover. -->
  <Popover.Content side="bottom" align="center" portal>
    <div class="rounded-xl border bg-white p-4 shadow-xl">
      <p class="text-sm text-sky-500">Hello from popover!</p>
      <p class="text-pink-500">Clicking anywhere outside the popover will close it..</p>
    </div>
    <Button onclick={(instance: PopoverInstance) => instance.close()}>Close</Button>
  </Popover.Content>

</Popover.Root>
```

### Programmatic (Imperative, API-Driven) Example

```HTML
<script lang="ts">
  import { Popover } from "sv0/display/popover";
  import { Button } from "sv0/display/button";

  /**
   * This allows you to programatically control the popover lifecycle using the api.
   *
   * When you use the api, the popover constructs the atoms internally for you and
   * you can then instrument them through snippets or component references.
   *
   * You can then use the api via the instance reference to further instrument
   * the popover (e.g. when clicking a button to open or close it).
   */
  const open = () => {
    // Create a new popover instance and control it via the reference next.
    const instance = createPopover({
      class: "bg-fuschia-500 text-white text-sm",
    });

    // Close the popover programmatically after 5 seconds no matter what.
    setTimeout(() => {
      instance.close();
    }, 5000);
  };
</script>

<!-- This is the button that will be used to programmatically open the popover. -->
<Button onclick={open}>Open</Button>

<!-- This is the snippet that will be rendered inside the popover. -->
{#snippet content(instance: PopoverInstance)}
  <div class="rounded-xl border bg-white p-4 shadow-xl">
    <p class="text-sm text-sky-500">
      This is a snippet that will be rendered inside the popover.
    </p>
    <p class="text-pink-500">
      I will close automatically after 5 seconds from the outside.
    </p>
    <Button onclick={instance.close}>Close from inside.</Button>
  </div>
{/snippet}
```

## Declarative (Markup-Driven Atom Composition) Reference

This component is composed of these markup-driven atoms:

| Atom                                 | Description                                    | Required |
| ------------------------------------ | ---------------------------------------------- | :------: |
| [`Popover.Root`](#popoverroot)       | Provides context and manages open/close state. |   Yes    |
| [`Popover.Trigger`](#popovertrigger) | Wraps an element that toggles the popover.     |   Yes    |
| [`Popover.Content`](#popovercontent) | The floating content element of the popover.   |          |

### `Popover.Root`

This atom is the root provider of popover state. It manages open/close state and
makes it available to other atoms via context.

| Prop       | Description              | Type                   | Default | Required |
| ---------- | ------------------------ | ---------------------- | ------- | :------: |
| `children` | The children components. | `Component \| Snippet` |         | **Yes**  |
| `open`     | Controlled open state.   | `boolean`              | `false` |          |
| `onOpen`   | Callback when opened.    | `() => void`           |         |          |
| `onClose`  | Callback when closed.    | `() => void`           |         |          |

### `Popover.Trigger`

This atom defines the interactive element that toggles the popover. A slot prop
`toggle` is provided for convenience.

| Prop       | Description             | Type                   | Default | Required |
| ---------- | ----------------------- | ---------------------- | ------- | :------: |
| `children` | The trigger element(s). | `Component \| Snippet` |         | **Yes**  |

### `Popover.Content`

This atom renders the popover content. Supports portals, positioning, and
animations.

| Prop       | Description                                                 | Type                                     | Default    | Required |
| ---------- | ----------------------------------------------------------- | ---------------------------------------- | ---------- | :------: |
| `children` | The content inside the popover.                             | `Component \| Snippet`                   |            | **Yes**  |
| `portal`   | Whether to render via `<svelte:portal>` (escapes stacking). | `boolean`                                | `true`     |          |
| `side`     | Side of the trigger to place the popover.                   | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` |          |
| `align`    | Alignment relative to trigger.                              | `"start" \| "center" \| "end"`           | `"center"` |          |
| `class`    | Additional class names.                                     | `string \| string[]`                     | `""`       |          |
| `motion`   | Transition definition using `usal` (fade, scale, fly, etc). | `TransitionConfig \| TransitionConfig[]` | `fade`     |          |

## Imperative (Programmatic, API-Driven) Reference

### `PopoverInstance`

This type is for defining the shape of the popover instance reference. This
reference allows you to programmatically control the popover lifecycle and other
instrumentation.

```TypeScript
type PopoverState = "open" | "closed";
```

```TypeScript
type PopoverInstance = {
  state: PopoverState;
  open: () => void;
  toggle: () => void;
  close: () => void;
};
```

| Name                  | Description                                                                        |
| --------------------- | ---------------------------------------------------------------------------------- |
| `open(): void`        | Opens the popover.                                                                 |
| `toggle(): void`      | Toggles the popovers visibility.                                                   |
| `close(): void`       | Closes the popover.                                                                |
| `state: PopoverState` | Current state of the popovers visibility (wrapped in a `$state()` rune reference). |

## Best Practices

- **Use portals** when the popover is inside scrollable/overflow-hidden
  containers or when dealing with stacking context/z-index issues.

- **Avoid portals** when the popover must remain constrained to its parent
  container (e.g., table cell overlays).

- **Accessibility**:
  - Use `role="dialog"` or `role="tooltip"` depending on semantics.
  - Ensure Escape key closes the popover.
  - Manage focus when necessary for interactive content.

- **Animations**: Prefer `usal`’s `fade` + `scale` combination for performant
  open/close transitions.

---

Would you like me to also **expand this spec with example animation configs**
(e.g. `fade + scale` transitions using `usal`) so the developer/AI doesn’t have
to guess how to wire it up?
