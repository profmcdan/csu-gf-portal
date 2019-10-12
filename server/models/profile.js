'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      image: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {},
  );
  Profile.associate = models => {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};
