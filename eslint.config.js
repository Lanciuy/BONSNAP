import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly"
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off'
    },
  }
);
