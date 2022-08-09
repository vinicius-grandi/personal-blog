'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, {
        foreignKey: 'id',
        as: 'poster_id',
      });
    }
    async checkPassword(password) {
      const compare = await bcrypt.compare(password, this.password);
      return compare;
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      async beforeCreate(user) {
        const u = user;
        const hash = await bcrypt.hash(user.password, 8);
        u.password = hash;
      }
    },
  });
  return User;
};
