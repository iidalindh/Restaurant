import React, { useState } from "react";

interface IBookingGuestsProps {
  numberOfGuests: number;
  pickGuestAmount(guests: number): void;
}

export const BookingGuests = (props: IBookingGuestsProps) => {
  return (
    <div>
      <select
        id="amountOfGuests"
        name="amountOfGuests"
        onChange={(e) => props.pickGuestAmount(+e.target.value)}
      >
        <option value={0}>ANTAL GÄSTER</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
      </select>
    </div>
  );
};
