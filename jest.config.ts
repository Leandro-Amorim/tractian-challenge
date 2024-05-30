import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	preset: 'ts-jest/presets/default-esm',
	rootDir: 'src',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
}

export default jestConfig;