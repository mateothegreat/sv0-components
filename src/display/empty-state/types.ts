/**
 * @file
 *
 *   This module provides type definitions for the EmptyState component.
 *
 *   The EmptyState component displays a placeholder when there's no content to show, typically used for onboarding experiences, empty search
 *   results, or initial setup flows. It provides an intuitive way to guide users toward their next action with visually appealing options.
 *
 *   ## Core Concepts
 *
 *   1. **Option Cards:** Interactive cards that present different paths or actions users can take.
 *   2. **Visual Hierarchy:** Clear title, description, and organized options to guide user attention.
 *   3. **Flexibility:** Customizable icons, colors, and actions for each option card.
 */

/**
 * Represents a single option card within the EmptyState component. Each option provides a distinct path or action the user can take,
 * complete with visual elements and interaction handlers.
 *
 * @example
 *
 * ```ts
 * const marketingOption: EmptyStateOption = {
 *   id: 'marketing',
 *   title: 'Marketing Campaign',
 *   description: 'Plan and launch engaging campaigns to reach your audience.',
 *   icon: '<svg>...</svg>',
 *   iconColor: 'bg-pink-500',
 *   onClick: () => console.log('Marketing selected')
 * };
 * ```
 *
 * @example
 *
 * ```ts
 * // Option without click handler (navigation handled via links)
 * const eventOption: EmptyStateOption = {
 *   id: 'event',
 *   title: 'Event Planning',
 *   description: 'Organize memorable events from start to finish.',
 *   icon: '<svg>...</svg>',
 *   iconColor: 'bg-orange-500'
 * };
 * ```
 *
 * @category EmptyState
 */
export interface EmptyStateOption {
  /**
   * Unique identifier for the option. Used as the key in list rendering and for tracking user interactions.
   *
   * @category EmptyState
   */
  id: string;

  /**
   * The primary heading text displayed for this option. Should be concise and action-oriented.
   *
   * @category EmptyState
   */
  title: string;

  /**
   * Supporting text that provides more context about what this option offers. Helps users understand the value or purpose of selecting this
   * option.
   *
   * @category EmptyState
   */
  description: string;

  /**
   * SVG markup string for the icon displayed with this option. The icon should be properly formatted SVG that can be rendered using {@html}
   * directive in Svelte.
   *
   * @category EmptyState
   */
  icon: string;

  /**
   * Tailwind CSS background color class for the icon container. Should be a valid Tailwind color utility class (e.g., 'bg-pink-500',
   * 'bg-purple-500').
   *
   * @category EmptyState
   */
  iconColor: string;

  /**
   * Optional click handler function called when the option is selected. If not provided, the option will still be interactive but won't
   * trigger any action.
   *
   * @category EmptyState
   */
  onClick?: () => void;
}

/**
 * Props interface for the EmptyState component. Defines all the configuration needed to render an empty state with actionable options.
 *
 * @example
 *
 * ```ts
 * const emptyStateProps: EmptyStateProps = {
 *   title: 'Create your first project',
 *   description: 'Start by selecting a template or begin with a blank canvas.',
 *   options: [marketingOption, engineeringOption, eventOption],
 *   emptyProjectHref: '/new-project',
 *   emptyProjectText: 'or start from scratch'
 * };
 * ```
 *
 * @example
 *
 * ```ts
 * // Minimal configuration with defaults
 * const minimalProps: EmptyStateProps = {
 *   title: 'No results found',
 *   description: 'Try adjusting your search criteria.',
 *   options: []
 * };
 * ```
 *
 * @category EmptyState
 */
export interface EmptyStateProps {
  /**
   * The main heading displayed at the top of the empty state. Should clearly communicate the current state or what action is needed.
   *
   * @category EmptyState
   */
  title: string;

  /**
   * Supporting text below the title that provides additional context or instructions. Helps users understand why they're seeing this state
   * and what they can do next.
   *
   * @category EmptyState
   */
  description: string;

  /**
   * Array of option cards to display. Each option represents a different path or action the user can take. Options are rendered in the
   * order provided.
   *
   * @category EmptyState
   */
  options: EmptyStateOption[];

  /**
   * Optional href for the "empty project" link displayed below the options. Defaults to "#" if not provided. Use this for providing an
   * alternative path for users.
   *
   * @category EmptyState
   */
  emptyProjectHref?: string;

  /**
   * Optional text for the "empty project" link. Defaults to "or start from an empty project" if not provided. Customize this to match your
   * application's terminology.
   *
   * @category EmptyState
   */
  emptyProjectText?: string;
}
