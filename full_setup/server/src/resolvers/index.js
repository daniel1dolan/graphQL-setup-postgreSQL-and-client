//The Resolver is agnostic to the data source.
//For instance, data is hardcoded to resolve the 'me' field.
const userResolvers = require("./user");
const messageResolvers = require("./message");

module.exports = [userResolvers, messageResolvers];
