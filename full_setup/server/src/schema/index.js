const { gql } = require("apollo-server-express");

const userSchema = require("./user");
const messageSchema = require("./message");

//The schema defines what type of queries can be made,
//the arguments and argument scalar types that can be sent, and
//the type of data that will be sent back.
//There are queries, mutations, and subscriptions requests that can
//be made to the GraphQl API/
const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, messageSchema];
