import React, { useState } from "react";

interface IBookingTimeProps {
  time: number;
  addTime(time: number) : void;
  //Skapa funktion för att uppdatera state
}

export const BookingTime = (props: IBookingTimeProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={(e : any) => {props.addTime(e.target.value)}}
        value={18}
      >
        18:00
      </button>
      <button type="button" value={21} onClick={(e : any) => {props.addTime(e.target.value)}}>
        21:00
      </button>
      <button type="submit">skicka skiten nu</button>
    </div>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

