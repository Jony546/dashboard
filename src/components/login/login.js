import React from "react";
import { Call } from "./../../api";
import { apiUrl } from "./../../constants/config";
import { Wrapper } from "./loginStyle";

export const Login = ({ setLogged }) => {
  function login(evt) {
    evt.preventDefault();
    const {
      target: {
        username: { value: username },
        password: { value: password },
      },
    } = evt;

    Call(`${apiUrl}/users/login`, { username, password })
      .then((xhr, response) => {
        setLogged(true);
        localStorage.setItem("token", xhr.token);
      })
      .catch((error) => {
        alert("we have some problem trying to log you in");
      });
  }
  return (
    <Wrapper>
      <form onSubmit={login}>
        <fieldset>
          <legend>Login Fields</legend>

          <label htmlFor="username">ID</label>
          <input
            type="text"
            id="username"
            name="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </fieldset>

        <input type="submit" />
      </form>
    </Wrapper>
  );
};
