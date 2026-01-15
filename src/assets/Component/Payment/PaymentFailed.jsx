import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h1>

      <p className="text-gray-600 mb-6">
        Your payment could not be processed. Please try again.
      </p>

      <Link
        to="/checkout"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentFailed;
