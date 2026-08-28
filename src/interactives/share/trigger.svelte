<script lang="ts">
  import { Share2 } from "@lucide/svelte";
  import { Dialog } from "@sv0/components/interactives/dialog";
  import type { Snippet } from "svelte";

  /**
   * Share trigger button props
   */
  interface Props {
    /** Button variant */
    variant?: "default" | "outline" | "ghost";
    /** Button size */
    size?: "sm" | "md" | "lg";
    /** Custom class names */
    class?: string;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Button children */
    children?: Snippet;
  }

  let {
    variant = "default",
    size = "md",
    class: className = "",
    disabled = false,
    children
  }: Props = $props();

  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg"
  };
</script>

<Dialog.Trigger
  {disabled}
  class="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {variants[
    variant
  ]} {sizes[size]} {className}">
  <Share2 class="h-4 w-4" />
  {#if children}
    {@render children()}
  {:else}
    Share
  {/if}
</Dialog.Trigger>
