/* eslint-disable */
module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    "\\.(png|jpg|jpeg)$": "<rootDir>/jest/imgTransform.js",
    "\\.svg$": "<rootDir>/jest/svgTransform.js",
    "\\.(scss)$": "<rootDir>/jest/cssTransform.js"
  },
  testRegex: "^.+\\.test\\.ts$",
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/dist/", "/publish/", "/coverage/", "/stats", "/src/components/sass-stats/"],
  transformIgnorePatterns: ["/node_modules/?!(@open-wc).+js$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@css/(.*)$": "<rootDir>/src/assets/styles/$1",
    "^@img/(.*)$": "<rootDir>/src/assets/images/$1"
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsConfig: {
        target: "ES2016",
        module: "esnext",
        moduleResolution: "node",
        allowJs: true,
        strict: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        resolveJsonModule: true
      }
    }
  }
};
