/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // allows using `test()` and `expect()` without import
    environment: "jsdom",  // simulates browser environment for React
    setupFiles: "./src/setupTests.ts", // optional, for global jest-dom
  },
});

