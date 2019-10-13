module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      userId: DataTypes.INTEGER,
      bio: { type: DataTypes.STRING, allowNull: true },
      dateOfBirth: DataTypes.STRING,
      department: DataTypes.STRING,
      school: DataTypes.STRING,
      yearOfGraduation: DataTypes.STRING,
      contactAddress: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      profession: { type: DataTypes.STRING, allowNull: true },
      company: { type: DataTypes.STRING, allowNull: true },
      companyAddress: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, allowNull: true },
    },
    {},
  );
  Profile.associate = models => {
    // associations can be defined here
    // Profile.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   onDelete: 'CASCADE',
    // });
  };
  return Profile;
};
