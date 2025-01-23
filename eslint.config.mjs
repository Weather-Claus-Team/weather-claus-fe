import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // 수정: @typescript-eslint/eslint-plugin
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser', // 추가: TypeScript 파서 지정
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json', // 추가: TypeScript 프로젝트 설정을 참고
      },
    },
  },
  pluginJs.configs.recommended, // JS 파일에 대한 기본 설정
  ...tseslint.configs.recommended, // TypeScript에 대한 기본 설정
  pluginReact.configs.recommended, // React 관련 규칙 적용
  'plugin:prettier/recommended', // Prettier 플러그인 적용
  'eslint:recommended',
];
