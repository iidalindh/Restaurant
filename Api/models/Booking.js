const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    time: {
        type: Number
    },
    numberOfGuests : {
        type: Number
    },
    customerName : {
        type: String,
    },
    customerEmail : {
        type: String,
    }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;