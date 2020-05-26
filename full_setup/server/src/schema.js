const { gql } = require("apollo-server-express");

//The schema defines what type of queries can be made,
//the arguments and argument scalar types that can be sent, and
//the type of data that will be sent back.
//There are queries, mutations, and subscriptions requests that can
//be made to the GraphQl API/
const schema = gql`
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
    company: Company

    messages: [Message!]!
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message!
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

export default schema;
