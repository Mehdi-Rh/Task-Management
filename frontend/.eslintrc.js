module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
    "react/no-unescaped-entities": "off",
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
