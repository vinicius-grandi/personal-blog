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
  }

  User.prototype.checkPassword = async (password) => {
    return bcrypt.compare(password, this.password);
  };

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
