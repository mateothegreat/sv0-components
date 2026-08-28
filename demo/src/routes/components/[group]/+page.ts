/**
 * @file
 *
 *   Component group page load function.
 *
 *   This load function fetches the component group data based on the group parameter. It handles
 *   group loading, 404 errors for non-existent groups, and provides the data needed for the group
 *   overview page showing all components in a group.
 *
 *   ## Core Concepts
 *
 *   1. **Group Loading:** Loads group data based on URL group parameter.
 *   2. **Route Matching:** Matches URL paths with configured routes.
 *   3. **Error Handling:** Proper 404 handling for missing groups.
 *   4. **Overview Display:** Provides data for group overview pages only.
 */

import { error } from "@sveltejs/kit";
import { routes } from "../../../components/routes/routes.svelte";
import type { PageLoad } from "./$types";

/**
 * Loads component group data for the group overview page. This handles URLs like
 * `/components/content` to show an overview of all components in the content group.
 *
 * @param params Contains the group parameter from the URL as a path string.
 *
 * @returns Promise resolving to page data with the group information.
 *
 * @example
 *
 * - URL: /components/content
 * - Params.group: "content"
 * - Returns: { group: RouteGroup, isGroupPage: true }
 *
 * @example
 *
 * - URL: /components/display
 * - Params.group: "display"
 * - Returns: { group: RouteGroup, isGroupPage: true }
 */
export const load: PageLoad = async ({ params, url }) => {
  try {
    const group = routes.find((route) => route.path === params.group);

    if (!group) {
      throw error(404, {
        message: "Group not found"
      });
    }

    // This is always a group overview page.
    return {
      group: group,
      isGroupPage: true
    };
  } catch (err) {
    console.error("Error loading group:", err);
    if (err && typeof err === "object" && "status" in err) {
      throw err;
    }
    throw error(500, {
      message: "Failed to load group"
    });
  }
};
