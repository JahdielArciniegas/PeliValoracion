export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src/test'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '/_test_/.*|(\\.|/)(test|spec)\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}
