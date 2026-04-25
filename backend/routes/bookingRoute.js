const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController')
router.post('/', protect, bookingController.createBooking);

router.get('/mybookings', protect, bookingController.getmyBookings);

router.get('/', protect, admin, bookingController.getAllbooking);

module.exports = router;
