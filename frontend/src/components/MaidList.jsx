import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaids, toggleShowAll } from "../store/maidSlice";
import MaidCard from "./MaidCard";
import BookingModal from "./BookingModal";

const MaidList = () => {
  const dispatch = useDispatch();
  const { data: maids, status, showAll, error } = useSelector(
    (state) => state.maids
  );

  const [selectedMaid, setSelectedMaid] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({}); // { maidId: [{timeSlot, dayType}] }

  useEffect(() => {
    if (status === "idle") dispatch(fetchMaids());
  }, [status, dispatch]);

  // Fetch booked slots from backend
  useEffect(() => {
    if (maids.length === 0) return;

    maids.forEach(async (maid) => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URl}/api/bookings/maid/${maid._id}`
        );
        const data = await res.json(); // array of bookings [{ timeSlot, dayType }]
        setBookedSlots((prev) => ({ ...prev, [maid._id]: data }));
      } catch (err) {
        console.error(`Failed to fetch bookings for maid ${maid._id}`, err);
      }
    });
  }, [maids]);

  const openBookingModal = (maid) => {
    setSelectedMaid(maid);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setSelectedMaid(null);
    setIsBookingOpen(false);
  };

  // Booking handler
  const handleBook = async ({ maidId, timeSlot, dayType, price }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maidId, timeSlot, dayType, price }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Booking failed:", text);
        alert("❌ Failed to book maid.");
        return;
      }

      const data = await res.json();
      alert("✅ Booking successful!");

      // Update bookedSlots immediately
      setBookedSlots((prev) => {
        const prevSlots = prev[maidId] || [];
        return {
          ...prev,
          [maidId]: [...prevSlots, { timeSlot, dayType }],
        };
      });
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong while booking.");
    }
  };

  const visibleMaids = showAll ? maids : maids.slice(0, 6);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Available Maids</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleMaids.map((maid) => (
          <MaidCard
            key={maid._id}
            maid={maid}
            onBookClick={() => openBookingModal(maid)}
            isBooked={false} // We'll control per slot in modal
          />
        ))}
      </div>

      {maids.length > 6 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => dispatch(toggleShowAll())}
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-150 ease-in-out"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && selectedMaid && (
        <BookingModal
          maid={selectedMaid}
          onClose={closeBookingModal}
          onBook={handleBook}
          bookedSlots={bookedSlots} // pass latest booked slots
        />
      )}
    </div>
  );
};

export default MaidList;
