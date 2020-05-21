const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
    company: Company
  }

  type User {
    id: ID!
    username: String!
  }

  type Company {
    name: String!
    yearFounded: Int!
  }
`;

let users = {
  1: {
    id: "1",
    username: "Rovin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

const me = users[1];

//The Resolver is agnostic to the data source.
//For instance, data is hardcoded to resolve the 'me' field.
const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    company: () => {
      return {
        name: "Rufus Inc.",
        yearFounded: 2014,
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
