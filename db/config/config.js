const { config } = require('dotenv')
const { resolve } = require('path');

config({
  path: resolve(process.cwd(), './.test.env'),
});

console.log(process.env.DATABASE_URL)

module.exports = {
  url: process.env.DATABASE_URL,
  define: {
    timestamps: false,
  },
  dialect: 'postgres',
};
