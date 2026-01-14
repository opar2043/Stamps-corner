import React from "react";
import {
  FaCheckCircle,
  FaLock,
  FaGlobeEurope,
  FaStamp,
} from "react-icons/fa";

const features = [
  {
    icon: <FaStamp />,
    title: "Authentic Collectibles",
    description:
      "All stamps are carefully selected and verified to ensure authenticity and quality.",
  },
  {
    icon: <FaGlobeEurope />,
    title: "Worldwide Collections",
    description:
      "We offer stamps from the UK and international regions, organised clearly from A–Z.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    description:
      "Pay confidently using PayPal with full buyer protection and secure checkout.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Trusted UK Seller",
    description:
      "Operating from the United Kingdom with transparent policies and customer care.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0E4588] mb-10">
          Why Choose Stamp Collectors Corner
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-[#1B64B3] text-3xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-[#1B64B3] text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-700 max-w-3xl">
          We understand the importance of trust and precision in philately.
          That’s why our platform is designed to be simple, transparent, and
          secure — giving collectors confidence in every purchase.
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
