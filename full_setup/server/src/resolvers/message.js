const { v4: uuidv4 } = require("uuid");
const { ForbiddenError } = require("apollo-server");
const { isAuthenticated, isMessageOwner } = require("./authorization");
const { combineResolvers } = require("graphql-resolvers");

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
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        const id = uuidv4();
        const message = {
          id,
          text,
          UserId: me.id,
        };
        try {
          return await models.Message.create(message);
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      }
    ),
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
