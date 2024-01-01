import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    pure: ["console.log"], // 删除 console.log
    drop: ["debugger"], // 删除 debugger
  },
});
