# Using @sv0/stylesets with SvelteKit SSR

## Overview

The `@sv0/stylesets` library provides dynamic theme management and styling. When using it with SvelteKit's SSR, special considerations are needed to avoid hydration mismatches and ensure proper theme initialization.

## Key SSR Challenges

1. **Module-level side effects**: Code that runs when modules are imported runs on both server and client
2. **Browser-only APIs**: Theme managers may use browser APIs (localStorage, etc.)
3. **Hydration mismatches**: Server and client must render the same initial content
4. **State persistence**: Theme preferences need to persist across page loads

## ❌ Anti-Pattern: Module-Level Initialization

**DO NOT DO THIS** (from `src/navigation/toolbar/styleset.ts`):

```typescript
// ❌ BAD: Side effects at module level
export const themeManager = new ThemeManager([base, dark]);
themeManager.setActiveTheme("base"); // Runs on both server and client!

const currentTheme = themeManager.getActiveTheme();
console.log(currentTheme); // Logs during SSR build
```

### Problems:
- Runs during SSR, potentially accessing browser APIs
- Creates state before component lifecycle
- Can cause hydration mismatches
- Console logs pollute build output

## ✅ Correct Pattern 1: Svelte 5 Runes with Client-Only State

```typescript
// lib/theme-store.svelte.ts
import { browser } from '$app/environment';
import { ThemeManager, createThemeVariant, type ThemeConfig } from '@sv0/stylesets';

// Define themes (safe - no side effects)
export const baseTheme: ThemeConfig = {
  id: 'base',
  name: 'Base Theme',
  darkMode: false,
  tokens: {
    color: {
      primary: 'indigo-600',
      background: 'white',
      text: 'gray-900'
    }
  }
};

export const darkTheme = createThemeVariant(baseTheme, 'dark', {
  id: 'dark',
  name: 'Dark Theme',
  darkMode: true,
  tokens: {
    color: {
      primary: 'yellow-400',
      background: 'black',
      text: 'white'
    }
  }
});

// Lazy initialization - only creates when accessed
let _themeManager: ThemeManager | null = null;

export function getThemeManager(): ThemeManager {
  if (!_themeManager) {
    _themeManager = new ThemeManager([baseTheme, darkTheme]);

    // Only set initial theme on client
    if (browser) {
      const saved = localStorage.getItem('theme-preference');
      _themeManager.setActiveTheme(saved || 'base');
    } else {
      // SSR default
      _themeManager.setActiveTheme('base');
    }
  }
  return _themeManager;
}

// Reactive theme state using Svelte 5 runes
export class ThemeState {
  currentThemeId = $state<string>('base');

  constructor() {
    if (browser) {
      // Initialize from storage on client
      const saved = localStorage.getItem('theme-preference');
      this.currentThemeId = saved || 'base';
    }
  }

  get manager() {
    return getThemeManager();
  }

  get current() {
    return this.manager.getActiveTheme();
  }

  setTheme(themeId: string) {
    this.manager.setActiveTheme(themeId);
    this.currentThemeId = themeId;

    if (browser) {
      localStorage.setItem('theme-preference', themeId);
    }
  }
}

// Export singleton instance
export const themeState = new ThemeState();
```

## ✅ Correct Pattern 2: Component-Level Initialization

```svelte
<!-- components/themed-toolbar.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { createStyleSet } from '@sv0/stylesets';
  import { themeState, getThemeManager } from '$lib/theme-store.svelte';

  let {
    variant = 'default',
    size = 'md',
    class: className,
    children
  } = $props();

  // Create styleset lazily (safe for SSR)
  const styleset = createStyleSet({
    themeManager: getThemeManager(),
    base: 'flex items-center gap-2 rounded-xl',
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg'
      },
      variant: {
        default: 'bg-{color.background} text-{color.text}',
        primary: 'bg-{color.primary} text-white'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  });

  // Derive classes reactively
  const classes = $derived(
    styleset({
      size,
      variant,
      theme: themeState.currentThemeId
    }, className)
  );

  // Client-only initialization
  onMount(() => {
    // Any browser-specific setup here
  });
</script>

<div class={classes}>
  {#if children}
    {@render children()}
  {/if}
</div>
```

## ✅ Correct Pattern 3: Root Layout Setup

```svelte
<!-- routes/+layout.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { themeState } from '$lib/theme-store.svelte';

  let { children } = $props();

  // Apply theme class to document
  $effect(() => {
    if (browser && themeState.currentThemeId) {
      document.documentElement.classList.toggle(
        'dark',
        themeState.current?.darkMode ?? false
      );
    }
  });

  onMount(() => {
    // Any additional client-only initialization
    console.log('Current theme:', themeState.current);
  });
</script>

<div class="app">
  {@render children()}
</div>
```

## ✅ Correct Pattern 4: Theme Toggle Component

```svelte
<!-- components/theme-toggle.svelte -->
<script lang="ts">
  import { themeState } from '$lib/theme-store.svelte';

  function toggleTheme() {
    const newTheme = themeState.currentThemeId === 'base' ? 'dark' : 'base';
    themeState.setTheme(newTheme);
  }

  const isDark = $derived(themeState.current?.darkMode ?? false);
</script>

<button onclick={toggleTheme} aria-label="Toggle theme">
  {isDark ? '🌙' : '☀️'}
</button>
```

## SSR Best Practices Summary

### ✅ DO:
1. **Lazy initialization**: Create theme managers when first accessed
2. **Use `browser` guard**: Check `browser` from `$app/environment`
3. **Use `onMount` or `$effect`**: For client-only code
4. **Consistent defaults**: Same initial state on server and client
5. **Derive classes reactively**: Use `$derived` for dynamic classes
6. **Use Svelte 5 runes**: `$state`, `$derived`, `$effect` for reactivity

### ❌ DON'T:
1. **Module-level side effects**: Avoid code execution during import
2. **Browser APIs in module scope**: No `localStorage`, `document`, etc. at top level
3. **Console logs in modules**: Pollutes build output
4. **Direct DOM manipulation**: Use Svelte's reactive system
5. **Premature initialization**: Don't create instances before they're needed

## Migration Guide

If you have existing code like `src/navigation/toolbar/styleset.ts`, refactor it:

**Before:**
```typescript
export const themeManager = new ThemeManager([base, dark]);
themeManager.setActiveTheme("base");
export const styleset = createStyleSet({ themeManager, ... });
```

**After:**
```typescript
// Export theme configs only
export const baseTheme: ThemeConfig = { ... };
export const darkTheme = createThemeVariant(baseTheme, 'dark', { ... });

// Lazy getter for theme manager
let _themeManager: ThemeManager | null = null;
export function getThemeManager() {
  if (!_themeManager) {
    _themeManager = new ThemeManager([baseTheme, darkTheme]);
  }
  return _themeManager;
}

// Create styleset lazily
export function createToolbarStyleset() {
  return createStyleSet({
    themeManager: getThemeManager(),
    ...
  });
}
```

## Testing

When testing SSR:
```bash
# Build and preview to test SSR
npm run build
npm run preview

# Check for:
# - No hydration warnings in browser console
# - Consistent initial render
# - Proper theme persistence
```

## References

- [SvelteKit Docs: `$app/environment`](https://kit.svelte.dev/docs/modules#$app-environment)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [SvelteKit SSR](https://kit.svelte.dev/docs/appendix#ssr)
