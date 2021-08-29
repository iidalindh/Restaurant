const { addNewBooking, getBookings } = require("../controllers/bookingController");
const express = require("express");
const router = express.Router();

router.post("/booking", addNewBooking);

router.post("/booking/getAvailableTables", getBookings);

module.exports = router;
