import BlogFeaturesDemo from "@sv0/components/content/blog/features/demo.svelte";
import BlogListDemo from "@sv0/components/content/blog/list/demo.svelte";
import BlogListingDemo from "@sv0/components/content/blog/listing/demo.svelte";
import BlogPostDemo from "@sv0/components/content/blog/post/demo.svelte";
import FAQDemo from "@sv0/components/content/faq/demo.svelte";
import HeadlineDemo from "@sv0/components/content/headline/demo.svelte";
import EmptyStateDemo from "@sv0/components/display/empty-state/demo.svelte";
import TagDemo from "@sv0/components/display/tag/demo.svelte";
import AccordionDemo from "@sv0/components/interactives/accordion/demo.svelte";

import { BookMarked } from "@lucide/svelte";
import type { RouteGroup } from "./routes.svelte";

export const nav: RouteGroup = {
  label: "Content",
  path: "content",
  icon: BookMarked,
  components: [
    {
      label: "Headline",
      path: "headline",
      component: HeadlineDemo
    },
    {
      label: "FAQ",
      path: "faq",
      component: FAQDemo
    },
    {
      label: "Accordion",
      path: "accordion",
      component: AccordionDemo
    },
    {
      type: "separator"
    },
    {
      label: "Blog List",
      path: "blog/list",
      component: BlogListDemo
    },
    {
      label: "Blog Listing",
      path: "blog/listing",
      component: BlogListingDemo
    },
    {
      label: "Blog Features",
      path: "blog/features",
      component: BlogFeaturesDemo
    },
    {
      label: "Blog Post",
      path: "blog/post",
      component: BlogPostDemo
    },
    {
      label: "Tag",
      path: "tag",
      component: TagDemo
    },
    {
      type: "separator"
    },
    {
      label: "Empty State",
      path: "empty-state",
      component: EmptyStateDemo
    }
  ]
};
