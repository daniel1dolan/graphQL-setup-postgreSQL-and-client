const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type State {
    state: String
    positive: Int
    death: Int
  }
  type Query {
    states: [State]
    state(state: String!): State
  }
`;

const resolvers = {
  Query: {
    states: async () => {
      try {
        const states = await axios.get(
          "https://covidtracking.com/api/v1/states/current.json"
        );
        return states.data.map(({ state, positive, death }) => ({
          state,
          positive,
          death,
        }));
      } catch (error) {
        throw error;
      }
    },
    state: async (args) => {
      try {
        console.log(args);
        const state = await axios.get(
          `https://covidtracking.com/api/v1/states/${args.state}/current.json`
        );
        return {
          state: state.data.state,
          positive: state.data.positive,
          death: state.data.death,
        };
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
