/**
 * @file
 *
 *   This module exports the EmptyState component and its associated types.
 *
 *   The EmptyState component provides a visually appealing way to handle empty states in your application, whether for onboarding, empty
 *   search results, or initial setup scenarios. It guides users toward meaningful actions through interactive option cards.
 *
 *   ## Core Concepts
 *
 *   1. **User Guidance:** Helps users understand what to do when there's no content to display.
 *   2. **Action-Oriented:** Presents clear paths forward through interactive option cards.
 *   3. **Customizable:** Flexible configuration for different empty state scenarios.
 */

import EmptyState from "./empty-state.svelte";

export type { EmptyStateOption, EmptyStateProps } from "./types.js";

export default EmptyState;
