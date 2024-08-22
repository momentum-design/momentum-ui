module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "@wxcc-desktop/eslint-plugin-no-blocked-words-plugin"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/camelcase": "off",
    "@wxcc-desktop/no-blocked-words-plugin/no-blocked-words": [
      "error",
      ["master", "slave", "dummy", "whitelist", "blacklist"]
    ]
  }
};
