module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "@typescript-eslint/no-var-requires": [0],
    "prettier/prettier": [
      "error",
      {
        printWidth: 220,
        endOfLine: "auto",
      },
    ],
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
};
