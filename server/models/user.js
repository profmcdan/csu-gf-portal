const uuid = require('uuidv4').default;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      photo: DataTypes.STRING,
      googleId: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
