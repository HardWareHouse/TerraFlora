import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // port: 5173,
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: [
      "chunk-IH3QLC44.js?v=36a8aa14", // Replace with the name of the problematic module
      // Add more modules if needed
    ],
  },
});
