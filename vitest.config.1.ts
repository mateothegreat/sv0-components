/**
 * @file
 *
 *   This module configures Vitest for testing the component library with browser-based
 *   testing using vitest-browser-svelte and embedded chromium for accurate component
 *   positioning validation.
 *
 *   The configuration sets up the testing environment with browser mode for real DOM
 *   testing, configures Svelte component testing with screenshot capability, and provides
 *   comprehensive test coverage reporting for the component library.
 *
 *   ## Core Concepts
 *
 *   1. **Browser Environment:** Uses embedded chromium for real browser environment testing.
 *   2. **Svelte Support:** Properly handles Svelte component compilation and testing with
 *        runes.
 *   3. **Screenshot Testing:** Enables visual validation of component positioning and layout.
 *   4. **Coverage Reporting:** Tracks test coverage to ensure comprehensive testing.
 */

import { defineConfig } from "vitest/config";

const excludes = ["node_modules", "tmp"];

export default defineConfig({
  test: {
    // coverage configuration is global
    // coverage: {
    //   provider: "v8",
    //   reporter: ["text", "json", "html"],
    //   exclude: [
    //     "node_modules/",
    //     "demo/",
    //     "*.config.ts",
    //     "*.config.js",
    //     "src/index.ts",
    //     "**/*.d.ts",
    //     "**/*.test.ts",
    //     "**/*.type.test.ts"
    //   ]
    // },
    projects: [
      {
        test: {
          name: "ts",
          globals: true,
          environment: "node",
          include: ["./src/forms/select/styleset.types.test.ts"],
          exclude: excludes,

          typecheck: {
            enabled: true,
            include: ["./src/forms/select/styleset.types.test.ts"],
            exclude: excludes
          }
        }
      }
      // {
      //   plugins: [svelte()],
      //   test: {
      //     name: "browser",
      //     globals: true,
      //     environment: "browser",
      //     browser: {
      //       enabled: true,
      //       provider: "playwright",
      //       instances: [
      //         {
      //           browser: "chromium",
      //           css: true,
      //           headless: false,
      //           screenshotDirectory: "./screenshots",
      //           screenshotFailures: true,
      //           logHeapUsage: true,
      //           includeTaskLocation: true,
      //           printConsoleTrace: true,
      //           viewport: {
      //             width: 1280,
      //             height: 720
      //           }
      //         }
      //       ]
      //     },
      //     include: ["src/**/*.test.{ts,svelte.ts}"],
      //     exclude: ["src/**/*.type.test.ts"],
      //     typecheck: {
      //       enabled: true
      //     }
      //   },
      //   resolve: {
      //     conditions: ["browser"]
      //   }
      // }
    ]
  }
});
