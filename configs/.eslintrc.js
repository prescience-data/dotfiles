require("@rushstack/eslint-config/patch/modern-module-resolution")

module.exports = {
  extends: [
    "@rushstack/eslint-config/profile/node",
    "@rushstack/eslint-config/mixins/friendly-locals",
  ],
  plugins: ["simple-import-sort"],
  ignorePatterns: ["*.js", "*.json", "*.d.ts", "*.map", "lib", "bin", "test"],
  rules: {
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-require-imports": "error",
    "import/order": "off",
    "no-duplicate-imports": "off",
    "no-return-await": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-imports": "off",
  },
  overrides: [
    {
      files: ["**/dist/*.ts"],
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
      },
    },
    {
      files: ["**/schemas/*.ts", "**/schemas.ts", "**/*schema.ts"],
      rules: {
        "@typescript-eslint/typedef": "off",
      },
    },
  ],
}
