const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

//The Resolver is agnostic to the data source.
//For instance, data is hardcoded to resolve the 'me' field.
const resolvers = {
  Query: {
    me: () => {
      return {
        username: "Robin Wieruch",
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo server listening on http://localhost:8000/graphql");
});
