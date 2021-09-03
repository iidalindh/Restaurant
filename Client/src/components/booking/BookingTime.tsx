import React, { useState } from "react";
import styled from "styled-components";

interface IBookingTimeProps {
  time: number;
  addTime(time: number): void;
  time18: boolean;
  time21: boolean;
}

export const BookingTime = (props: IBookingTimeProps) => {
  return (
    <>
      <ButtonDiv>
        {props.time18 !== true ? (
          <Button
            type="button"
            onClick={() => {
              props.addTime(18);
            }}
            disabled={true}
          >
            18:00
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              props.addTime(18);
            }}
          >
            18:00
          </Button>
        )}
        {props.time21 !== true ? (
          <Button
            type="button"
            disabled={true}
            onClick={() => {
              props.addTime(21);
            }}
          >
            21:00
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              props.addTime(21);
            }}
          >
            21:00
          </Button>
        )}
      </ButtonDiv>
      <div>
        {props.time === 0 ? <ErrorMessage>Välj tid</ErrorMessage> : <></>}
      </div>
    </>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  //Desktop
  @media (min-width: 1025px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  width: 150px;
  background-color: white;
  color: black;
  padding: 10px;
  margin: 8px 15px;
  border: 1px solid #004cbf;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5em;

  :hover {
    background-color: #213fea;
  }

  :focus {
    background-color: #213fea;
    color: white;
  }

  :disabled {
    background-color: #d4d4d4;
    :hover {
      cursor: not-allowed;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0;
`;
