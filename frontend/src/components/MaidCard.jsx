import React from "react";

const MaidCard = ({ maid,isBooked, index ,onBookClick}) => {
  // Helper to get rate
  const getRateLabel = () => {
    if (!maid.rates) return "₹N/A";

    const { rates } = maid;
    const rateStrings = [];

    const slotLabels = {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    };

    const dayLabels = {
      weekday: "Weekday",
      weekend: "Weekend",
    };

    for (let slot of ["morning", "afternoon", "evening"]) {
      for (let day of ["weekday", "weekend"]) {
        if (rates[slot] && rates[slot][day]) {
          rateStrings.push(
            `${slotLabels[slot]} ${dayLabels[day]}: ₹${rates[slot][day]}`
          );
        }
      }
    }

    return rateStrings.length > 0 ? rateStrings.join(" | ") : "₹N/A";
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(maid.name)}&background=random`}
          alt={maid.name}
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Verified
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{maid.name}</h3>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-700 ml-1">4.{index + 5} ({index * 20 + 40})</span>
          </div>
        </div>

        <p className="text-gray-600 mt-1">{maid.experience} experience</p>

        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
          </svg>
          {maid.location}
        </div>

        <div className="mt-3">
          {maid.services.map((service, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {service}
            </span>
          ))}
        </div>

        {maid.availability && (
          <div className="mt-3 text-sm text-gray-700">
            <p className="mb-1 font-medium">Availability:</p>
            <div className="flex flex-wrap gap-2">
              {maid.availability.days?.map((day, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {day}
                </span>
              ))}
              {maid.availability.timings?.map((time, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {time}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Dynamic Rate Section */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium mb-1">Rates:</p>
          <div className="text-gray-800 text-sm leading-5">{getRateLabel()}</div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-[#2596be] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out" onClick={() => {console.log("book now clicked!"),onBookClick(maid)}}>
           Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaidCard;
