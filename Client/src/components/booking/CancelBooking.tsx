import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

type BookingParams = {
  id: string;
};

export const CancelBooking = () => {
  const { id } = useParams<BookingParams>();

  async function cancelReservation() {
    const res = await axios.post(
      `http://localhost:8000/booking/cancel/${id}`,
      id
    );
  }
  return (
    <div>
      <h1>Är du säker på att du vill avboka din reservation?</h1>
      <button onClick={cancelReservation}>Ja</button>
      <button>Nej</button>
    </div>
  );
};
