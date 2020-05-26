const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const schema = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");

const app = express();

app.use(cors());

//The server has the type definitions, resolvers, and context
//attached to it. In the example, we provide a hard-types context
//which mimics a user.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

//The middleware makes the api accessible through a /graphql path.
server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo server listening on http://localhost:8000/graphql");
});
