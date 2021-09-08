const router = require('express').Router();
const {getTablesData, cancelBooking, getBookingDetail,saveBooking,createBooking} = require('../controllers/adminBookingController');
const admin = require("../middleware/admin")

router.post('/getBookings', admin, getTablesData);
router.get('/cancelBooking/:bookingId', admin, cancelBooking);
router.get('/getBookingDetail/:bookingId', admin, getBookingDetail);
router.put('/saveBooking/:bookingId', admin, saveBooking);
router.post('/saveBooking', admin, createBooking);

module.exports = router;
