"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      UserId: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: "UserID" });
    // associations can be defined here
  };
  return Message;
};
