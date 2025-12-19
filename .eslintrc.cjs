/**
 * Legacy ESLint config (pre v9).
 *
 * This repo uses ESLint v9+, which reads configuration from `eslint.config.js`
 * (Flat Config). This file is kept only for reference and is NOT used by the
 * `npm run lint` script.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**', 'coverage/**'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // This repo still has some legacy TS/Express patterns – keep lint practical.
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs'],
      parserOptions: { sourceType: 'script' },
    },
  ],
}
