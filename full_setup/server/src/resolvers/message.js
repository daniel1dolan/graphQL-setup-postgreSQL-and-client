const { v4: uuidv4 } = require("uuid");

module.exports = {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },
  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        UserId: me.id,
      };
      return await models.Message.create(message);
    },
    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    },
    updateMessage: async (parent, { id, text }, { models }) => {
      return await models.Message.findByPk(id).then((result) => {
        result.text = text;
        result.save();
      });
    },
  },
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.UserId);
    },
  },
};
