const Booking = require("../models/Booking")

module.exports.getTablesData = async (req, res) => {
    try {
        const {date} = req.body;
        const customers = await Booking.find({date})
        res.send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

module.exports.cancelBooking = async (req, res) => {
    try {
        const {bookingId} = req.params;
        const customers = await Booking.findByIdAndDelete(bookingId)
        res.send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

module.exports.getBookingDetail = async (req, res) => {
    try {
        const {bookingId} = req.params;
        const customer = await Booking.findById(bookingId)
        res.send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

module.exports.saveBooking = async (req, res) => {
    try {
        const {bookingId} = req.params;
        const customer = await Booking.findByIdAndUpdate(bookingId, {
            $set: req.body
        })
        res.send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}


module.exports.createBooking = async (req, res) => {
    try {
        const customer = await Booking.create(req.body)
        res.send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}
