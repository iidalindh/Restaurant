import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";

type BookingParams = {
  id: string;
};

export const CancelBooking = () => {
  const [bookingCanceled, setbookingCanceled] = useState(false);

  const history = useHistory();

  const goToStart = () => {
    let path = `/`;
    history.push(path);
  };

  const { id } = useParams<BookingParams>();

  async function cancelReservation() {
    setbookingCanceled(true);
    await axios.post(`http://localhost:8000/booking/cancel/${id}`, id);
  }
  return (
    <div>
      <Navbar />
      <Section>
        {bookingCanceled ? (
          <>
            <ConfirmationDiv>
              <GreenCheck className="fas fa-check-circle"></GreenCheck>
              <Heading>Din bordsreservation är nu avbokad!</Heading>
              <CenterDiv>
                <h3>Varmt välkomna en annan dag!</h3>
                <p>Önskar Athena med personal.</p>
              </CenterDiv>
            </ConfirmationDiv>{" "}
          </>
        ) : (
          <>
            <Heading>
              Är du säker på att du vill avboka din reservation?
            </Heading>
            <Div>
              <Button onClick={cancelReservation}>Ja</Button>
              <Button onClick={goToStart}>Nej</Button>
            </Div>
          </>
        )}
      </Section>
      <Footer />
    </div>
  );
};

const Heading = styled.h1`
  font-size: 1.3rem;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const Button = styled.button`
  width: 25%;
  background-color: white;
  color: black;
  padding: 10px;
  margin: 8px 15px;
  border-radius: 50px;
  border: 1px solid #004cbf;
  cursor: pointer;
  font-size: 1.5em;

  :hover {
    background-color: #213fea;
  }

  :focus {
    background-color: #213fea;
    color: white;
  }
`;

const ConfirmationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;

  //Desktop
  @media (min-width: 1025px) {
    width: 40vw;
    padding: 20px;
    border: 1px solid black;
    align-self: center;
  }
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  h3 {
    margin-bottom: 0;
  }

  p {
    margin: 0;
  }
`;

const GreenCheck = styled.i`
  font-size: 4rem;
  color: green;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;

  //Desktop
  @media (min-width: 1025px) {
    height: 80vh;
  }
`;
