import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
// import styled from 'styled-components';

// const Button = styled.button`
//     color: blue;
// `

export const Booking = () => {
  const [dateValue, setDateValue] = useState(new Date());

  function changeDate(e: any) {
    setDateValue(e);
  }

  function onSubmit() {
    const dataToSend = {
      date: dateValue,
      time: 18,
      numberOfGuests: 4,
      customerName: "Ida",
      customerEmail: "bajs@email.com",
    };

    axios.post("http://localhost:8000/booking", dataToSend);
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
        <button type="submit">Skicka rååååå</button>
        {/* <Button>Hej</Button> */}
      </form>
    </div>
  );
};
