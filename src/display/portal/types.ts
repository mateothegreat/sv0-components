import type { Snippet } from 'svelte';

/**
 * Props for the Portal component
 */
export interface PortalProps {
	/**
	 * The target element or selector where the portal content should be rendered.
	 * Can be a CSS selector string or an HTMLElement.
	 * Defaults to document.body if not provided.
	 */
	target?: string | HTMLElement;

	/**
	 * Whether the portal is disabled. When disabled, content renders in place.
	 * Useful for SSR or conditional portal behavior.
	 */
	disabled?: boolean;

	/**
	 * Content to be portaled
	 */
	children?: Snippet;
}

/**
 * State for managing portal lifecycle
 */
export interface PortalState {
	mounted: boolean;
	targetElement: HTMLElement | null;
	portalContainer: HTMLElement | null;
}
