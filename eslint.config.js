// @ts-check

import prettier from 'eslint-config-prettier'
import simpleImport from 'eslint-plugin-simple-import-sort'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import eslint from '@eslint/js'

/**
 * ESLint uses minimatch patterns to determine which files to apply rules to.
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
 * @see https://github.com/isaacs/minimatch?tab=readme-ov-file#features
 */
const FILE_PATTERNS = {
  JAVASCRIPT: '**/*.js',
  TYPESCRIPT: '**/*.ts',
  SVELTE: '**/*.svelte',
  NODE_MODULES: '/node_modules/',
  WEB_BUILD_OUTPUT: 'apps/web/build/',
  WEB_SVELTEKIT_OUTPUT: 'apps/web/.svelte-kit/',
}

/**
 * Enforce import/export order in all source code.
 *
 * Errors/warnings from this plugin are fixable with `--fix`.
 * For example `eslint --fix` will automatically sort all imports/exports.
 */
const importSortConfigs = tsEslint.config({
  files: [FILE_PATTERNS.TYPESCRIPT, FILE_PATTERNS.SVELTE],
  plugins: {
    'simple-import-sort': simpleImport,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
})

/**
 * Configuration that applies to all TypeScript files.
 */
const typescriptConfigs = tsEslint.config(
  tsEslint.configs['base'],
  ...tsEslint.configs['recommended'],
  {
    files: [FILE_PATTERNS.JAVASCRIPT, FILE_PATTERNS.TYPESCRIPT, FILE_PATTERNS.SVELTE],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,

        /**
         * Sometimes the NodeJS namespace might be referenced, e.g. {@link NodeJS.Timeout}
         */
        NodeJS: false,
      },
    },
    rules: {
      // Allow specifying a type as `any`.
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow unused variables if they start with "_". For example: let _unusedVar = 'hello'
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(_|\\$\\$)',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
)

/**
 */
const svelteConfigs = tsEslint.config(svelte.configs.base, svelte.configs.recommended)

/**
 * File patterns to ignore.
 */
const ignoresConfig = tsEslint.config({
  ignores: [
    FILE_PATTERNS.NODE_MODULES,
    FILE_PATTERNS.WEB_SVELTEKIT_OUTPUT,
    FILE_PATTERNS.WEB_BUILD_OUTPUT,
  ],
})

const config = tsEslint.config(
  prettier,
  eslint.configs.recommended,
  tsEslint.configs.eslintRecommended,
  ...tsEslint.configs.recommended,
  ...importSortConfigs,
  ...typescriptConfigs,
  ...svelteConfigs,
  ...svelteConfigs,
  ...ignoresConfig,
)

export default config
