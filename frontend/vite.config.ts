import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const repoBase = "/cygent-fullstack--exec-67872827/";

export default defineConfig({
  plugins: [react()],
  base: process.env["NODE_ENV"] === "production" ? repoBase : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
