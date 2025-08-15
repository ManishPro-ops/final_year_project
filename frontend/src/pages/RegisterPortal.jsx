import { useRef, useState } from 'react';
import axios from 'axios';

const RegisterMaid = () => {
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const locationRef = useRef();
  const contactRef = useRef();
  const experienceRef = useRef();
  const availabilityRef = useRef();
  const aadharRef = useRef();
  const passwordRef = useRef();

  const cookingRef = useRef();
  const cleaningRef = useRef();
  const babysittingRef = useRef();
  const laundryRef = useRef();
  const elderlyCareRef = useRef();

  const [rates, setRates] = useState({
    morning: { weekday: '', weekend: '' },
    afternoon: { weekday: '', weekend: '' },
    evening: { weekday: '', weekend: '' },
  });

  const handleRateChange = (time, dayType, value) => {
    setRates((prev) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [dayType]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const services = [];
    if (cookingRef.current.checked) services.push('Cooking');
    if (cleaningRef.current.checked) services.push('Cleaning');
    if (babysittingRef.current.checked) services.push('Baby-sitting');
    if (laundryRef.current.checked) services.push('Laundry');
    if (elderlyCareRef.current.checked) services.push('Elderly Care');

    const data = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      gender: genderRef.current.value,
      location: locationRef.current.value,
      contact: contactRef.current.value,
      services,
      experience: experienceRef.current.value,
      availability: availabilityRef.current.value,
      aadhar: aadharRef.current.value,
      password: passwordRef.current.value,
      rates,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/maids/add`, data);
      alert(res.data.message || 'Registered successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#2596be]">Register as Maid</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input ref={nameRef} type="text" placeholder="Full Name" required className="w-full p-3 border rounded" />
        <input ref={ageRef} type="number" placeholder="Age" required className="w-full p-3 border rounded" />

        <select ref={genderRef} required className="w-full p-3 border rounded">
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <input ref={locationRef} type="text" placeholder="Location (e.g., Surat-West)" required className="w-full p-3 border rounded" />
        <input ref={contactRef} type="text" placeholder="Contact Number" required className="w-full p-3 border rounded" />

        <div>
          <label className="block font-semibold mb-2 text-[#2596be]">Select Services:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <label><input type="checkbox" ref={cookingRef} /> Cooking</label>
            <label><input type="checkbox" ref={cleaningRef} /> Cleaning</label>
            <label><input type="checkbox" ref={babysittingRef} /> Baby-sitting</label>
            <label><input type="checkbox" ref={laundryRef} /> Laundry</label>
            <label><input type="checkbox" ref={elderlyCareRef} /> Elderly Care</label>
          </div>
        </div>

        <input ref={experienceRef} type="number" placeholder="Experience (years)" required className="w-full p-3 border rounded" />

        <select ref={availabilityRef} required className="w-full p-3 border rounded">
          <option value="">Availability</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>

        {/* RATE INPUTS */}
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#2596be]">Enter Rate (₹) for:</h3>
          {['morning', 'afternoon', 'evening'].map((time) => (
            <div key={time} className="mb-4">
              <p className="capitalize font-semibold">{time}</p>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Weekday"
                  value={rates[time].weekday}
                  onChange={(e) => handleRateChange(time, 'weekday', e.target.value)}
                  className="p-2 border rounded w-1/2"
                />
                <input
                  type="number"
                  placeholder="Weekend"
                  value={rates[time].weekend}
                  onChange={(e) => handleRateChange(time, 'weekend', e.target.value)}
                  className="p-2 border rounded w-1/2"
                />
              </div>
            </div>
          ))}
        </div>

        <input ref={aadharRef} type="text" placeholder="Aadhar Number (optional)" className="w-full p-3 border rounded" />
        <input ref={passwordRef} type="password" placeholder="Password" required className="w-full p-3 border rounded" />

        <button type="submit" className="w-full bg-[#2596be] text-white py-3 rounded font-semibold hover:bg-[#1f7fa1]">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterMaid;
