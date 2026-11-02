import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
	{
		ignores: [
			'.svelte-kit/**',
			'build/**',
			'node_modules/**',
			'src/data/**',
			'test-results/**',
			'playwright-report/**'
		]
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'prefer-const': 'warn',
			// Static, presentation-only lists do not need artificial keys.
			'svelte/require-each-key': 'off',
			// These dates are calculated once while loading, not used as reactive state.
			'svelte/prefer-svelte-reactivity': 'off',
			// Most href values come from the database and are external URLs.
			// Internal navigation uses resolve() at its source.
			'svelte/no-navigation-without-resolve': ['error', { ignoreLinks: true }]
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: { parserOptions: { parser: ts.parser } }
	}
];
