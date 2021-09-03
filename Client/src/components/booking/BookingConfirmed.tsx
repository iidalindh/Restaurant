import React, { useState } from "react";
import ReactLoading from "react-loading";
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
    <div>
      {!done ? (
        <LoadingDiv>
          <ReactLoading type={"spin"} color={"pink"} height={100} width={200} />
        </LoadingDiv>
      ) : (
        <ConfirmationDiv>
          <h2>Tack för din bokning!</h2>
          <div>
            <p>Du har bokat följande på Athena Restaurang</p>
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
    </div>
  );
};

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vh;
`;

const ConfirmationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
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
