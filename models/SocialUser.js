'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialUser = sequelize.define('SocialUser', {
    email: DataTypes.STRING,
    provider: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  SocialUser.associate = function(models) {
    // associations can be defined here
  };
  return SocialUser;
};