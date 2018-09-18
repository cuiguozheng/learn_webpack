module.exports = {
    parser: 'babel-eslint',
    // required to lint *.vue files
	plugins: [
		'html'
    ],
    parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	extends: '58fe'
};