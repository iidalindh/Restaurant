import React, {useState} from "react";
import { IBooking } from "./Booking";
import "./booking.scss";
import type {FormEvent} from "react";

interface IBookingDetailsProps {
  date: string;
  time: number;
  numberOfGuests: number;
  customerName: string;
  customerEmail: string;
  formChange(details : object): void;
  //Skapa funktion för att uppdatera state
}



export const BookingDetails = (props: IBookingDetailsProps) => {
  // const res = await axios.post("http://localhost:8000/booking", dataToSend);
  // console.log(res);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  


  function formSubmit(e : any) {

    const customerData = {
          firstName: firstName,
          lastName: lastName,
          email: email
       }
    console.log(customerData);
    
    e.preventDefault();
    console.log(e);
    
   
    props.formChange(customerData);
  } 

   
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
          <form onSubmit={formSubmit}>
            <input type="text" placeholder="FÖRNAMN" id="firstName"  onChange={(e) => {setFirstName(e.target.value)}}/>
            <input type="text" placeholder="EFTERNAMN" id="lastName" onChange={(e) => {setLastName(e.target.value)}}/>
            <input type="text" placeholder="MEJLADRESS" id="email" onChange={(e) => {setEmail(e.target.value)}} />
            <button type="submit">BOKA NU</button>
          </form>
        </div>
      </section>
    </>
  );
};
