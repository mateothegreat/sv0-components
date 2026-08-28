<!--
  @file SSR-Safe Themed Card Component

  This component demonstrates the correct way to use @sv0/stylesets with SvelteKit SSR.
  It uses the theme store and creates stylesets lazily to avoid SSR issues.

  ## Key Points:
  - Uses lazy styleset creation
  - Reactive theme changes via $derived
  - No browser APIs at module level
  - SSR-compatible initialization
-->

<script lang="ts">
	import { createThemedStyleSet, themeState } from "$lib/theme-store.svelte";

	let {
		variant = "default",
		size = "md",
		class: className,
		children
	}: {
		variant?: "default" | "primary" | "secondary";
		size?: "sm" | "md" | "lg";
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();

	// Create styleset lazily - safe for SSR
	const styleset = createThemedStyleSet({
		base: "rounded-xl border p-4 shadow-sm transition-colors",
		variants: {
			variant: {
				default: "bg-{color.background} border-{border.primary} text-{color.text}",
				primary: "bg-{color.primary} border-{color.primary} text-white",
				secondary: "bg-{color.surface} border-{border.primary} text-{color.text}"
			},
			size: {
				sm: "p-2 text-sm",
				md: "p-4 text-base",
				lg: "p-6 text-lg"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "md"
		}
	});

	// Derive classes reactively - updates when theme changes
	// Access currentThemeId directly to establish reactivity dependency
	const themeId = $derived(themeState.currentThemeId);
	const classes = $derived(
		styleset(
			{
				variant,
				size,
				theme: themeId
			},
			className
		)
	);
</script>

<div class={classes}>
	{#if children}
		{@render children()}
	{/if}
</div>
