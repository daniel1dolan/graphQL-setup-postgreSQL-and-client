"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(
      models.Message,
      { onDelete: "CASCADE" },
      { foreignKey: "UserID" }
    );
    // associations can be defined here
  };
  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });
    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }
    return user;
  };
  return User;
};
