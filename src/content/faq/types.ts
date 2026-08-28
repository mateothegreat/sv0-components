import type { Snippet } from "svelte";

/**
 * FAQ item data structure
 */
export interface FAQItem {
  /** Unique identifier for the FAQ item */
  id: string;
  /** The question text */
  question: string;
  /** The answer content (can be text or snippet) */
  answer: string | Snippet;
  /** Whether this item is expanded by default */
  defaultExpanded?: boolean;
  /** Optional category/tag for the FAQ item */
  category?: string;
  /** Optional images/media for the expanded content */
  images?: string[];
  /** Optional tags/keywords for the content */
  tags?: string[];
}

/**
 * Props for the FAQ root component
 */
export interface FAQRootProps extends BaseProps {
  /** Array of FAQ items to display */
  items: FAQItem[];
  /** Whether to allow multiple items to be expanded at once */
  allowMultiple?: boolean;
  /** Custom container styling */
  containerClass?: string;
}

/**
 * Props for the FAQ item component
 */
export interface FAQItemProps extends BaseProps {
  /** The FAQ item data */
  item: FAQItem;
  /** Whether this item is currently expanded */
  expanded?: boolean;
  /** Whether to show the numeric index */
  showIndex?: boolean;
  /** The numeric index to display */
  index?: number;
  /** Callback when item is toggled */
  onToggle?: () => void;
}

/**
 * Props for the FAQ content component
 */
export interface FAQContentProps extends BaseProps {
  /** The answer content */
  content: string | Snippet;
  /** Optional images to display */
  images?: string[];
  /** Optional tags to display */
  tags?: string[];
  /** Whether the content is expanded/visible */
  expanded: boolean;
}

/**
 * Base props that extend HTML attributes
 */
export interface BaseProps {
  class?: string;
  [key: string]: unknown;
}
