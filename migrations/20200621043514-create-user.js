'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: { // email
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};