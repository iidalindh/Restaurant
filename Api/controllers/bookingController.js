const { response } = require("express");
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.React__App__TRANSPORT_MAIL,
    pass: process.env.React__App__MAIL_PASS,
  },
});

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

  console.log(saveBooking._id);

  await transport.sendMail(
    {
      from: process.env.React__App__TRANSPORT_MAIL,
      to: customerEmail,
      subject: "Athena - Bokningsbekräftelse",

      html: `<h1>Tack för din bokning och välkommen till oss på Athena!</h1>
            <h3>Datum: ${date}</h3>
            <h3>Tid: ${time}</h3>
            <h3>Antal gäster: ${numberOfGuests}</h3>
            <p>Klicka <a href = "http://localhost:3000/booking/cancel/${saveBooking._id}">här</a> för att avboka din bordsreservation</p>`,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    }
  );
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
    return res.status(204).json({
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
      if (numberOfGuests < 90) {
        responseArray.push({ availableTables: true, time: 18 });
      } else {
        return res
          .status(204)
          .json({ message: "Antal gäster i din bokning är för stor" });
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
        responseArray.push({ availableTables: false, time: 21 });
      }
    } else {
      if (numberOfGuests < 90) {
        responseArray.push({ availableTables: true, time: 21 });
      } else {
        return res
          .status(204)
          .json({ message: "Antal gäster i din bokning är för stor" });
      }
    }
  }

  return res.json(responseArray);
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const booking = await Booking.find({ _id: id });
  console.log(booking[0].customerEmail);
  await transport.sendMail(
    {
      from: process.env.React__App__TRANSPORT_MAIL,
      to: booking[0].customerEmail,
      subject: "Athena - Avbokning",

      html: `<h1>Du har nu avbokat din bordsreservation för nedanstående datum och tid.</h1>
              <h3>Datum: ${booking[0].date}</h3>
              <h3>Tid: ${booking[0].time}</h3>
              <h3>Antal gäster: ${booking[0].numberOfGuests}</h3>`,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    }
  );

  await Booking.deleteOne({ _id: id });
};

module.exports = { addNewBooking, getBookings, cancelBooking };
