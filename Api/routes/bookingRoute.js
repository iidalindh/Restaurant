const { addNewBooking } = require("../controllers/bookingController");
const express = require("express");
const router = express.Router();

router.post("/booking", addNewBooking);

module.exports = router;
