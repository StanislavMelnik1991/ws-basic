module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json'
	},
  plugins: [
		'@typescript-eslint',
	],
	rules: {
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "off",
		"no-plusplus": "off",
		"no-unused-expressions": "off",
  		"@typescript-eslint/no-unused-expressions": "off",
        "import/extensions": [1, {'tsx': "never"}],
		"no-nested-ternary": "off"
	},
};
