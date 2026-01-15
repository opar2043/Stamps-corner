import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for your order. Your payment has been completed.
      </p>

      <Link
        to="/"
        className="bg-[#103C6B] hover:bg-[#0b2f54] text-white px-6 py-3 rounded transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
