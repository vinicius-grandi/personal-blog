'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
/**@type {any} */
const db = {};
const { config } = require('dotenv');
const modelsPath = path.resolve(process.cwd(), 'db', 'models');

config({
  path: path.resolve(process.cwd(), './.env.local'),
});

let sequelize;
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

const dir = fs.readdirSync(modelsPath);
dir.filter((file) => {
  return (
    file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'
  );
}).forEach((file) => {
  // const pathJoin = path.join(modelsPath, file);
  const model = require(`./${file}`)(
    sequelize,
    Sequelize.DataTypes,
  );
  db[model.name] = model;
})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
