module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/ignore': ['react-native'],
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: { '@': './' },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.native.ts'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
