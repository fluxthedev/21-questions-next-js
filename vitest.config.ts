import { defineConfig } from"vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    exclude: ["node_modules/**", ".next/**", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/**",
        ".next/**",
        "scripts/**",
        "tests/**",
        "*.config.*",
      ],
    },
    // Defensive fallback: route + db layer tests mock lib/db and lib/mongodb
    // directly, but if a module is ever imported unmocked, this keeps the
    // MongoClient constructor from throwing due to a missing MONGODB_URI.
    env: {
      MONGODB_URI: "mongodb://127.0.0.1:27017",
      MONGODB_DB: "twenty_one_questions_test",
    },
  },
});