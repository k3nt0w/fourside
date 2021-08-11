module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.+)': '<rootDir>/src/$1',
    '^@renderer/(.+)': '<rootDir>/src/renderer/$1',
    '^@shared/(.+)': '<rootDir>/src/shared/$1',
    '^@main/(.+)': '<rootDir>/src/main/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy'
  }
}
