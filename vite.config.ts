// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // separate vendor chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // increase limit to 1MB if needed
  },
});
