module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  modulePathIgnorePatterns: ['/src/bff/'],
  coveragePathIgnorePatterns: ['/src/models/']
}
