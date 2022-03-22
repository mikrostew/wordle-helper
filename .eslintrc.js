module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: 'eslint:recommended',
  rules: {
    // single quote strings
    quotes: [2, 'single', { avoidEscape: true }],
    // always require curly braces for if, else, etc.
    curly: [2, 'all'],
    // indent with 2 spaces
    indent: [2, 2],
    // using console is fine
    'no-console': 0,
  },
  overrides: [
    {
      files: [
        '__tests__/**/*test.ts',
      ],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    }
  ],
};
