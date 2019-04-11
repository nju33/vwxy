module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: [
    'xo-space',
    'xo-space/esnext',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Ts と prettier 間で修正がループする
    indent: 'off',
    '@typescript-eslint/indent': 'off',
  },
  env: {
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
};
