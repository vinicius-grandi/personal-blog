'use strict';

module.exports = {
  /**
   * @param { import('sequelize').QueryInterface}  queryInterface */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(75),
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
