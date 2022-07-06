require("@testing-library/jest-dom/extend-expect");
const { config } = require('dotenv');
const { resolve } = require('path');

Object.defineProperty(window, 'location', {
  configurable: true,
  value: {
    reload: jest.fn(),
  },
})
