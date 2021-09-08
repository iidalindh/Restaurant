import React, { useState, useContext } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import { Navbar } from "../navbar/Navbar";
import { Button, Input, Form, AuthContainer } from "../../styles";
import { Footer } from "../footer/Footer";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Register = () => {
  const {getLoggedIn} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const history = useHistory();

  async function register(e: FormEvent) {
    console.log('loggar');
    
    e.preventDefault();

    console.log(email);
    

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      await axios.post(
        "http://localhost:8000/register",
        registerData
      );
      getLoggedIn();
      history.push('/');
      
      
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
