const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");

const { isAdmin } = require("./authorization");

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports = {
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },
  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      const user = await models.User.create({
        id: uuidv4(),
        username,
        email,
        password,
      });
      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with these login credentials.");
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "30m") };
    },
    //Combine resolvers allows other repeatedly used resolvers
    //to be used from a different file along with a separate resolver.
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      }
    ),
  },
  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          UserId: user.id,
        },
      });
    },
  },
};
