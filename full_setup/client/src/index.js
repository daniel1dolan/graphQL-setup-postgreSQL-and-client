import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";
import Login from "./Login";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Login />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
