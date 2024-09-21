module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

