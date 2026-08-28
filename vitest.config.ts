import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    server: { deps: { inline: [/@lucide\/svelte/] } },
    projects: [
      {
        root: __dirname,
        test: {
          name: "ts",
          environment: "node",
          include: ["src/**/*.types.test.ts"],
          typecheck: {
            enabled: true,
            include: ["src/**/*.types.test.ts"],
            tsconfig: "tsconfig.test.json"
          }
        }
      },
      {
        root: __dirname,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.types.test.ts"]
        }
      }
    ]
  }
});
