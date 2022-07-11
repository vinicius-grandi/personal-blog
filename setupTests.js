require('@testing-library/jest-dom/extend-expect');
require('jest-fetch-mock').enableMocks();
const { config } = require('dotenv');
const { resolve } = require('path');
const { Crypto } = require('@peculiar/webcrypto');

config({
  path: resolve(process.cwd(), './.env.local'),
});

global.crypto = new Crypto();

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      reload: jest.fn(),
    },
  });
}

fetchMock.dontMock()
