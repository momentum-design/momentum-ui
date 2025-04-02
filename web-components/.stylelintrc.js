/* eslint-disable no-undef */
module.exports = {
  plugins: ["stylelint-prettier"],
  extends: ["stylelint-config-sass-guidelines"],
  rules: {
    "string-quotes": "double",
    "max-nesting-depth": 5,
    "selector-class-pattern": null,
    "scss/at-import-partial-extension-blacklist": null,
    "declaration-property-value-disallowed-list": {
      border: ["none"]
    },
    "scss/dollar-variable-pattern": null
  }
};
