import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import {IBookingGuestsProps} from '../models/interface';

export const BookingGuests = (props: IBookingGuestsProps) => {
  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];

  return (
    <Div>
      <Select
        placeholder="Välj antal gäster"
        options={options}
        onChange={(event: { value: number; label: number } | null) => {
          if (event) {
            props.pickGuestAmount(event.value);
          }
        }}
      />
      {props.numberOfGuests === 0 ? (
        <ErrorMessage>Fyll i antal gäster</ErrorMessage>
      ) : (
        <></>
      )}
    </Div>
  );
};

const Div = styled.div`
  padding: 20px;
  width: 50%;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-left: 6px;
  margin-top: 0;
`;
