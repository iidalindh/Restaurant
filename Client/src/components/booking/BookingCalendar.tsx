import React, { useState } from "react";
import Calendar from "react-calendar";
import { IBooking } from "./Booking";
import MediaQuery from "react-responsive";

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

  function runFunctions(e: any) {
    changeDate(e);
    selectDate(e);
  }

  return (
    <div>
      <MediaQuery minDeviceWidth={1224}>
        <Calendar
          onChange={runFunctions}
          value={dateValue}
          minDate={new Date()}
          showDoubleView={true}
        />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <Calendar
          onChange={runFunctions}
          value={dateValue}
          minDate={new Date()}
        />{" "}
      </MediaQuery>
    </div>
  );
};
