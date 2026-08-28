import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    themePreference: cookies.get("theme-preference") ?? "base"
  };
};
