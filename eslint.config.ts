import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {fixupPluginRules} from '@eslint/compat';
import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        '**/*.d.ts',
        '**/node_modules/*',
        '**/dist/*',
        '**/*.js'
    ],
}, ...compat.extends(
    'eslint:recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
), {
    plugins: {
        ts: stylistic,
        import: fixupPluginRules(_import),
    },
    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        },
        parser: tsParser
    },
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            accessibility: 'explicit',
        }],
        '@typescript-eslint/indent': ['off', 4, {
            FunctionDeclaration: {
                parameters: 'first',
            },

            FunctionExpression: {
                parameters: 'first',
            },
        }],
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'error',
        'arrow-parens': ['error', 'always'],
        'camelcase': 'error',
        'comma-dangle': 'off',
        'complexity': 'off',
        'constructor-super': 'error',
        'curly': 'error',
        'default-case': 'error',
        'eol-last': 'error',
        'eqeqeq': ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined',
        ],
        'id-match': 'error',
        'import/order': ['error', {
            alphabetize: {
                order: 'asc',
                caseInsensitive: true,
            },
        }],
        'jsdoc/require-description': 'error',
        'jsdoc/no-undefined-types': 'off',
        'max-classes-per-file': ['error', 1],
        'max-len': ['error', {
            code: 140,
        }],
        'ts/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false,
            },
        }],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': ['error', {
            allow: [
                'info',
                'warn',
                'error',
                'debug',
                'dir',
                'timeLog',
                'assert',
                'clear',
                'count',
                'countReset',
                'group',
                'groupEnd',
                'table',
                'dirxml',
                'groupCollapsed',
                'Console',
                'profile',
                'profileEnd',
                'timeStamp',
                'context',
            ],
        }],
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-const': 'error',
        'quotes': ['error', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
        'radix': 'error',
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
        }],
        'spaced-comment': 'error',
        'ts/type-annotation-spacing': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off',
    }
}];
