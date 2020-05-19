const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Country {
    Country: String
    Confirmed: Int
  }
  type Query {
    countries: [Country]
  }
`;

const resolvers = {
  Query: {
    countries: async () => {
      try {
        const countries = await axios.get("https://api.covid19api.com/all");
        return countries.data.map(({ Country, Confirmed }) => ({
          Country,
          Confirmed,
        }));
      } catch (error) {
        throw error;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
