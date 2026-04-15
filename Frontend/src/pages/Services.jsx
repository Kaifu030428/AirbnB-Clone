import React from 'react';
import Card from "../components/ui/Card";

const Services = () => {
  const services = [
    { label: "Airport pickup", desc: "Schedule reliable rides before check-in.", icon: "local_taxi" },
    { label: "Long-stay cleaning", desc: "Weekly cleaning by verified professionals.", icon: "cleaning_services" },
    { label: "Local concierge", desc: "Recommendations and reservations in one place.", icon: "support_agent" },
  ];

  return (
    <div className="px-6 md:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Services</h1>
      <p className="mt-2 text-gray-600">Everything you need for a smooth and comfortable stay.</p>

      <div className="mt-8 space-y-4 max-w-3xl">
        {services.map((service) => (
          <Card
            as="article"
            key={service.label}
            className="flex items-start gap-4 rounded-2xl p-5"
          >
            <span className="material-symbols-outlined text-airbnb text-3xl">{service.icon}</span>
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{service.label}</h2>
              <p className="text-gray-600 mt-1">{service.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;