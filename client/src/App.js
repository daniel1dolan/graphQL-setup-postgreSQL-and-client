import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//GraphQL query that fetches the country data.
//The query will then be passed to useQuery to tell
//Apollo which data to fetch.
const GET_COUNTRIES = gql`
  {
    countries {
      Country
      Confirmed
    }
  }
`;

const Country = ({ country: { Country, Confirmed } }) => (
  <div>
    <h5>{Country}</h5>
    <p>{Confirmed}</p>
  </div>
);

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (error) return <h1>Sorry, something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <main>
      <h1>Countries and Cases for Covid-19</h1>
      {data.countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </main>
  );
}

export default App;
