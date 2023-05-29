require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist'],

  extends: [
    'plugin:import/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],

  /** @type {import('@typescript-eslint/types').ParserOptions & import('eslint').Linter.ParserOptions} */
  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  settings: {
    'import/resolver': {
      /** @type {import('eslint-import-resolver-typescript').TsResolverOptions} */
      typescript: {
        project: ['tsconfig.json'],
      },
      node: true,
    },
    'import/extensions': ['.ts'],
  },

  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },

  overrides: [
    {
      files: '*.cjs',
      env: {
        node: true,
      },
    },
  ],
};
