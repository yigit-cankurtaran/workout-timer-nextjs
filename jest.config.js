module.exports = {
  // Other Jest configurations...
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // If you're using TypeScript, you might also need to specify the module file extensions Jest should process
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testEnvironment: "jsdom",
};
