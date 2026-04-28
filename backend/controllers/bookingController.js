const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { movie, showTiming, seats, totalCost } = req.body;
    if (!movie || !showTiming || !seats || !totalCost) {
      return res.status(400).json({
        message: "movie, showTiming, seats, totalCost are required"
      })
    }
    console.log("HII")
    if (seats && seats.length === 0) {
      return res.status(400).json({ message: 'No seats selected' });
    }
    const existing = await Booking.findOne({
      movie: movie,
      showTiming,
      seats: { $in: seats }
    });

    if (existing) {
      return res.status(400).json({
        message: "Some seats already booked"
      });
    }
    const booking = new Booking({
      user: req.user.id,
      movie,
      showTiming,
      seats,
      totalCost,
    });

    const createdBooking = await booking.save();
    res.status(201).json({
      message: "Tickets booked successfully",
      createdBooking
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' });
  }
}

const getmyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie', 'title poster');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

const getAllbooking = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'id name').populate('movie', 'id title');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}


const getBookedSeats = async (req, res) => {
  try {
    const { movieId, timing } = req.params;
    const Normaltiming = decodeURIComponent(timing).trim();

    const bookings = await Booking.find({
      movie: movieId,
      showTiming: Normaltiming
    });

    const bookedSeats = bookings.flatMap(booking => booking.seats);

    res.status(200).json(bookedSeats);

  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({
      message: "Server error while fetching booked seats"
    });
  }
};

module.exports = {
  createBooking,
  getmyBookings,
  getAllbooking,
  getBookedSeats
}