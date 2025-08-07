import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2596be] text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-black-400">Maid For You</h2>
          <p className="mt-3 text-sm text-gray-300">
            Trusted platform to find professional and verified maids near you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/find" className="hover:text-white">Find Maids</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300 flex items-center mb-1">
            <FaPhoneAlt className="mr-2" /> +91-9876543210
          </p>
          <p className="text-sm text-gray-300 flex items-center">
            <FaEnvelope className="mr-2" /> support@maidforyou.in
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Maid For You. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
