export default {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 75,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
};