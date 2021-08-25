
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BookingGuests } from "./BookingGuests";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTime } from "./BookingTime";
import { BookingDetails } from "./BookingDetails";
import { Navbar } from '../navbar/Navbar';

export interface IBooking {
  numberOfGuests: number;
  date: string;
  time: number;
  customerName: string;
  customerEmail: string;

}



//Skapa funktion för att uppdater state (guests, time, date osv.)

export const Booking = (props: any) => {
  let defaultValue: IBooking = {
    numberOfGuests: 0,
    date: "2018-02-12",
    time: 18,
    customerName: "",
    customerEmail: "",
  };

  const [bookingValue, setBookingValue] = useState(defaultValue);

  const [time, setTime] = useState(0);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(0);
  const [details, setDetails] = useState({});

  function updateTime(bookingTime : number) {
    setTime(bookingTime)
    console.log('Körs');
    console.log(bookingTime);
  }

  function datePicker(bookingDate : string) {
    setDate(bookingDate);
    console.log(bookingDate);
  }

  
  function selectNumberGuests(bookingGuests : number){
    setGuests(bookingGuests);
    console.log("antal gäster" + bookingGuests);
  }

  function customerDetails(bookingDetails: any) {
    let name : string = bookingDetails.firstName + " " + bookingDetails.lastName;
    let email : string = bookingDetails.email;

    const customerDetails = {
      customerName: name,
      customerEmail: email
    }
    setDetails(customerDetails);
    console.log(details);
    
  }

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
      <Navbar/>
      <div>
        
          <BookingGuests
            numberOfGuests={bookingValue.numberOfGuests} pickGuestAmount={selectNumberGuests}
          ></BookingGuests>
          <BookingCalendar date={bookingValue.date} pickDate={datePicker}></BookingCalendar>
          <BookingTime time={bookingValue.time} addTime={updateTime}></BookingTime>
          <BookingDetails
            date={bookingValue.date}
            time={bookingValue.time}
            numberOfGuests={bookingValue.numberOfGuests}
            customerEmail={bookingValue.customerEmail}
            customerName={bookingValue.customerName}
            formChange={customerDetails}
          ></BookingDetails>
       
      </div>
    </>
  );
};
