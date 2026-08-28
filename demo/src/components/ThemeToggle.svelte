<!--
@file

  Theme toggle component for switching between light and dark modes.

  This component provides a toggle button for switching between light and dark
  themes. It includes proper accessibility features, keyboard navigation, and
  visual feedback. The component manages theme state and persists user preference
  to localStorage.

  ## Core Concepts

  1. **Theme State Management:** Tracks current theme and provides toggle functionality.
  2. **Persistence:** Saves user preference to localStorage for consistent experience.
  3. **Accessibility:** Full keyboard support with proper ARIA labels and states.
-->

<script lang="ts">
  import { Button } from "@sv0/components/button";
  import { onMount } from "svelte";

  /**
   * Current theme state. Manages light/dark mode switching with proper state management.
   */
  let theme = $state<"light" | "dark">("light");

  /**
   * Indicates whether the component has been mounted and is ready for theme operations.
   */
  let mounted = $state(false);

  /**
   * Toggle between light and dark themes. Updates document class, localStorage, and component state
   * to ensure consistent theming across the application.
   */
  function toggleTheme(): void {
    const newTheme = theme === "light" ? "dark" : "light";
    theme = newTheme;

    // Update document class for CSS theme switching
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Persist theme preference
    localStorage.setItem("theme", newTheme);
  }

  /**
   * Initialize theme on component mount. Reads from localStorage and system preference to determine
   * initial theme state.
   */
  onMount(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    theme = savedTheme || (systemPrefersDark ? "dark" : "light");

    // Apply initial theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    mounted = true;

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        theme = e.matches ? "dark" : "light";
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  });
</script>

{#if mounted}
  <Button
    variant="ghost"
    size="sm"
    onclick={toggleTheme}
    aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    class="hover:bg-muted focus-visible:ring-accent-primary relative h-9 w-9 rounded-full p-0 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2">
    <!-- Light mode icon (sun) -->
    <svg
      class="absolute h-5 w-5 transition-all duration-300 ease-in-out {theme === 'dark'
        ? 'scale-0 rotate-90 opacity-0'
        : 'scale-100 rotate-0 opacity-100'}"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      ></path>
    </svg>

    <!-- Dark mode icon (moon) -->
    <svg
      class="absolute h-5 w-5 transition-all duration-300 ease-in-out {theme === 'dark'
        ? 'scale-100 rotate-0 opacity-100'
        : 'scale-0 rotate-90 opacity-0'}"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      ></path>
    </svg>
  </Button>
{:else}
  <!-- Skeleton/placeholder while mounting to prevent layout shift -->
  <div class="bg-muted h-9 w-9 animate-pulse rounded-full" aria-hidden="true"></div>
{/if}
