const { ForbiddenError } = require("apollo-server");
const { skip } = require("graphql-resolvers");

module.exports = isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");
