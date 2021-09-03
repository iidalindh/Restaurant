import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BookingGuests } from "./BookingGuests";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTime } from "./BookingTime";
import { BookingDetails } from "./BookingDetails";

import { Navbar } from "../navbar/Navbar";
import styled from "styled-components";
import { BookingConfirmed } from "./BookingConfirmed";

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

  const [showBookingDetails, setShowBookingDetails] = useState(true);
  const [showBookingConfirmation, setShowBookingConfrimation] = useState(true);
  const [time18, setTime18] = useState(false);
  const [time21, setTime21] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

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

  function buttonState18(btn18: boolean) {
    setTime18(btn18);
  }

  function buttonState21(btn21: boolean) {
    setTime21(btn21);
  }
  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const dataToSend: IBooking = {
      numberOfGuests: guests,
      date: date,
      time: time,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      checked: details.checked,
    };

    setLoading(true);
    const res = await axios.post("http://localhost:8000/booking", dataToSend);
    setLoading(false);

    if (loading === false) {
      console.log("jag e false nu bror");
      setLoadingDone(true);
    }
    setMsg(res.data.message);
  }

  useEffect(() => {
    console.log(time18);
  }, [time18]);

  return (
    <>
      <Navbar />
      {showBookingConfirmation === true && loadingDone === true ? (
        <BookingConfirmed
          date={date}
          time={time}
          numberOfGuests={guests}
        ></BookingConfirmed>
      ) : (
        <BookingSite>
          {showBookingDetails ? (
            <div>
              <BookingGuests
                numberOfGuests={guests}
                pickGuestAmount={selectNumberGuests}
              ></BookingGuests>
              <BookingCalendar
                date={date}
                pickDate={datePicker}
                button18={buttonState18}
                button21={buttonState21}
                numberOfGuests={guests}
              ></BookingCalendar>
              <BookingTime
                time={time}
                addTime={updateTime}
                time18={time18}
                time21={time21}
              ></BookingTime>
              {guests && time && date ? (
                <Button
                  onClick={() => {
                    setShowBookingDetails(false);
                  }}
                >
                  GÅ VIDARE
                </Button>
              ) : (
                <Button disabled={true}>GÅ VIDARE</Button>
              )}
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
          {msg !== "" ? (
            <ErrorMessageContainer>
              <p>{msg}</p>
            </ErrorMessageContainer>
          ) : (
            <></>
          )}
        </BookingSite>
      )}
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

const ErrorMessageContainer = styled.div`
  border: 1px solid blue;
  border-radius: 1%;
  width: 80%;
  p {
    text-align: center;
  }
`;
