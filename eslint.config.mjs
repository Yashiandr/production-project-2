import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
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
                ...globals.browser
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...compat.extends('airbnb'),
    {
        rules:
            {
                'react/jsx-indent': [2, 4],
                'react/jsx-indent-props': [2, 4],
                'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
                'import/no-unresolved': 0,
                'import/prefer-default-export': 0,
                'indent': [2, 4],
                'react/require-default-props': 0,
                'react/react-in-jsx-scope': 0,
                'react/jsx-props-no-spreading': 1,
                'react/function-component-definition': 0,
                'no-unused-vars': 0,
                'no-shadow': 0,
                'import/extensions': 0,
                'import/no-extraneous-dependencies': 0,
                'no-underscore-dangle': 0,
                '@typescript-eslint/ban-ts-comment': 1
            },
    },
]