module.exports = {
  "env": {
    "es2021": true,
    "node": true,
  },
  "extends": [
    "google",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "rules": {
    "quotes": ["error", "double"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "require-jsdoc": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "new-cap": "warn",
  },
};
