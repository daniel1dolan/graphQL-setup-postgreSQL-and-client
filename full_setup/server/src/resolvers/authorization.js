const { ForbiddenError } = require("apollo-server");
const { skip, combineResolvers } = require("graphql-resolvers");

exports.isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

exports.isAdmin = combineResolvers(
  this.isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

exports.isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId != me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }

  return skip;
};
