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
    },
    {}
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User);
    // associations can be defined here
  };
  return Message;
};
