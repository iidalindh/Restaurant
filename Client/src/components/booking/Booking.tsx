import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BookingGuests } from "./BookingGuests";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTime } from "./BookingTime";
import { BookingDetails } from "./BookingDetails";
import { Button } from "../../styles";
import { Navbar } from "../navbar/Navbar";
import styled from "styled-components";
import { BookingConfirmed } from "./BookingConfirmed";
import { SlowBuffer } from "buffer";
import { ICustomer } from "./BookingDetails";

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
  }

  function datePicker(bookingDate: string) {
    setDate(bookingDate);
  }

  function selectNumberGuests(bookingGuests: number) {
    setGuests(bookingGuests);
  }

  function customerDetails(bookingDetails: ICustomer) {
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
    console.log(res.data);
    if (res.data.message === "Bokningen lyckades") {
      if (loading === false) {
        setLoadingDone(true);
      }

      setMsg(res.data.message);
    }
  }
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
            <Div>
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
            </Div>
          ) : (
            <Div>
              <BookingDetails
                date={date}
                time={time}
                numberOfGuests={guests}
                customerEmail={details.customerName}
                customerName={details.customerEmail}
                formChange={customerDetails}
                checked={details.checked}
              ></BookingDetails>
              {msg !== "" ? (
                <ErrorMessageContainer>
                  <p>{msg}</p>
                </ErrorMessageContainer>
              ) : (
                <></>
              )}
              {details.checked ? (
                <Button type="button" onClick={onSubmit}>
                  BOKA NU
                </Button>
              ) : (
                <Button type="button" disabled={true}>
                  BOKA NU
                </Button>
              )}
            </Div>
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ErrorMessageContainer = styled.div`
  border: 1px solid blue;
  border-radius: 1%;
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
  }
`;
