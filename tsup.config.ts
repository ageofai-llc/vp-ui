import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".js" : ".mjs",
    }
  },
  banner: {
    js: '"use client";',
  },
});
