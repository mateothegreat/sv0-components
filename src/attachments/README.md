# Popover Attachment Utility

A robust Svelte 5 attachment utility for positioning floating content relative
to reference elements with automatic collision detection and repositioning.

## Features

- **Precise Positioning**: Position content above, below, left, or right of any
  element
- **Collision Detection**: Automatically repositions when content would overflow
  viewport
- **Alignment Control**: Fine-grained alignment options (start, center, end)
- **Arrow Support**: Optional arrow pointing from popover to reference element
- **Dynamic Updates**: Automatically updates position when reference element
  moves
- **Viewport Awareness**: Maintains padding from screen edges
- **Strategy Options**: Support for both absolute and fixed positioning
- **TypeScript Support**: Full type safety and IntelliSense support

## Installation

The popover attachment is included in the components package:

```typescript
import { popover } from "@sv0/components/attachments";
```

## Basic Usage

```svelte
<script lang="ts">
  import { popover } from "@sv0/components/attachments";

  let triggerElement: HTMLElement;
  let popoverElement: HTMLElement;
  let isOpen = $state(false);

  $effect(() => {
    if (triggerElement && popoverElement && isOpen) {
      return popover(popoverElement, {
        reference: triggerElement
      }).destroy;
    }
  });
</script>

<button bind:this={triggerElement} onclick={() => (isOpen = !isOpen)}>
  Toggle Popover
</button>

{#if isOpen}
  <div bind:this={popoverElement} class="popover">Popover content</div>
{/if}
```

## Advanced Configuration

```svelte
<script lang="ts">
  import { popover } from "@sv0/components/attachments";

  let triggerElement: HTMLElement;
  let popoverElement: HTMLElement;
  let arrowElement: HTMLElement;

  $effect(() => {
    if (triggerElement && popoverElement) {
      return popover(popoverElement, {
        reference: triggerElement,
        side: "top",
        align: "start",
        offset: 12,
        padding: 16,
        arrow: arrowElement,
        strategy: "fixed",
        autoFlip: true,
        autoShift: true
      }).destroy;
    }
  });
</script>
```

## Configuration Options

### `reference: HTMLElement`

The element that the popover will be positioned relative to. Required.

### `side?: 'top' | 'right' | 'bottom' | 'left'`

The side of the reference element where the popover should appear.

- **Default:** `'bottom'`

### `align?: 'start' | 'center' | 'end'`

How to align the popover along the chosen side.

- **Default:** `'center'`

### `offset?: number`

Distance in pixels between the popover and reference element.

- **Default:** `8`

### `padding?: number`

Minimum distance in pixels from viewport edges.

- **Default:** `8`

### `strategy?: 'absolute' | 'fixed'`

CSS positioning strategy to use.

- **Default:** `'absolute'`

### `arrow?: HTMLElement`

Optional arrow element to point from popover to reference.

### `autoFlip?: boolean`

Whether to flip to opposite side when there's more space.

- **Default:** `true`

### `autoShift?: boolean`

Whether to shift along alignment axis to stay in viewport.

- **Default:** `true`

## Styling

The popover element receives a `data-placement` attribute that you can use for
styling:

```css
.popover[data-placement^="top"] {
  /* Styles when positioned above */
}

.popover[data-placement^="bottom"] {
  /* Styles when positioned below */
}

.popover[data-placement="bottom-start"] {
  /* Specific placement styles */
}
```

## Arrow Styling

Style arrows based on their position:

```css
.arrow {
  @apply absolute h-2 w-2 rotate-45 border;
}

.popover[data-placement^="top"] .arrow {
  @apply border-l-0 border-t-0;
}

.popover[data-placement^="bottom"] .arrow {
  @apply border-b-0 border-r-0;
}
```

## Common Patterns

### Dropdown Menu

```svelte
<script lang="ts">
  let isOpen = $state(false);
  let trigger: HTMLElement;
  let menu: HTMLElement;

  $effect(() => {
    if (trigger && menu && isOpen) {
      return popover(menu, {
        reference: trigger,
        side: "bottom",
        align: "start"
      }).destroy;
    }
  });
</script>

<button bind:this={trigger} onclick={() => (isOpen = !isOpen)}> Menu </button>

{#if isOpen}
  <div bind:this={menu} class="menu">
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <a href="/logout">Logout</a>
  </div>
{/if}
```

### Tooltip

```svelte
<script lang="ts">
  let showTooltip = $state(false);
  let trigger: HTMLElement;
  let tooltip: HTMLElement;

  $effect(() => {
    if (trigger && tooltip && showTooltip) {
      return popover(tooltip, {
        reference: trigger,
        side: "top",
        offset: 4
      }).destroy;
    }
  });
</script>

<button
  bind:this={trigger}
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}>
  Hover me
</button>

{#if showTooltip}
  <div bind:this={tooltip} class="tooltip">Helpful information</div>
{/if}
```

### Context Menu

```svelte
<script lang="ts">
  let showMenu = $state(false);
  let menuPosition = $state({ x: 0, y: 0 });
  let menu: HTMLElement;

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    menuPosition = { x: event.clientX, y: event.clientY };
    showMenu = true;
  };

  $effect(() => {
    if (menu && showMenu) {
      // Create virtual reference element at cursor position
      const virtualRef = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: menuPosition.x,
          y: menuPosition.y,
          top: menuPosition.y,
          left: menuPosition.x,
          right: menuPosition.x,
          bottom: menuPosition.y
        })
      };

      return popover(menu, {
        reference: virtualRef as HTMLElement
      }).destroy;
    }
  });
</script>

<div oncontextmenu={handleContextMenu}>Right-click me</div>

{#if showMenu}
  <div bind:this={menu} class="context-menu">
    <button>Copy</button>
    <button>Paste</button>
    <button>Delete</button>
  </div>
{/if}
```

## Best Practices

1. **Always clean up**: Use the returned `destroy` function to clean up when the
   popover is no longer needed.

2. **Handle edge cases**: Check that elements exist before creating the
   attachment.

3. **Responsive design**: Consider different screen sizes when choosing offset
   and padding values.

4. **Accessibility**: Include proper ARIA attributes and keyboard navigation.

5. **Performance**: Use `strategy: 'fixed'` for better performance with
   scrolling containers.

6. **Testing**: The utility includes comprehensive tests and handles edge cases
   gracefully.

## Dependencies

- `@floating-ui/dom` - For positioning calculations
- Svelte 5 - For reactive effects and state management
