const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  maidId: { type: mongoose.Schema.Types.ObjectId, ref: "Maid", required: true },
  timeSlot: { type: String, required: true },
  dayType: { type: String, enum: ["weekday", "weekend"], required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  // Make these optional if you no longer want to use them
  date: { type: Date },       // optional
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
