/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|@react-native-async-storage|@react-native-community|@reduxjs/toolkit|immer)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // ✅ Usa entorno Node para evitar redefinir `window`
  testEnvironment: "node",

  clearMocks: true,

  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],

  // ❌ elimina gesture-handler setup si lo tenías
  // setupFiles: ["<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
};