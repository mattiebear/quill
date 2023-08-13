module.exports = {
	arrowParens: 'always',
	importOrder: ['<THIRD_PARTY_MODULES>', '', '^@/(.*)$', '', '^[./]'],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	plugins: [require('@ianvs/prettier-plugin-sort-imports')],
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'es5',
	useTabs: true,
};
