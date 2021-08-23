import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";


export const Booking = () => {
  const [dateValue, setDateValue] = useState(new Date());

  function changeDate(e: any) {
    setDateValue(e);
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const dataToSend = {
      date: dateValue.toLocaleDateString(),
      time: 18,
      numberOfGuests: 4,
      customerName: "Ida",
      customerEmail: "bajs@email.com",
    };

    const res = await axios.post("http://localhost:8000/booking", dataToSend);
    console.log(res);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Calendar onChange={changeDate} value={dateValue} />
        <button
          onClick={() => {
            console.log(dateValue.toLocaleDateString());
          }}
        >
          Logga
        </button>
        <button type="submit">skicka skiten nu</button>
      </form>
    </div>
  );
};
