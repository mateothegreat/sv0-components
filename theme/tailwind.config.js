import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import debugScreens from "tailwindcss-debug-screens";

/**
 * Traverse filesystem to find closest node_modules directory.
 *
 * @param startPath - The path to start the search from.
 *
 * @returns The path to the closest node_modules directory, or null if not found.
 */
const findClosestNodeModules = (startPath) => {
  let currentPath = startPath;
  while (currentPath !== resolve(currentPath, "..")) {
    const nodeModulesPath = resolve(currentPath, "node_modules");
    if (existsSync(nodeModulesPath)) return nodeModulesPath;
    currentPath = resolve(currentPath, "..");
  }
  return null;
};

export const TailwindPlugins = {
  debugScreens: (overrides = {}) =>
    debugScreens({
      classname: overrides?.classname || "debug-screens",
      position: overrides?.position || "bottom, right",
      prefix: overrides?.prefix || "screen breakpoint: "
    })
};

export const tailwindConfig = (plugins, config = {}) => {
  const loadedPlugins = process.env.NODE_ENV === "development" ? plugins : [];

  const _config = {
    ...config,
    content: [
      `${findClosestNodeModules(cwd())}/@sv0/components/src/**/*.{svelte,ts}`,
      ...(config?.content || [])
    ],
    plugins: loadedPlugins.map((plugin) => plugin())
  };

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[@sv0/components/theme/tailwind.config.js] tailwind config compiled (plugins: ${plugins.length}):\n\n`,
      _config
    );
  }

  return _config;
};
