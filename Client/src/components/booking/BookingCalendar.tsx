import React, { useState } from "react";
import Calendar from "react-calendar";
import { IBooking } from "./Booking";

interface IBookingCalendarProps {
  date: string;
  //Skapa funktion för att uppdatera state
}

export const BookingCalendar = (props: IBookingCalendarProps) => {
  const [dateValue, setDateValue] = useState(new Date());
  function changeDate(e: any) {
    setDateValue(e);
  }
  return (
    <div>
      <Calendar onChange={changeDate} value={dateValue} />
    </div>
  );
};
