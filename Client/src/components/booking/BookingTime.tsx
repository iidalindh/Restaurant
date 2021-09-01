import React, { useState } from "react";
import styled from "styled-components";

interface IBookingTimeProps {
  time: number;
  addTime(time: number): void;
}

export const BookingTime = (props: IBookingTimeProps) => {
  return (
    <ButtonDiv>
      <Button
        type="button"
        onClick={(e: any) => {
          props.addTime(e.target.value);
        }}
        value={18}
      >
        18:00
      </Button>
      <Button
        type="button"
        value={21}
        onClick={(e: any) => {
          props.addTime(e.target.value);
        }}
      >
        21:00
      </Button>
    </ButtonDiv>
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
  width: 35%;
  background-color: white;
  color: black;
  padding: 10px;
  margin: 8px 0;
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
`;
