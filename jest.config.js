module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "/tests/.*\\.spec\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
