const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const addNewBooking = async (req, res) => {
  const { date, time, numberOfGuests, customerName, customerEmail } = req.body;

  const newBooking = new Booking({
    date,
    time,
    numberOfGuests,
    customerName,
    customerEmail,
  });

  const saveBooking = await newBooking.save();
};

module.exports = { addNewBooking };
