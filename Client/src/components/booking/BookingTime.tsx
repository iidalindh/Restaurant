import React, { useState } from "react";

interface IBookingTimeProps {
  time: number;
  //Skapa funktion för att uppdatera state
}

export const BookingTime = (props: IBookingTimeProps) => {
  return (
    <div>
      <button
        type="button"
        // onClick={(e: any) => setBookingValue(e.target.value)}
        value={18}
      >
        18:00
      </button>
      <button type="button" value={21}>
        21:00
      </button>
      <button type="submit">skicka skiten nu</button>
    </div>
  );
};
