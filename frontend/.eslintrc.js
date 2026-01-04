module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'script',
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Complexity rules
    'complexity': ['error', 15],
    'max-depth': ['error', 4],
    'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', 5],
    'max-nested-callbacks': ['error', 3],

    // Code style
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],

    // Best practices
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-implicit-globals': 'error',
  },
  ignorePatterns: ['node_modules'],
}
