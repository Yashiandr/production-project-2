import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import reactHooks from 'eslint-plugin-react-hooks';
import path from 'path';
import { fileURLToPath } from 'url';
import i18next from 'eslint-plugin-i18next';
import jest from 'eslint-plugin-jest';
import yashiandrAppPlugin from 'eslint-plugin-yashiandr-app-plugin';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname
});
export default [
    {
        languageOptions: {
            globals: {
                __IS_DEV__: 'readonly',
                __API__: true,
                __PROJECT__: true,
                ...globals.browser
            },
        }
    },
    // eslintPluginPrettierRecommended,
    ...yashiandrAppPlugin.config.recommended,
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...compat.extends('airbnb'),
    jest.configs['flat/style'],
    {
        plugins: {
            i18next,
            reactHooks,
            yashiandrAppPlugin
        },
        rules:
            {
                'indent': 0,
                'react/jsx-indent-props': 0,
                'react/jsx-indent': 0,
                'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
                'import/no-unresolved': 0,
                'import/prefer-default-export': 0,
                'react/require-default-props': 0,
                'react/react-in-jsx-scope': 0,
                'react/jsx-props-no-spreading': 1,
                'react/function-component-definition': 0,
                'no-unused-vars': 0,
                'no-shadow': 0,
                'import/extensions': 0,
                'import/no-extraneous-dependencies': 0,
                'no-underscore-dangle': 0,
                '@typescript-eslint/ban-ts-comment': 1,
                'i18next/no-literal-string': [2,
                    {
                        markupOnly: true,
                        ignoreAttribute: ['data-testid', 'to']
                    }],
                'max-len': [1, {
                    code: 120,
                    ignoreComments: true
                }],
                'jsx-a11y/no-static-element-interactions': 0,
                'jsx-a11y/click-events-have-key-events': 0,
                'reactHooks/rules-of-hooks': 2, // Checks rules of Hooks
                'reactHooks/exhaustive-deps': 2, // Checks effect dependencies,
                'no-param-reassign': 0,
                'no-undef': 0,
                'implicit-arrow-linebreak': 0,
                'object-curly-newline': 0,
                'operator-linebreak': 0,
                'function-paren-newline': 0,
                'no-self-compare': 0,
                'no-restricted-imports': 'off',
                '@typescript-eslint/no-restricted-imports': [
                    'warn',
                    {
                        'name': 'react-redux',
                        'importNames': ['useSelector', 'useDispatch'],
                        'message': 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
                    }
                ],
                'import/no-named-default': 0,
                'react/no-array-index-key': 1,
                'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
                'yashiandr-app-plugin/path-checker': [2, { alias: '@' }],
                'yashiandr-app-plugin/public-api-imports': [2,
                    {
                        alias: '@',
                        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
                    }],
                'yashiandr-app-plugin/layer-imports': [
                    2,
                    {
                        alias: '@',
                        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
                    }
                ]
            },
    },
    {
        files: ['**/src/**/*.{test,stories}.{ts,tsx}', '**/tests/**/*.{ts,tsx}'],
        rules: {
            'i18next/no-literal-string': 0,
            'max-len': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/ban-ts-comment': 0
        }
    },
    {
        files: ['**/*.js'],
        rules: {
            '@typescript-eslint/no-var-requires': 0,
        }
    },
    {
        files: ['src/app/types/typings.d.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 0,
        }
    },
    {
        files: ['config/storybook/**/*', 'cypress/**/*'],
        rules: {
            'yashiandr-app-plugin/path-checker': 0,
            'yashiandr-app-plugin/public-api-imports': 0,
            'yashiandr-app-plugin/layer-imports': 0,
        }
    },
    {
        files: ['cypress/**/*'],
        rules: {
            '@typescript-eslint/no-namespace': 0
        }
    }
];
