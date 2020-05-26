const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const schema = require("./schema");
const resolvers = require("./resolvers");
const model = require("./models");

const db = require("../models");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

//The server has the type definitions, resolvers, and context
//attached to it. In the example, we provide a hard-types context
//which mimics a user.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    model,
    me: model.users[1],
  },
});

//The middleware makes the api accessible through a /graphql path.
server.applyMiddleware({ app, path: "/graphql" });

const createUsersWithMessages = async () => {
  await db.Message.create({
    id: uuidv4(),
    text: "Published the Road to learn React",
  });
  await db.Message.create({
    id: uuidv4(),
    text: "Happy to release ...",
  });
};

createUsersWithMessages().then(() => {
  app.listen({ port: 8000 }, () => {
    console.log("Apollo server listening on http://localhost:8000/graphql");
  });
});
