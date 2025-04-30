import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import studio from "@sanity/eslint-config-studio";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react: react,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "error", // Added missing rule
      "react-hooks/exhaustive-deps": "warn", // Added missing rule
      "@next/next/no-img-element": "off", // Disabling since the rule definition wasn't found
      "@next/next/no-page-custom-font": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ...studio,
]);
