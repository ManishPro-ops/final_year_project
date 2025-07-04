const services = [
    { title: "Home Cleaning", description: "Professional and hygienic cleaning for your home." },
    { title: "Cooking Assistance", description: "Get help preparing daily meals." },
    { title: "Elderly Care", description: "Gentle and kind care for senior citizens." },
  ];
  
  export default function Services() {
    return (
      <section className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-10">Our Services</h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all">
              <h4 className="text-xl font-bold text-blue-600 mb-2">{service.title}</h4>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  