import React, { useRef } from "react";
import MaidList from "./MaidList";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMaids } from "../store/maidSlice";

const Find = () => {
  const dispatch = useDispatch();
  const locationRef = useRef();
  const availabilityRef = useRef();
  const serviceRef = useRef();

  const handlesearch = async () => {
  const query = new URLSearchParams();

  const location = locationRef.current.value;
  const availability = availabilityRef.current.value;
  const service = serviceRef.current.value;

  if (location) query.append("location", location);
  if (service && service !== "All Services") query.append("service", service);
  if (availability && availability !== "Any Day")
    query.append("availability", availability);

  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/maids/search?${query.toString()}`);

    console.log("🔍 Search API response:", res.data);

    if (Array.isArray(res.data)) {
      dispatch(setMaids(res.data));
    } else if (Array.isArray(res.data.data)) {
      dispatch(setMaids(res.data.data));
    } else {
      console.error("❌ Invalid response format from server:", res.data);
      dispatch(setMaids([])); // Clear list to avoid crash
    }
  } catch (err) {
    console.error("Search failed:", err);
    dispatch(setMaids([])); // Also clear list if error
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Find Your Perfect Maid
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our database ensures you find skilled professionals matched to your
          specific needs.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              ref={locationRef}
              id="location"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
            >
              <option>Ankleshwar</option>
              <option>Surat-east</option>
              <option>Surat-west</option>
              <option>Kosamba</option>
              <option>Kim</option>
              <option>Bharuch</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="service-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Type
            </label>
            <select
              id="service-type"
              ref={serviceRef}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
            >
              <option value="All Services">All Services</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Baby-sitting">Baby-sitting</option>
              <option value="Cooking">Cooking</option>
              <option value="Laundry">Laundry</option>
              <option value="Elderly Care">Elderly-care</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability
            </label>
            <select
              id="availability"
              ref={availabilityRef}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
            >
              <option value="">Any Day</option>
              <option value="Weekday">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              className="w-full bg-[#2596be] hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
              onClick={handlesearch}
            >
              Search Now
            </button>
          </div>
        </div>
      </div>

      {/* Maid Cards */}
      <MaidList />
    </div>
  );
};

export default Find;
