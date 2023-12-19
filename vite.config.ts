import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { terser } from "rollup-plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        terser({
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        }),
      ],
    },
  },
});
