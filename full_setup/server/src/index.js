const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const schema = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");
const sequelize = models.sequelize;
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

//The server has the type definitions, resolvers, and context
//attached to it. In the example, we provide a hard-types context
//which mimics a user.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    //remove the internal sequelize error message
    //leave only the important validation erorr
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message,
    };
  },
  context: async () => ({
    models,
    me: await models.User.findByLogin("rwieruch"),
    secret: process.env.SECRET,
  }),
});

//The middleware makes the api accessible through a /graphql path.
server.applyMiddleware({ app, path: "/graphql" });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({ port: 8000 }, () => {
    console.log("Apollo server listening on http://localhost:8000/graphql");
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      id: uuidv4(),
      username: "rwieruch",
      email: "hello@robin.com",
      password: "rwieruch",
      messages: [
        {
          id: uuidv4(),
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
  await models.User.create(
    {
      id: uuidv4(),
      username: "ddavids",
      email: "hello@david.com",
      password: "ddavids",
      messages: [
        {
          id: uuidv4(),
          text: "Happy to release ...",
        },
        {
          id: uuidv4(),
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};
