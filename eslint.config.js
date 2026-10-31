import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const TEST_FILES = ['**/__tests__/**/*.{js,jsx}', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'];
const TEST_GLOBALS = {
  describe: 'readable', it: 'readable', test: 'readable', expect: 'readable',
  beforeEach: 'readable', afterEach: 'readable', beforeAll: 'readable', afterAll: 'readable',
  jest: 'readable', vi: 'readable'
};

export default [
  { ignores: ['node_modules', 'dist'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser }
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      // Automatic JSX runtime (Vite): imports React legados e componentes
      // nao usados viram warning ate migracao pos-JSX-transform.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  // Arquivos de teste -> globals Vitest/Jest + rules-of-hooks off (helpers chamam hooks por design)
  {
    files: TEST_FILES,
    languageOptions: { globals: TEST_GLOBALS },
    rules: { 'react-hooks/rules-of-hooks': 'off' }
  }
];