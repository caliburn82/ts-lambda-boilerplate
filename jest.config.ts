import { JestConfigWithTsJest } from 'ts-jest';

/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default <JestConfigWithTsJest>{
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,
  verbose: true,
  moduleNameMapper: { '^(.*)\\.[jt]s$': '$1' }, // remove .js and .ts extensions from imports
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
};
