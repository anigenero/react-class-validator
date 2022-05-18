module.exports = {
    coverageReporters: [
        'lcov',
        'html'
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        '<rootDir>/src/__tests__'
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: 'jest-environment-jsdom-global',
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ]
};
