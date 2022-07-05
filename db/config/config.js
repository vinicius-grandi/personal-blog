const { config } = require('dotenv')
const { resolve } = require('path');

config({
  path: resolve('.test.env'),
  define: {
    timestamps: false,
  },
});

console.log(process.env.DATABASE_URL)

module.exports = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
};
