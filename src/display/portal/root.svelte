<script lang="ts">
	import type { PortalProps } from './types.js';

	let {
		target,
		disabled = false,
		children
	}: PortalProps = $props();

	// Portal container element that we bind to
	let portalContainer: HTMLElement | undefined = $state();
	let targetElement = $state<HTMLElement | null>(null);
	let observer: MutationObserver | null = null;

	/**
	 * Resolves the target element from a selector or HTMLElement
	 */
	function resolveTarget(target: string | HTMLElement | undefined): HTMLElement | null {
		// SSR guard
		if (typeof document === 'undefined') {
			return null;
		}

		// Default to document.body
		if (!target) {
			return document.body;
		}

		// If target is already an HTMLElement
		if (target instanceof HTMLElement) {
			return target;
		}

		// If target is a selector string
		try {
			const element = document.querySelector<HTMLElement>(target);
			if (!element) {
				console.warn(`Portal: Target element "${target}" not found`);
				return document.body; // Fallback to body
			}
			return element;
		} catch (error) {
			console.error(`Portal: Invalid selector "${target}"`, error);
			return document.body; // Fallback to body
		}
	}

	/**
	 * Effect to move portal container to target
	 */
	$effect(() => {
		// Skip if disabled, SSR, or container not yet mounted
		if (disabled || typeof document === 'undefined' || !portalContainer) {
			return;
		}

		// Resolve the target element
		const resolved = resolveTarget(target);
		if (!resolved) {
			return;
		}

		targetElement = resolved;

		// Move the portal container to the target
		resolved.appendChild(portalContainer);

		// Cleanup function
		return () => {
			// Disconnect observer first to prevent race conditions
			if (observer) {
				observer.disconnect();
				observer = null;
			}

			// Then remove the portal container from the DOM
			if (portalContainer && portalContainer.parentNode) {
				portalContainer.parentNode.removeChild(portalContainer);
			}
			targetElement = null;
		};
	});

	/**
	 * Observer to detect if target element is removed from DOM
	 */
	$effect(() => {
		if (!targetElement || !portalContainer || typeof MutationObserver === 'undefined') {
			return;
		}

		// Capture the current target and portal in closure
		const currentTarget = targetElement;
		const currentPortal = portalContainer;

		observer = new MutationObserver(() => {
			// Only proceed if this observer is still active and the target/portal haven't changed
			if (!observer || targetElement !== currentTarget || portalContainer !== currentPortal) {
				return;
			}

			// Check if target element is still in the DOM
			if (currentTarget && !document.body.contains(currentTarget)) {
				console.warn('Portal: Target element was removed from DOM');
				// If portal container exists but is not in the DOM, append to body
				// This happens when the target is removed along with its children
				if (currentPortal) {
					// Check if portal is not in DOM at all or if it's not a child of body
					if (
						!document.body.contains(currentPortal) ||
						currentPortal.parentNode !== document.body
					) {
						document.body.appendChild(currentPortal);
					}
				}
			}
		});

		// Observe the entire document for removals
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		};
	});
</script>

{#if disabled}
	<!-- Render in place when disabled (e.g., during SSR) -->
	{#if children}
		{@render children()}
	{/if}
{:else}
	<!-- Portal container that will be moved to target -->
	<div bind:this={portalContainer} data-portal="true" style="display: contents;">
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
