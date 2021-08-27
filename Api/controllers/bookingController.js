const { response } = require("express");
const Booking = require("../models/Booking");

const addNewBooking = async (req, res) => {
  const { date, time, numberOfGuests, customerName, customerEmail } = req.body;

  console.log(req.body);
  if (!date || !time || !numberOfGuests || !customerName || !customerEmail) {
    return res.status(404).json({ message: "fyll i alla fälten" });
  }

  const newBooking = new Booking({
    date,
    time,
    numberOfGuests,
    customerName,
    customerEmail,
  });
  const saveBooking = await newBooking.save();
};

const getBookings = async (req, res) => {
  let responseArray = [];
  let time18 = [];
  let time21 = [];

  const { numberOfGuests, date } = req.body;

  if (numberOfGuests === 0) {
    return res.status(204).json({ message: "Fyll i antal gäster" });
  }

  if (date < Date.now()) {
    return res.status(400).json({
      message: "Något blev fel. Säkerställ att alla fält är ifyllda korrekt",
    });
  }

  const bookings = await Booking.find({ date: date });
  if (!bookings) {
    responseArray.push(
      { availableTables: true, time: 18 } + { availableTables: true, time: 21 }
    );
  } else {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].time === 18) {
        time18.push(bookings[i]);
      }

      if (bookings[i].time === 21) {
        time21.push(bookings[i]);
      }
    }

    if (time18.length > 0) {
      let availableTables = 15;

      for (let i = 0; i < time18.length; i++) {
        let tablesNeeded = Math.ceil(time18[i].numberOfGuests / 6);
        availableTables = availableTables - tablesNeeded;
      }

      let tablesRequired = Math.ceil(numberOfGuests / 6);

      if (tablesRequired <= availableTables) {
        responseArray.push({ availableTables: true, time: 18 });
      } else {
        responseArray.push({ availableTables: false, time: 18 });
      }
    } else {
      if(numberOfGuests < 90) {
        responseArray.push({ availableTables: true, time: 18 });
      } else {
        return res.status(400).json({message: 'Antal gäster i din bokning är för stor'});
      }
    }

    if (time21.length > 0) {
      let availableTables = 15;

      for (let i = 0; i < time21.length; i++) {
        let tablesNeeded = Math.ceil(time21[i].numberOfGuests / 6);
        availableTables = availableTables - tablesNeeded;
      }
      
      let tablesRequired = Math.ceil(numberOfGuests / 6);

      if (tablesRequired <= availableTables) {
        responseArray.push({ availableTables: true, time: 21 });
      } else {
        if(numberOfGuests < 90) {
          responseArray.push({ availableTables: true, time: 18 });
        } else {
          return res.status(400).json({message: 'Antal gäster i din bokning är för stor'});
        }
      }
    }
  }

  return res.json(responseArray);
};
module.exports = { addNewBooking, getBookings };
