module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '**/*.(test|spec).(ts|tsx)'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: false
    }
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'enzyme.js'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary'
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 95
    }
  }
};
