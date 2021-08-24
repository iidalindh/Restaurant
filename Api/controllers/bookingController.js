const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const addNewBooking = async (req, res) => {
  const { date, time, numberOfGuests, customerName, customerEmail } = req.body;

  if(!date || !time || !numberOfGuests || !customerName || !customerEmail) {
      return res.status(404).json({ message: "fyll i alla fälten"});
  }

  const bookings = await Booking.find({date : date});
  console.log(bookings);
  
  const newBooking = new Booking({
    date,
    time,
    numberOfGuests,
    customerName,
    customerEmail,
  });

//   const saveBooking = await newBooking.save();
};

module.exports = { addNewBooking };