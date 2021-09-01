import axios from "axios";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { IBooking } from "./Booking";
import MediaQuery from "react-responsive";

interface IBookingCalendarProps {
  date: string;
  pickDate(date: string): void;
  button18(btnState18 : boolean) : void;
  button21(btnState21 : boolean) : void;
  numberOfGuests : number;
}

export const BookingCalendar = (props: IBookingCalendarProps) => {
  const [dateValue, setDateValue] = useState(new Date());
  function changeDate(e: any) {
    setDateValue(e);
  }

  function selectDate(e: any) {
    props.pickDate(e.toLocaleDateString());
  }

  async function getAvailableTables() {
    const date = dateValue.toLocaleDateString();
    const data = {
      numberOfGuests: props.numberOfGuests,
      date: date
    }
    const res = await axios.post ("http://localhost:8000/booking/getAvailableTables", data);
    console.log(res.data);

    for (let ida = 0; ida < res.data.length; ida++) {
      if(res.data[ida].time === 18) {
        if(res.data[ida].availableTables === false) {
          props.button18(false); 
        } else {
          props.button18(true);
        }
      } else if(res.data[ida].time === 21) {
        if(res.data[ida].availableTables === false) {
          props.button21(false); 
        } else {
          props.button21(true);
        }
      } 
      
    }
    
  }

  function runFunctions(e : any) {

    changeDate(e);
    selectDate(e);
    getAvailableTables();
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
