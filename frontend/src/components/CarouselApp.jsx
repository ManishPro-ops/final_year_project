import React, { useEffect, useState } from "react";

const images = [
  "/img1.jpeg",
  "/img2.jpeg",
  "/img3.jpeg",
  "/img4.jpeg",
  "/img5.jpeg",
];

const carouselTexts = [
  "Nurturing hands, happy hearts. Our babysitting services provide a safe and engaging environment for your little ones, giving you peace of mind.",
  "Compassionate care, cherished moments. We offer dedicated elderly care, ensuring comfort, companionship, and dignified support for your loved ones.",
  "Delicious meals, effortless living. Savor the flavor of homemade goodness without the fuss. Our cooking services bring culinary delight right to your table.",
  "Freshly laundered, perfectly folded. Experience the joy of pristine laundry. We handle every fabric with care, delivering a crisp and clean finish every time.",
  "Sparkling spaces, peaceful mind. Transform your home into a sanctuary of cleanliness. Our meticulous cleaning services leave every corner gleaming and refreshed.",
];

const CarouselApp = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full  max-w-300 mx-auto overflow-hidden rounded-2xl shadow-lg mt-30">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-130 object-cover transition-all duration-700 ease-in-out"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4 transition-all duration-700 ease-in-out">
        <h2 className="text-sm md:text-2xl font-bold mx-5 pt-20">
          {carouselTexts[current]}
        </h2>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselApp;
