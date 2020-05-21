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

    messages: [Message!]!
    message(id: ID!): Message
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Company {
    name: String!
    yearFounded: Int!
  }
`;

let messages = {
  1: {
    id: "1",
    text: "Hello Word",
    userId: "1",
  },
  2: {
    id: "2",
    text: "Bye World",
    userId: "2",
  },
};

let users = {
  1: {
    id: "1",
    username: "Daniel Dolan",
    messageIds: [1],
  },
  2: {
    id: "2",
    username: "Dave Davids",
    messageIds: [2],
  },
};

//The Resolver is agnostic to the data source.
//For instance, data is hardcoded to resolve the 'me' field.
const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
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
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  User: {
    messages: (user) => {
      return Object.values(messages).filter(
        (message) => message.userId === user.id
      );
    },
  },
  Message: {
    user: (message) => {
      return users[message.userId];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo server listening on http://localhost:8000/graphql");
});
