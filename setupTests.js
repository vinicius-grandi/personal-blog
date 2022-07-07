require("@testing-library/jest-dom/extend-expect");
const { config } = require('dotenv');
const { resolve } = require('path');

config({
  path: resolve(__dirname, '.env.test')
});

if ('window' in global) {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      reload: jest.fn(),
    },
  })
}
