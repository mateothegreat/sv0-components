import { svelte } from "@sveltejs/vite-plugin-svelte";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte(), Icons({ compiler: "svelte" })],
  test: {
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
