const ignoreAllButTheseModules =
  "/node_modules/(?!" +
  "(@open-wc|" +
  "lit-element|" +
  "lit-html|" +
  "lit-virtualizer|" +
  "nanoid|" +
  "query-selector-shadow-dom|" +
  "@popperjs|" +
  "@interactjs|" +
  "luxon)" +
  ").*\\.js$";

/* eslint-disable */
module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/src/tsconfig.json"
      }
    ],
    "^.+\\.js$": "babel-jest",
    "\\.(png|jpg|jpeg)$": "<rootDir>/jest/imgTransform.js",
    "\\.svg$": "<rootDir>/jest/svgTransform.js",
    "\\.(scss)$": "<rootDir>/jest/cssTransform.js"
  },
  testRegex: "^.+\\.test\\.ts$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/dist/",
    "/publish/",
    "/coverage/",
    "/stats",
    "/src/components/sass-stats/"
  ],
  transformIgnorePatterns: [ignoreAllButTheseModules],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@css/(.*)$": "<rootDir>/src/assets/styles/$1",
    "^@img/(.*)$": "<rootDir>/src/assets/images/$1"
  }
};
