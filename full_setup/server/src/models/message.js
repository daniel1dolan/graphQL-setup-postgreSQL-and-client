"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "There was an error with unique id creation.",
          },
        },
      },
      text: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "A message has to have a text.",
          },
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
