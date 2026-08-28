import type { Post } from "@sv0/components/content/blog/types";
import type { Snippet } from "svelte";

/**
 * Props for the blog listing header component
 */
export interface BlogListingHeaderProps extends BaseProps {
  title?: string | Snippet;
  subtitle?: string | Snippet;
  showReadMoreButton?: boolean;
  readMoreText?: string;
  readMoreHref?: string;
}

/**
 * Props for the blog listing content component
 */
export interface BlogListingContentProps extends BaseProps {
  featuredPost?: Post;
  sidebarPosts?: Post[];
  author?: Snippet;
}

/**
 * Base props that extend HTML attributes
 */
export interface BaseProps {
  class?: string;
  [key: string]: unknown;
}

/**
 * Props for the legacy blog listing component (backward compatibility)
 */
export interface BlogListingProps extends BaseProps {
  title?: string;
  subtitle?: string;
  showReadMoreButton?: boolean;
  readMoreText?: string;
  readMoreHref?: string;
  featuredPost?: Post;
  sidebarPosts?: Post[];
}
