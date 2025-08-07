import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen pt-20 px-4 py-12 md:px-12 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-primary">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <p className="text-lg">
              Got a question, suggestion, or need help? We'd love to hear from you!
            </p>
            <div>
              <h4 className="font-semibold text-primary mb-1">Email</h4>
              <p>support@maidforyou.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Phone</h4>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Address</h4>
              <p>123, Service Lane, Surat-West, Gujarat, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
