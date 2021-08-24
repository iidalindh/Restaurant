import React, { useState } from "react";
import axios from "axios";
import type {FormEvent} from "react";
import styled from "styled-components";

const Button = styled.button`
  color: black;
  background: green;
`;



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:8000/login", loginData);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="login-container">
      <Button>klicka</Button>
      <h1>Logga in</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};
