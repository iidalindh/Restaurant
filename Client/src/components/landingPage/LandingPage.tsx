import React from "react";
import { Navbar } from "../navbar/Navbar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Footer } from "../footer/Footer";

export const LandingPage = () => {
  const history = useHistory();

  const goToMenu = () => {
    let path = `/menu`;
    history.push(path);
  };

  const goToBooking = () => {
    let path = `/booking`;
    history.push(path);
  };

  return (
    <div className="landingPage">
      <Navbar />
      <MainSection>
        <BookNowDiv>
          <h1>SÖDERMALM</h1>
          <Button data-testid="book-now" onClick={goToBooking}>
            BOKA NU
          </Button>
        </BookNowDiv>
        <ImgDiv>
          <img src="/sandwich.jpg" alt="" />
          <img src="/restaurant.jpg" alt="" />
          <img src="/table.jpeg" alt="" />
        </ImgDiv>
        <ViewMenuDiv>
          <img src="/tzatsiki.jpeg" alt="" />
          <GoToMenuDiv>
            <h2>MAT FRÅN DET GREKISKA KÖKET</h2>
            <Button onClick={goToMenu}>MENY</Button>
          </GoToMenuDiv>
        </ViewMenuDiv>
        
      </MainSection>
      <Footer />
    </div>

  );
};

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BookNowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;

  h1 {
    font-size: 2.5em;
    font-weight: 300;
  }
`;

const ImgDiv = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: 400px;
    padding-bottom: 2rem;
  }

  //Desktop
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-around;

    img {
      width: 30%;
    }
  }
`;

const Button = styled.button`
  width: 80%;
  background-color: white;
  color: black;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #213fea;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5em;
`;

const ViewMenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: beige;
  width: 100%;

  img {
    padding: 2rem;
    width: 80%;
  }

  h2 {
    font-size: 1.8em;
    font-weight: 400;
  }

  //Desktop
  @media (min-width: 1025px) {
    flex-direction: row;
    margin: 0;
    padding: 0;

    img {
      width: 30%;
    }
  }
`;

const GoToMenuDiv = styled.div`
  padding: 0% 10%;

  button {
    margin-bottom: 10%;
    width: 50%;
  }
`;
