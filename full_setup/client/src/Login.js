import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation Login($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

function Login() {
  let loginInput;
  let passwordInput;
  const [loginSend, { loading, error, data }] = useMutation(LOGIN);
  const consuelo = function () {
    console.log(loginInput.value, passwordInput.value);
  };

  if (data) {
    console.log(data.token);
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            consuelo();
            loginSend({
              variables: {
                login: loginInput.value,
                password: passwordInput.value,
              },
            });
          }}
        >
          <label>Login:</label>
          <input
            type="text"
            name="login"
            ref={(node) => {
              loginInput = node;
            }}
          />
          <label>Password:</label>
          <input
            type="text"
            name="password"
            ref={(node) => {
              passwordInput = node;
            }}
          />
          <input type="submit" value="Submit" />
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>GraphQL Mutation Error...</p>}
        {data && <p>GraphQL Mutation Succeed: {data.token}</p>}
      </div>
    </>
  );
}

export default Login;
