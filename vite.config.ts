import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig, UserConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss(), dts({ rollupTypes: true })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@oasisprotocol/ui-library",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
} satisfies UserConfig);
