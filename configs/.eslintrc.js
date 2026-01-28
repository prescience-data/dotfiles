import { FlatCompat } from "@eslint/eslintrc"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettier from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unicorn from "eslint-plugin-unicorn"

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
  recommendedConfig: prettier.configs.recommended
})

export default [
  {
    files: ["**/*.ts", "**/*.js", "**/*.json"],
    ignores: ["node_modules/", "dist/"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
      unicorn
    },
    rules: {
      "prettier/prettier": "error",
      "unicorn/better-regex": "error",
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "no-trailing-spaces": ["error"],
      "simple-import-sort/imports": "error", // Automatically sort imports
      "simple-import-sort/exports": "error", // Automatically sort exports
      "array-bracket-spacing": ["error", "always"], // Enforce spaces inside array brackets
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true
        }
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "function" }, // Before functions
        { blankLine: "always", prev: "function", next: "*" }, // After functions
        { blankLine: "always", prev: "*", next: "export" }, // Before exports
        { blankLine: "always", prev: "export", next: "*" } // After exports
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1, // Maximum 1 empty line allowed
          maxEOF: 1, // Maximum 1 empty line at end of file
          maxBOF: 0 // No empty lines at the beginning of file
        }
      ]
    }
  },
  {
    files: ["protocol.d.ts"],
    rules: {
      "@typescript-eslint/prefer-namespace-keyword": "off"
    }
  },
  {
    files: ["index.ts", "**/index.ts"], // Override for index.ts files
    rules: {
      "padding-line-between-statements": "off" // Disable this rule for index.ts
    }
  },
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off" // Allow any
    }
  },
  {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ]
  }
]
