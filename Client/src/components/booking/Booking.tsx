import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BookingGuests } from "./BookingGuests";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTime } from "./BookingTime";
import { BookingDetails } from "./BookingDetails";

export interface IBooking {
  numberOfGuests: number;
  date: string;
  time: number;
  customerName: string;
  customerEmail: string;
}

//Skapa funktion för att uppdater state (guests, time, date osv.)

export const Booking = (props: IBooking) => {
  let defaultValue: IBooking = {
    numberOfGuests: 0,
    date: "2018-02-12",
    time: 18,
    customerName: "",
    customerEmail: "",
  };

  const [bookingValue, setBookingValue] = useState(defaultValue);

  async function onSubmit(e: any) {
    e.preventDefault();

    // const dataToSend: IBookingProps = {
    //   booking: {
    //     numberOfGuests: 8,
    //     date: Date.now,
    //     time: 0,
    //     customerName: "Ida",
    //     customerEmail: "ida@gmail.com",
    //   },
    // };

    // console.log(dataToSend);
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <BookingGuests
            numberOfGuests={bookingValue.numberOfGuests}
          ></BookingGuests>
          <BookingCalendar date={bookingValue.date}></BookingCalendar>
          <BookingTime time={bookingValue.time}></BookingTime>
          <BookingDetails
            date={bookingValue.date}
            time={bookingValue.time}
            numberOfGuests={bookingValue.numberOfGuests}
            customerEmail={bookingValue.customerEmail}
            customerName={bookingValue.customerName}
          ></BookingDetails>
        </form>
      </div>
    </>
  );
};
