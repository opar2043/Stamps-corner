import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-6 md:py-10">
        <h1 className="text-3xl font-bold text-[#0E4588] mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          Stamp Collectors Corner respects your privacy and is committed to
          protecting your personal data. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our website.
        </p>

        <h2 className="text-xl text-slate-900 font-semibold mt-8 mb-3">
          Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We may collect personal information such as your name, email address,
          and payment details when you make a purchase or contact us. Payment
          information is securely processed via PayPal and is never stored on
          our servers.
        </p>

        <h2 className="text-xl text-slate-900 font-semibold mt-8 mb-3">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To process orders and payments</li>
          <li>To communicate about your purchases</li>
          <li>To improve our website and services</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-xl text-slate-900 font-semibold mt-8 mb-3">
          Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          We implement appropriate security measures to protect your personal
          data. All transactions are handled through secure, encrypted payment
          gateways.
        </p>

        <h2 className="text-xl text-slate-900 font-semibold mt-8 mb-3">
          Your Rights
        </h2>
        <p className="text-gray-700">
          You have the right to request access to, correction of, or deletion of
          your personal data. If you have any questions regarding your privacy,
          please contact us.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
