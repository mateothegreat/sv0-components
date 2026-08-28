/**
 * @file Individual component page load function that fetches the component route data based on the
 *   group and component parameters.
 */

import { error } from "@sveltejs/kit";
import { routes } from "../../../../components/routes/routes.svelte";
import type { PageLoad } from "./$types";

/**
 * Loads individual component demo data for the component page. This handles URLs like
 * `/components/content/headline` to show the specific component demo.
 *
 * @param params -Contains the group and component parameters from the URL.
 *
 * @returns Promise resolving to page data with the component route information.
 *
 * @example
 *
 * - URL: /components/display/popover
 * - Params.group: "display", Params.component: "popover"
 * - Returns: { group: RouteGroup, component: RouteComponent }
 */
export const load: PageLoad = async ({ params }) => {
  try {
    const group = routes.find((route) => route.path === params.group);

    if (!group) {
      throw error(404, {
        message: "Group not found"
      });
    }

    const component = group.components?.find((comp) => comp.path === params.component);

    if (!component) {
      throw error(404, {
        message: "Component not found"
      });
    }

    return {
      group: group,
      component: component
    };
  } catch (err) {
    console.error("Error loading component:", err);
    throw error(500, {
      message: "Failed to load component"
    });
  }
};

/**
 * Disable prerendering for dynamic client-side routing.
 */
export const prerender = false;
