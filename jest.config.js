module.exports = {
	verbose: true,
	setupFilesAfterEnv: ['<rootDir>src/setupEnzyme.js'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	moduleDirectories: ['node_modules', 'src'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$':
			'<rootDir>/src/__tests__/__mocks__/styleMock.js',
	},
	testPathIgnorePatterns: [
		'./src/__tests__/__mocks__/',
		'./src/reportWebVitals.js',
	],
	coveragePathIgnorePatterns: [
		'./src/__tests__/__mocks__/',
		'./src/reportWebVitals.js',
		'./src/index.js',
		'./src/setupEnzyme.js',
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
	snapshotSerializers: ['enzyme-to-json/serializer'],
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	modulePathIgnorePatterns: ['<rootDir>/src/redux'],
};
