const { Apollo, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Country {
    id: ID
    Country: String
    Cases: Int
  }
  type Query {
    countries: [Country]
  }
`;
