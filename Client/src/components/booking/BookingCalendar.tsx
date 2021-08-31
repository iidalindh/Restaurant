import React, { useState } from "react";
import Calendar from "react-calendar";
import { IBooking } from "./Booking";

interface IBookingCalendarProps {
  date: string;
  pickDate(date: string): void;
}

export const BookingCalendar = (props: IBookingCalendarProps) => {
  const [dateValue, setDateValue] = useState(new Date());
  function changeDate(e: any) {
    setDateValue(e);
  }

  function selectDate(e: any) {
    props.pickDate(e.toLocaleDateString());
  }


  function runFunctions(e : any) {
    changeDate(e);
    selectDate(e);
  }

  return (
    <div>
      <Calendar onChange={runFunctions} 
      value={dateValue} 
      minDate={new Date()}/>
    </div>
  );
};
