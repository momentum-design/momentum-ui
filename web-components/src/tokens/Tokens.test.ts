/* eslint-disable @typescript-eslint/no-require-imports */
const TokenImports = require("./tokenImports.js");
const mdButtonTokens = require("./tokenImports.js");

describe("Token Imports", () => {
  test("Module Import is Not Null", () => {
    expect(mdButtonTokens).not.toBeNull();
  });
  test("Token array is not empty", () => {
    expect(TokenImports.length).toBeGreaterThan(0);
  });
});
