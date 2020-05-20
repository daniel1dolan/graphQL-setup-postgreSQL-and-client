import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import State from "./State.component";
import Button from "@material-ui/core/Button";

//GraphQL query that fetches the country data.
//The query will then be passed to useQuery to tell
//Apollo which data to fetch.
const GET_STATES = gql`
  {
    states {
      state
      positive
      death
    }
  }
`;

const GET_STATE = gql`
  {
    state(state: "CA") {
      state
      positive
      death
    }
  }
`;

function App() {
  const [query, setQuery] = useState(GET_STATES);
  const { loading, error, data } = useQuery(query);

  if (error) return <h1>Sorry, something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <main>
      <Button onClick={() => setQuery(GET_STATES)}>Data for All States</Button>
      <Button onClick={() => setQuery(GET_STATE)}>Data for California</Button>

      {/* <TextField id="standard-search" label="Search state" type="search" /> */}
      <h1>States and Cases for Covid-19</h1>
      {query === GET_STATES ? (
        data.states.map((state, index) => <State key={index} state={state} />)
      ) : (
        <State key={0} state={data.state} />
      )}
      {}
    </main>
  );
}

export default App;
