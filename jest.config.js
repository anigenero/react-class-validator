module.exports = {
    coverageReporters: [
        'lcov',
        'html'
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    preset: 'ts-jest',
    setupFiles: [
        '<rootDir>/jest.setup.ts'
    ],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '\\.(gql|graphql)$': '<rootDir>/jest.graphql.js'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: 'jest-environment-jsdom-global',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
