const babelParser = require('@babel/eslint-parser');
const importPlugin = require('eslint-plugin-import');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/bundles/**',
      '**/coverage/**',
      '**/src/app/**',
      'charts/es/**',
      'charts/lib/**',
      'react/es/**',
      'react/lib/**',
      'utils/lib/**',
      'web-components/**',
      'www/client/services/motion/**',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.jquery,
        Cypress: 'readonly',
        cy: 'readonly',
        __DEV__: 'readonly',
      },
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
          ],
        },
      },
    },
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-undef': 'warn',
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-var': 'warn',
      'react/jsx-key': 'warn',
      'react/jsx-no-undef': 'warn',
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/no-unknown-property': 'warn',
      'react/prop-types': 'warn',
    },
  },
];
