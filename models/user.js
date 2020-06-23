'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: DataTypes.TEXT,
    username: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};