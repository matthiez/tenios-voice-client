/** @typedef {import('ts-jest')} */

module.exports = {
    bail: 1,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'jsdom',
    verbose: true,
};
