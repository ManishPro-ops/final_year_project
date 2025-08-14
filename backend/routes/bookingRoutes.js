const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create Booking without date or userId
router.post("/", async (req, res) => {
  try {
    const { maidId, timeSlot, dayType, price } = req.body;

    if (!maidId || !timeSlot || !dayType || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optional: prevent duplicate booking for same maid, slot, and dayType
    const existingBooking = await Booking.findOne({
      maidId,
      timeSlot,
      dayType,
      status: { $ne: "Cancelled" },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This maid is already booked for the selected time slot.",
      });
    }

    const booking = new Booking({
      maidId,
      timeSlot,
      dayType,
      price,
      status: "Pending",
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  // GET all bookings for a specific maid
router.get("/maid/:maidId", async (req, res) => {
  const { maidId } = req.params;
  try {
    // fetch all bookings for this maid (ignore cancelled ones)
    const bookings = await Booking.find({ maidId, status: { $ne: "Cancelled" } })
      .select("timeSlot dayType price -_id"); // only fields frontend needs

    res.json(bookings); // send as JSON
  } catch (err) {
    console.error(`Failed to fetch bookings for maid ${maidId}`, err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

});

module.exports = router;
