import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

// add any global mocks or setup here

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));
