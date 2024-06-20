module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      'typescript': true
    }
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],

    'import/prefer-default-export': 'off',

    '@typescript-eslint/consistent-type-imports': 'error',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'args': 'all',
        'argsIgnorePattern': '^_',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }
    ],

    'sort-imports': [
      'error',
      {
        'ignoreCase': true,
        'ignoreDeclarationSort': true
      }
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: [],

        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },

        groups: [
          ['builtin', 'external'],
          'type',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object'
        ],

        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@backend/**',
            group: 'internal'
          },
          {
            pattern: '@frontend/**',
            group: 'internal'
          },
          {
            pattern: '{.,..}/**/*.scss',
            group: 'object',
            position: 'after',
          }
        ]
      }
    ]
  }
};