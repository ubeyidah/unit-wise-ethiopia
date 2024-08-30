import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/api", // The backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove /api prefix
      },
    },
  },
});
