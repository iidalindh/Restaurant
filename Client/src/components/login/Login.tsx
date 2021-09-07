import React, { useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import { Navbar } from "../navbar/Navbar";
import styled from "styled-components";
import { Input, Button, Form, AuthContainer } from "../../styles";
import { Footer } from "../footer/Footer";

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
    <>
      <Navbar />
      <AuthContainer>
        <h1>Logga in</h1>
        <Form onSubmit={login}>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />

          <Button type="submit">Logga in</Button>
        </Form>
      </AuthContainer>
      <Footer />
    </>
  );
};


