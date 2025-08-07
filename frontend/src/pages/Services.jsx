import React from 'react';
import { FaBroom, FaBaby, FaUtensils, FaTshirt, FaUserNurse, FaDog, FaShoppingCart } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaBroom size={30} />,
    title: 'Cleaning',
    description: 'Professional home and office cleaning by experienced maids.',
  },
  {
    id: 2,
    icon: <FaBaby size={30} />,
    title: 'Baby-sitting',
    description: 'Caring and trained maids to look after your little ones.',
  },
  {
    id: 3,
    icon: <FaUtensils size={30} />,
    title: 'Cooking',
    description: 'Delicious and hygienic meals prepared to your preferences.',
  },
  {
    id: 4,
    icon: <FaTshirt size={30} />,
    title: 'Laundry',
    description: 'Washing, drying, ironing, and folding services.',
  },
  {
    id: 5,
    icon: <FaUserNurse size={30} />,
    title: 'Elderly Care',
    description: 'Compassionate and responsible elderly care assistance.',
  },
  {
    id: 6,
    icon: <FaDog size={30} />,
    title: 'Pet Care',
    description: 'Trustworthy maids to feed, walk, and care for your pets.',
  },
  {
    id: 7,
    icon: <FaShoppingCart size={30} />,
    title: 'Grocery Help',
    description: 'Maids can assist in grocery shopping and organizing essentials.',
  },
];

const Service = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-20 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#2596be]">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#f9f9f9] rounded-2xl p-6 shadow hover:shadow-xl transition duration-300"
            >
              <div className="text-[#2596be] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
