import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import sonda from "sonda/sveltekit";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    Icons({ compiler: "svelte" }),
    sonda({
      open: true,
      gzip: true,
      brotli: true,
      deep: true,
      sources: true
    })
  ],
  resolve: {
    noExternal: ["@sv0/stylesets", "@sv0/components"]
    // alias: {
    //   // "@sv0/components": path.resolve(__dirname, "src/components")
    //   "@sv0/components": "/Users/matthewdavis/workspace/sv0/packages/components/src"
    // }
  },
  build: {
    sourcemap: true,
    // In prod, let Rollup do full tree-shaking
    rollupOptions: {
      output: {
        manualChunks: {
          // Optional: split the big library into its own chunk
          "vendor-biglib": ["@sv0/components"]
        }
      }
    }
  },
  server: {
    port: 5174,
    host: true,
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    // Include your library for pre-bundling in dev
    include: ["@sv0/stylesets"],
    // Exclude if you want Vite to always process the source
    exclude: ["@sv0/components"]
  },
  ssr: {
    // Ensure the library is processed during SSR
    noExternal: ["@sv0/stylesets", "@sv0/components"]
  }
});
