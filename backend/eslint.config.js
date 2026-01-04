import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Complexity rules
      'complexity': ['error', 15],
      'max-depth': ['error', 4],
      'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-params': ['error', 5],
      'max-nested-callbacks': ['error', 3],

      // TypeScript-specific
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      // Fastify plugins often need to be async even without await
      '@typescript-eslint/require-await': 'off',

      // Code style
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
    },
  },
  // Test files can be longer and use any types
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Support plugin has empty interface (template code)
  {
    files: ['**/plugins/support.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  // Routes with helper functions need relaxed any rules
  {
    files: ['**/routes/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', '*.js', 'eslint.config.js'],
  }
)
