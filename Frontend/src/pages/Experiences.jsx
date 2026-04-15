import React from "react";
import Card from "../components/ui/Card";

const Experiences = () => {
  const experienceItems = [
    { title: "Food Walk", detail: "Explore local cuisine with chefs", icon: "restaurant" },
    { title: "City Photo Tour", detail: "Golden-hour landmarks with a pro", icon: "photo_camera" },
    { title: "Art & Craft", detail: "Hands-on sessions with local artists", icon: "palette" },
  ];

  return (
    <div className="px-6 md:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        Experiences
      </h1>
      <p className="mt-2 text-gray-600">Make your trip memorable with unique local activities.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        {experienceItems.map((item) => (
          <Card
            as="article"
            key={item.title}
            className="rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-3xl text-airbnb">{item.icon}</span>
            <h2 className="font-semibold text-xl text-gray-900 mt-4">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Experiences;