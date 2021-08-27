
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

  

  const [time, setTime] = useState(0);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(0);
  const [details, setDetails] = useState({customerName: "", customerEmail: "",});

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

    let customerDetails = {
      customerName: name,
      customerEmail: email
    }
    setDetails(customerDetails);
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    const dataToSend: IBooking = {
     numberOfGuests: guests,
     date: date,
     time: time,
     customerName: details.customerName,
     customerEmail: details.customerEmail
    };

    // setBookingValue(dataToSend);

    const res = await axios.post("http://localhost:8000/booking", dataToSend);
    console.log(res);
  }
    // console.log(customerDetails)
    // console.log(details);
    // console.log(bookingValue);
   
  return (
    <>
      <Navbar/>
      <div>
        
          <BookingGuests
            numberOfGuests={guests} pickGuestAmount={selectNumberGuests}
          ></BookingGuests>
          <BookingCalendar date={date} pickDate={datePicker}></BookingCalendar>
          <BookingTime time={time} addTime={updateTime}></BookingTime>
          <BookingDetails
            date={date}
            time={time}
            numberOfGuests={guests}
            customerEmail={details.customerName}
            customerName={details.customerEmail}
            formChange={customerDetails}
          ></BookingDetails>
       <button type="button" onClick={onSubmit}>Logga all data</button>
      </div>
    </>
  );
};
