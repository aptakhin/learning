import htmlPlugin from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'

export default [
  {
    files: ['**/*.html'],
    plugins: {
      '@html-eslint': htmlPlugin,
    },
    languageOptions: {
      parser: htmlParser,
    },
    rules: {
      '@html-eslint/require-doctype': 'error',
      '@html-eslint/require-lang': 'error',
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/no-inline-styles': 'off',
      '@html-eslint/require-title': 'error',
      '@html-eslint/no-target-blank': 'error',
    },
  },
  {
    ignores: ['node_modules'],
  },
]
