import js from "@eslint/js";
import eslintPluginNoBlockedWordsPlugin from "@wxcc-desktop/eslint-plugin-no-blocked-words-plugin";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "coverage/",
      "build/",
      "dist/",
      "publish/",
      "publish.auth.js",
      ".out/",
      "publish-conf.js"
    ]
  },

  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      parser: tseslint.parser
    },
    plugins: { js, tseslint, prettier, "@wxcc-desktop/no-blocked-words-plugin": eslintPluginNoBlockedWordsPlugin },
    extends: [js.configs.recommended, tseslint.configs.recommended, tseslint.configs.eslintRecommended],
    rules: {
      "linebreak-style": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: false          
        }
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-function": "error"
    }
  }
]);
