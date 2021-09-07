import React from "react";
import styled from "styled-components";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

export const Menu = () => {
  return (
    <>
      <Navbar />
      <ImgDiv>
        <h1>Meny</h1>
        <img src="/Meny.png" alt="Menu"></img>
      </ImgDiv>
      <Footer />
    </>
  );
};

const ImgDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 90vh;
    margin-bottom: 2rem;
  }
`;
