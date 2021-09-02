const {
  addNewBooking,
  getBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const express = require("express");
const router = express.Router();

router.post("/booking", addNewBooking);

router.post("/booking/getAvailableTables", getBookings);

router.post("/booking/cancel/:id", cancelBooking);

router.post("/booking/getAvailableTables", getBookings);

module.exports = router;
