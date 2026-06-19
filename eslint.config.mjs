import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // =========================
  // 共通（すべてのJS）
  // =========================
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: "latest"
    }
  },

  // =========================
  // ブラウザ側（フロント）
  // =========================
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },

  // =========================
  // Node側（サーバー）
  // =========================
  {
    files: ["index.js", "db.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node
      }
    }
  },

  // =========================
  // Prettier競合防止（重要）
  // =========================
  {
    extends: ["prettier"]
  }
]);
