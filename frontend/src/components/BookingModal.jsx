import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const BookingModal = ({ maid, onClose, onBook, bookedSlots = {} }) => {
  const [selectedSlots, setSelectedSlots] = useState([]); // multiple selection
  const [selectedDay, setSelectedDay] = useState("weekday");

  // Get price for a slot
  const getPrice = (slot) => {
    if (!maid?.rates) return null;
    const slotRates = maid.rates[slot.toLowerCase()];
    return slotRates ? slotRates[selectedDay] : null;
  };

  // Handle slot click
  const handleSlotClick = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    // Send all selected slots to parent handler
    selectedSlots.forEach((slot) => {
      onBook({
        maidId: maid._id,
        timeSlot: slot,
        dayType: selectedDay,
        price: getPrice(slot),
      });
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-2xl relative border border-sky-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-sky-500 text-center">
          Book {maid?.name || "Maid"}
        </h2>

        {/* Day selection */}
        <div className="flex gap-3 mb-4 justify-center">
          {["weekday", "weekend"].map((day) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setSelectedSlots([]); // reset selections when day changes
              }}
              className={`px-4 py-2 rounded-lg border font-medium shadow-sm transition ${
                selectedDay === day
                  ? "bg-sky-400 text-white border-sky-500"
                  : "bg-gray-100 text-gray-700 hover:bg-sky-100 border-gray-300"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {/* Slot selection */}
        <label className="block mb-2 text-gray-700 font-medium">
          Select Time Slot:
        </label>
        <div className="flex gap-3 mb-4 justify-center">
          {["Morning", "Afternoon", "Evening"].map((slot) => {
            const isBooked = bookedSlots[maid._id]?.some(
              (b) => b.timeSlot === slot && b.dayType === selectedDay
            );
            const isSelected = selectedSlots.includes(slot);

            return (
              <button
                key={slot}
                onClick={() => !isBooked && handleSlotClick(slot)}
                disabled={isBooked}
                className={`px-4 py-2 rounded-lg border font-medium shadow-sm transition ${
                  isBooked
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isSelected
                    ? "bg-green-400 text-white border-green-500"
                    : "bg-gray-100 text-gray-700 hover:bg-sky-100 border-gray-300"
                }`}
              >
                {slot} {isBooked ? "(Booked)" : isSelected ? "(Selected)" : ""}
              </button>
            );
          })}
        </div>

        {/* Price Display */}
        <p className="mb-4 text-lg font-semibold text-gray-800 text-center">
          Selected Slots:{" "}
          {selectedSlots.length > 0
            ? selectedSlots
                .map((slot) => `₹${getPrice(slot)} (${slot})`)
                .join(", ")
            : "None"}
        </p>

        {/* Book button */}
        <button
          onClick={handleBooking}
          className="w-full bg-sky-400 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-sky-500 transition"
          disabled={selectedSlots.length === 0}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
