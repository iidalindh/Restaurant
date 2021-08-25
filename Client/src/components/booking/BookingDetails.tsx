import React from "react";
import { IBooking } from "./Booking";
import "./booking.scss";

interface IBookingDetailsProps {
  date: string;
  time: number;
  numberOfGuests: number;
  customerName: string;
  customerEmail: string;
  //Skapa funktion för att uppdatera state
}

export const BookingDetails = (props: IBookingDetailsProps) => {
  // const res = await axios.post("http://localhost:8000/booking", dataToSend);
  // console.log(res);

  return (
    <>
      <section className="booking-section">
        <hr />
        <div className="booking-info">
          <div>
            <p>DATUM</p>
            <p>{props.date}</p>
          </div>
          <div>
            <p>GÄSTER</p>
            <p>{props.numberOfGuests}</p>
          </div>
          <div>
            <p>TID</p>
            <p>{props.time}</p>
          </div>
        </div>
        <hr />
        <div className="contact-info">
          <h1>KONTAKTUPPGIFTER</h1>
          <form>
            <input type="text" placeholder="FÖRNAMN" />
            <input type="text" placeholder="EFTERNAMN" />
            <input type="text" placeholder="MEJLADRESS" />
            <button type="submit">BOKA NU</button>
          </form>
        </div>
      </section>
    </>
  );
};
