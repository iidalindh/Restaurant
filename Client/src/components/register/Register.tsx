import React, { useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import { Navbar } from "../navbar/Navbar";
import { Button, Input, Form, AuthContainer } from "../../styles";
import styled from "styled-components";
import { Footer } from "../footer/Footer";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  async function register(e: FormEvent) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      const response = await axios.post(
        "http://localhost:8000/register",
        registerData
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Navbar />
      <AuthContainer>
        <h1>Registrera ett nytt konto</h1>
        <Form onSubmit={register}>
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
          <Input
            type="password"
            placeholder="Repeat password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordVerify(e.target.value)
            }
            value={passwordVerify}
          />
          <Button type="submit">Registrera</Button>
        </Form>
      </AuthContainer>
      <Footer/>
    </>
  );
};
