import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // "/api": {
      //   target:"http://127.0.0.1:4523/m1/4633956-4284432-default",
      //   target: "http://127.0.0.1:5000", //接口地址
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     const newPath = path.replace(/^\/api/, "/api");
      //     console.log(`Rewriting path from ${path} to ${newPath}`);
      //     return newPath;
      //   },
      //   },
      "/predict": {
        target: "http://127.0.0.1:6000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/predict/, ""),
      },
      "/get-title": {
        // target:"http://127.0.0.1:4523/m1/4633956-4284432-default",
        target: "http://127.0.0.1:7000",
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          console.log("Request URL:", req.url);
        },
        pathRewrite: {
          "^/get-title": "/get-title",
        },
      },
    },
  },
});
