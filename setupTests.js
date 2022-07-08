require("@testing-library/jest-dom/extend-expect");
const { config } = require('dotenv');
const { resolve } = require('path');
const { Crypto } = require('@peculiar/webcrypto');
config({
  path: resolve(__dirname, '.env.test')
});

global.crypto = new Crypto();

if ('window' in global) {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      reload: jest.fn(),
    },
  })
}
