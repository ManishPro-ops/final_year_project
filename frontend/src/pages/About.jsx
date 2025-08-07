import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-primary text-white  px-4 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Maid For You</h1>
          <p className="text-lg md:text-xl">
            Making your life easier with trusted, professional, and reliable maids for every need.
          </p>
        </div>
      </section>

      {/* Core Info Section */}
      <section className="py-12 px-4 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-600">
            <strong>Maid For You</strong> is a one-stop platform that connects households with verified and skilled domestic helpers.
            We believe in simplicity, transparency, and trust. Whether you need cleaning, cooking, childcare, or elderly support,
            we have you covered with professionals who care.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="shadow-lg p-6 bg-white rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-primary mb-2">Verified Maids</h3>
            <p className="text-gray-600">All our maids go through strict background checks and training.</p>
          </div>

          <div className="shadow-lg p-6 bg-white rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-primary mb-2">Flexible Timing</h3>
            <p className="text-gray-600">Book maids for morning, afternoon, evening, or full-day — on your terms.</p>
          </div>

          <div className="shadow-lg p-6 bg-white rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-primary mb-2">Service Variety</h3>
            <p className="text-gray-600">From cleaning and cooking to babysitting and elderly care — we cover it all.</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Want to know more?</h2>
          <p className="text-gray-600 mb-6">Visit our contact page or reach out via email. We’re happy to assist!</p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
