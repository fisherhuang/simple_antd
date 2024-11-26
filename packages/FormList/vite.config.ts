import { resolve } from "path";
import { defineConfig } from "vite";
import ReactPlugin from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/base.scss";`,
        silenceDeprecations: ["legacy-js-api"],
        silenceDeprecationsL: ["@import"],
      },
    },
  },

  plugins: [
    ReactPlugin(),
    dts({
      outDir: "dist/types",
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@src": resolve("./src"),
    },
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      "index.ts",
      "index.tsx",
      "index.js",
      "index.jsx",
      "index.d.ts",
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.tsx"),
      formats: ["es"],
    },
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom", "antd", "react/jsx-runtime"],
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
