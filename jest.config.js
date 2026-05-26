const config = {
	clearMocks: true,
	collectCoverage: false,
	coverageDirectory: 'coverage',
	coverageReporters: ['lcov', 'clover'],
	testEnvironment: 'jsdom',
	verbose: true,
	testMatch: ['**/test/specs/**/*.spec.js'],
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
};

module.exports = config;