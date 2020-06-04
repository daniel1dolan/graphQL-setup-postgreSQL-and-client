import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

function App({ onUserSelected }) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h3>Select a user:</h3>
      <select name="users" onChange={onUserSelected}>
        {data.users.map((user) => {
          return (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default App;
