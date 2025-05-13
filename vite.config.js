import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },
  define: {
    __LOCAL__: process.argv.includes("--localhost"),
    __USE_FULL_PATH__: process.argv.includes("--full-path"),
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        toplevel: true,
      },
    },
  },
});
