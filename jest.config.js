module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./'],
    transform: { '\\.ts$': ['ts-jest'] },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec|e2e-spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
      'ts-jest': {
        tsconfig: {
          // allow js in typescript
          allowJs: true,
        },
      },
    },
    coverageProvider: 'v8',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main.ts',
      '!src/**/*.config.ts',
      '!src/application/controllers/*',
      '!src/application/interceptors/*',
      '!src/domain/entities/**',
      '!src/domain/interfaces/*',
      '!src/domain/modules/*',
      '!src/infrastructure/**',
    ],
    coverageThreshold: {
      global: {
        lines: 70,
        statements: 70,
      },
    },
  };
  