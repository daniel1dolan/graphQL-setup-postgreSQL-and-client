const { ForbiddenError } = require("apollo-server");
const { skip } = require("graphql-resolvers");

exports.isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

exports.isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId != me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }

  return skip;
};
