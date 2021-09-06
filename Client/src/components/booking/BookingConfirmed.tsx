import React, { useState } from "react";
import ReactLoading from "react-loading";
import MediaQuery from "react-responsive";
import styled from "styled-components";

interface IBookingConfirmedProps {
  date: string;
  time: number;
  numberOfGuests: number;
}

export const BookingConfirmed = (props: IBookingConfirmedProps) => {
  const [done, setDone] = useState(false);

  setTimeout(() => {
    setDone(true);
  }, 2000);

  return (
    <Section>
      {!done ? (
        <LoadingDiv>
          <MediaQuery minDeviceWidth={1224}>
            <ReactLoading
              type={"spin"}
              color={"blue"}
              height={200}
              width={200}
            />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            <ReactLoading
              type={"spin"}
              color={"blue"}
              height={100}
              width={100}
            />
          </MediaQuery>
        </LoadingDiv>
      ) : (
        <ConfirmationDiv>
          <GreenCheck className="fas fa-check-circle"></GreenCheck>
          <h2>Tack för din bokning!</h2>
          <div>
            <p>Du har bokat följande på Restaurang Athena</p>
            <p>
              <b>Datum: </b> {props.date}
            </p>
            <p>
              <b>Tid: </b>
              {props.time}
            </p>
            <p>
              <b>Antal gäster: </b>
              {props.numberOfGuests}
            </p>
          </div>
          <CenterDiv>
            <h3>Varmt välkomna!</h3>
            <p>Önskar Athena med personal.</p>
          </CenterDiv>
        </ConfirmationDiv>
      )}
    </Section>
  );
};

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

const LoadingDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
