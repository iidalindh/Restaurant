import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BookingGuests } from "./BookingGuests";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTime } from "./BookingTime";
import { BookingDetails } from "./BookingDetails";

import { Navbar } from "../navbar/Navbar";
import styled from "styled-components";

export interface IBooking {
  numberOfGuests: number;
  date: string;
  time: number;
  customerName: string;
  customerEmail: string;
  checked: boolean;
}

export const Booking = () => {
  let defaultValue: IBooking = {
    numberOfGuests: 0,
    date: "2018-02-12",
    time: 18,
    customerName: "",
    customerEmail: "",
    checked: false,
  };

  const [time, setTime] = useState(0);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(0);

  const [details, setDetails] = useState({
    customerName: "",
    customerEmail: "",
    checked: false,
  });
  
  const [showComponent, setShowComponent] = useState(true);

  function updateTime(bookingTime: number) {
    setTime(bookingTime);
    console.log("Körs");
    console.log(bookingTime);
  }

  function datePicker(bookingDate: string) {
    setDate(bookingDate);
    console.log(bookingDate);
  }

  function selectNumberGuests(bookingGuests: number) {
    setGuests(bookingGuests);
    console.log("antal gäster" + bookingGuests);
  }

  function customerDetails(bookingDetails: any) {
    let name: string = bookingDetails.firstName + " " + bookingDetails.lastName;
    let email: string = bookingDetails.email;
    let checked: boolean = bookingDetails.checked;

    let customerDetails = {
      customerName: name,
      customerEmail: email,
      checked: checked,
    };

    setDetails(customerDetails);
  }

  async function onSubmit(e : React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    const dataToSend: IBooking = {
      numberOfGuests: guests,
      date: date,
      time: time,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      checked: details.checked,
    };

    const res = await axios.post("http://localhost:8000/booking", dataToSend);
    console.log(res);
  }

  return (
    <>
      <Navbar />
      <BookingSite>
        {showComponent ? (
          <div>
            <BookingGuests
              numberOfGuests={guests}
              pickGuestAmount={selectNumberGuests}
            ></BookingGuests>
            <BookingCalendar
              date={date}
              pickDate={datePicker}
            ></BookingCalendar>
            <BookingTime time={time} addTime={updateTime}></BookingTime>
            <Button
              onClick={() => {
                setShowComponent(false);
              }}
            >
              GÅ VIDARE
            </Button>
          </div>
        ) : (
          <div>
            <BookingDetails
              date={date}
              time={time}
              numberOfGuests={guests}
              customerEmail={details.customerName}
              customerName={details.customerEmail}
              formChange={customerDetails}
              checked={details.checked}
            ></BookingDetails>
            {details.checked ? (
              <Button type="button" onClick={onSubmit}>
                BOKA NU
              </Button>
            ) : (
              <Button type="button" disabled={true}>
                BOKA NU
              </Button>
            )}
          </div>
        )}
      </BookingSite>
    </>
  );
};

const BookingSite = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  background-color: blue;
  color: white;
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.3em;

  &hover {
    background-color: #213fea;
  }

  :disabled {
    background-color: #d4d4d4;
    :hover {
      cursor: not-allowed;
    }
  }
`;
