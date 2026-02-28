import '@testing-library/jest-dom/extend-expect';

// add any global mocks or setup here

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));
