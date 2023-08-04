import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    build: {
      target: "ESNext",
      outDir: "lib",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: ["vitest"],
      },
      minify: false,
    },
  }
})
