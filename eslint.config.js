import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';
import boundaries from 'eslint-plugin-boundaries';
import globals from 'globals';
import js from '@eslint/js';
import _import from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/*.js'],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:jest/recommended',
            'prettier',
            'plugin:boundaries/strict',
            'plugin:import/recommended',
            'plugin:import/typescript',
        ),
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            jest: fixupPluginRules(jest),
            boundaries: fixupPluginRules(boundaries),
            import: fixupPluginRules(_import),
            'jest-extended': jestExtended,
        },

        languageOptions: {
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key]) => [
                        key,
                        'off',
                    ]),
                ),
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },

        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },

            'boundaries/elements': [
                {
                    type: 'domain',
                    pattern: 'src/domain/**',
                },
                {
                    type: 'interface-adapters',
                    pattern: 'src/interface-adapters/**',
                },
                {
                    type: 'infrastructure',
                    pattern: 'src/infrastructure/**',
                },
                {
                    type: 'root',
                    pattern: 'src/**',
                },
            ],

            'boundaries/include': ['src/**'],
        },

        rules: {
            'boundaries/element-types': [
                2,
                {
                    default: 'disallow',

                    rules: [
                        {
                            from: 'domain',
                            allow: ['domain'],
                        },
                        {
                            from: 'interface-adapters',
                            allow: ['domain', 'interface-adapters'],
                        },
                        {
                            from: 'infrastructure',
                            allow: [
                                'domain',
                                'interface-adapters',
                                'infrastructure',
                            ],
                        },
                        {
                            from: 'root',
                            allow: [
                                'domain',
                                'interface-adapters',
                                'infrastructure',
                                'root',
                            ],
                        },
                    ],
                },
            ],

            'boundaries/external': [
                2,
                {
                    default: 'disallow',

                    rules: [
                        {
                            from: 'infrastructure',
                            allow: '*',
                        },
                        {
                            from: '*',
                            allow: 'node:*',
                        },
                    ],
                },
            ],

            'import/order': [
                2,
                {
                    groups: ['builtin', 'external', 'internal'],
                    'newlines-between': 'always',

                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            'jest-extended/prefer-to-be-true': 'warn',
            'jest-extended/prefer-to-be-false': 'error',
        },
    },
];
