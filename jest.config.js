module.exports = {
  preset: 'jest-expo',
  roots: ['<rootDir>/__tests__'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@tanstack/.*)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  modulePathIgnorePatterns: ['.cache'],
  testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
};
